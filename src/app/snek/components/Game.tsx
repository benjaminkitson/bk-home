"use client";

import {
  MutableRefObject,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Cell } from "../components/Cell";
import { H1, H2 } from "@/components/Atoms/Typography";
import { Modal } from "@/components/Molecules/Modal";
import { DirectionButton } from "./DirectionButton";
import { Button } from "@/components/Atoms/Button";
import Link from "next/link";

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

export default function Game({
  direction,
}: {
  direction: MutableRefObject<string>;
}) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const startClock = (i: number) => {
    timer.current = setInterval(() => {
      dispatch({ type: "INCREMENT_TIME" });
      // if (currentTime % 3 === 0) {
      //   tick.current *= 0.99;
      // }
    }, i);
  };

  // TODO: currently not ported to reducer
  // const increaseSpeed = () => {
  //   if (timer.current) {
  //     clearInterval(timer.current);
  //   }
  //   const newTick = snekState.tick * 0.99;
  //   setTick(newTick);
  //   startClock(newTick);
  // };

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
        direction.current = "UP";
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
            switch (direction.current) {
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

  // TODO: Turn all these useStates into one mighty reducer

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

  /**
   * TODO: Rather than this weird "create an empty array and them generate the grid of cells from it", the grid should just be generated straight up
   */
  const grid = useMemo(() => {
    const init: null[] = [];

    for (let i = 0; i <= snekState.gridSize; i++) {
      init.push(null);
    }

    const grid = init.map((item) => {
      return [...init];
    });

    return grid;
  }, [snekState.gridSize]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <H1 className="mb-6">{snekState.score}</H1>
      {/* 
      Mapping over the grid on every render doesn't seem efficient
      I'm pretty sure it's causing performance problems at higher grid sizes 
      */}
      {grid.map((row, y) => (
        <div className="flex flex-row" key={y}>
          {row.map((cell, x) => {
            const isSnek = snekState.snake.some(
              (segment) => segment.x === x && segment.y === y,
            );
            const isFood = snekState.snakeFood.some(
              (food) => food.x === x && food.y === y,
            );
            return <Cell key={x} isSnek={isSnek} isFood={isFood} />;
          })}
        </div>
      ))}

      <div className="block lg:hidden">
        <div className="flex items-center justify-center">
          <DirectionButton
            onClick={() => (direction.current = "UP")}
            direction="UP"
            className="mt-10"
          />
        </div>
        <div className="flex items-center justify-center">
          <DirectionButton
            onClick={() => (direction.current = "LEFT")}
            direction="LEFT"
            className="mr-14"
          />
          <DirectionButton
            onClick={() => (direction.current = "RIGHT")}
            direction="RIGHT"
          />
        </div>
        <div className="flex items-center justify-center">
          <DirectionButton
            className="mb-24"
            onClick={() => (direction.current = "DOWN")}
            direction="DOWN"
          />
        </div>
      </div>

      {!snekState.isActive && (
        <Modal className="flex flex-col">
          {snekState.isGameOver && <H2 className="mb-4">Game Over</H2>}
          <Button
            onClick={() => dispatch({ type: "START_GAME" })}
            buttonColor="blue"
            buttonSize="lg"
          >
            Play!
          </Button>
          <Link href="/">
            <Button buttonColor="gray" buttonSize="sm" className="mt-10">
              Home
            </Button>
          </Link>
        </Modal>
      )}
    </div>
  );
}
