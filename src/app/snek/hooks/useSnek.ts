import {
  Dispatch,
  MutableRefObject,
  Reducer,
  useEffect,
  useReducer,
  useRef,
} from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Coord = {
  x: number;
  y: number;
};

type SnekState = {
  currentDirection?: Direction;
  gridSize: number;
  snake: Coord[];
  snakeFood: Coord[];
  tick: number;
  score: number;
  isGameOver: boolean;
  isActive: boolean;
  currentTime: number;
};

type ActionType =
  | "START_GAME"
  | "SNAKE_MOVES"
  | "SNAKE_MOVES"
  | "CHECK_EATS_FOOD"
  | "CHECK_GAME_OVER"
  | "GENERATE_FOOD"
  | "INCREMENT_TIME";

type SnekAction = { type: ActionType };

export const useSnek = ({
  directionRef,
}: {
  directionRef: MutableRefObject<Direction>;
}): [SnekState, Dispatch<SnekAction>] => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const startClock = (i: number) => {
    timer.current = setInterval(() => {
      dispatch({ type: "INCREMENT_TIME" });
      // if (currentTime % 3 === 0) {
      //   tick.current *= 0.99;
      // }
    }, i);
  };
  const initialState: SnekState = {
    currentDirection: undefined,
    gridSize: 30,
    snake: [],
    snakeFood: [],
    tick: 100,
    score: 0,
    isGameOver: false,
    isActive: false,
    currentTime: 0,
  };

  const snekReducer: Reducer<SnekState, SnekAction> = (
    state: SnekState,
    action: SnekAction,
  ) => {
    switch (action.type) {
      case "START_GAME":
        startClock(state.tick);
        const gridSize = 30;
        const initialCoord = Math.floor(gridSize / 2);
        directionRef.current = "UP";
        return {
          ...state,
          gridSize,
          snake: [
            { x: initialCoord, y: initialCoord },
            { x: initialCoord, y: initialCoord },
            { x: initialCoord, y: initialCoord },
          ],
          isActive: true,
          score: 0,
          snakeFood: [],
        };
      case "SNAKE_MOVES":
        const updatedSnake = state.snake.map((segment, i) => {
          if (i === 0) {
            switch (directionRef.current) {
              case "RIGHT":
                return {
                  ...segment,
                  x: segment.x === state.gridSize ? 0 : segment.x + 1,
                };
              case "DOWN":
                return {
                  ...segment,
                  y: segment.y === state.gridSize ? 0 : segment.y + 1,
                };
              case "UP":
                return {
                  ...segment,
                  y: segment.y === 0 ? state.gridSize : segment.y - 1,
                };
              case "LEFT":
                return {
                  ...segment,
                  x: segment.x === 0 ? state.gridSize : segment.x - 1,
                };
            }
          }
          return state.snake[i - 1];
        });

        return {
          ...state,
          snake: updatedSnake,
        };

      case "CHECK_EATS_FOOD":
        let score = state.score;
        const snakeFoodCopy = [...state.snakeFood];
        const snakeCopy = [...state.snake];

        const eatingFoodIndex = state.snakeFood.findIndex(
          (food) => food.x === snakeCopy[0].x && food.y === snakeCopy[0].y,
        );
        if (eatingFoodIndex !== -1) {
          score += 1;
          snakeFoodCopy.splice(eatingFoodIndex, 1);
          snakeCopy.push(snakeCopy[snakeCopy.length - 1]);
        }

        return {
          ...state,
          score,
          snake: snakeCopy,
          snakeFood: snakeFoodCopy,
        };

      case "CHECK_GAME_OVER":
        if (
          state.snake
            .slice(1, state.snake.length)
            .some(
              (segment) =>
                state.snake[0].x === segment.x &&
                state.snake[0].y === segment.y,
            )
        ) {
          if (timer.current) {
            clearTimeout(timer.current);
          }

          return {
            ...state,
            isActive: false,
            isGameOver: true,
          };
        }

        return state;
      case "GENERATE_FOOD":
        if (state.gridSize) {
          const x = Math.floor(Math.random() * state.gridSize);
          const y = Math.floor(Math.random() * state.gridSize);
          const newSnekFood = { x, y };
          return {
            ...state,
            snakeFood: [...state.snakeFood, newSnekFood],
          };
        }
      case "INCREMENT_TIME":
        return {
          ...state,
          currentTime: state.currentTime + 1,
        };
    }
  };

  const [snekState, dispatch] = useReducer(snekReducer, initialState);

  useEffect(() => {
    if (snekState.isActive) {
      dispatch({ type: "SNAKE_MOVES" });
      dispatch({ type: "CHECK_EATS_FOOD" });
      dispatch({ type: "CHECK_GAME_OVER" });
    }

    if (snekState.currentTime % 10 === 0) {
      dispatch({ type: "GENERATE_FOOD" });
    }
  }, [snekState.currentTime, snekState.isActive]);

  return [snekState, dispatch];
};
