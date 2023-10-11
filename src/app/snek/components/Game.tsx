"use client";

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Cell } from "../components/Cell";
import { H2, P } from "@/components/Atoms/Typography";
import { Modal } from "@/components/Molecules/Modal";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Coord = {
  x: number;
  y: number;
};

// type GameState = {
//   currentDirection: Direction | null;
//   currentHead: Coord;
//   gridSize: number;
//   length: number;
// };

export default function Game({
  direction,
}: {
  direction: MutableRefObject<string>;
}) {
  // const initialState: GameState = {
  //   currentDirection: null,
  //   currentHead: { x: 0, y: 0 },
  //   gridSize: 10,
  //   length: 1,
  // };

  // TODO: Turn all these useStates into one mighty reducer

  const [currentTime, setCurrentTime] = useState(0);

  const [gridSize, setGridSize] = useState(30);

  const initialCoord = Math.floor(gridSize / 2);

  const [snake, setSnake] = useState<Coord[]>([
    { x: initialCoord, y: initialCoord },
    { x: initialCoord, y: initialCoord },
    { x: initialCoord, y: initialCoord },
  ]);

  const [snakeFood, setSnakeFood] = useState<Coord[]>([]);

  const [isActive, setIsActive] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const [tick, setTick] = useState(100);

  const [score, setScore] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const startClock = (i: number) => {
    timer.current = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + 1);
      // if (currentTime % 3 === 0) {
      //   tick.current *= 0.99;
      // }
    }, i);
  };

  const start = () => {
    setIsActive(true);
    startClock(tick);
  };

  const stop = () => {
    setIsActive(false);
    if (timer.current) {
      clearInterval(timer.current);
    }
    // setIsActive(false);
  };

  const increaseSpeed = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const newTick = tick * 0.99;
    setTick(newTick);
    startClock(newTick);
  };

  useEffect(() => {
    if (isActive) {
      let snakeHead: Coord;
      let newSnake: Coord[];

      setSnake((snake) => {
        newSnake = snake.map((segment, i) => {
          if (i === 0) {
            switch (direction.current) {
              case "RIGHT":
                return {
                  ...segment,
                  x: segment.x === gridSize ? 0 : segment.x + 1,
                };
              case "DOWN":
                return {
                  ...segment,
                  y: segment.y === gridSize ? 0 : segment.y + 1,
                };
              case "UP":
                return {
                  ...segment,
                  y: segment.y === 0 ? gridSize : segment.y - 1,
                };
              case "LEFT":
                return {
                  ...segment,
                  x: segment.x === 0 ? gridSize : segment.x - 1,
                };
            }
          }
          return snake[i - 1];
        });

        setSnakeFood((food) => {
          const eatingFoodIndex = food.findIndex(
            (food) => food.x === newSnake[0].x && food.y === newSnake[0].y,
          );
          if (eatingFoodIndex !== -1) {
            setScore((score) => score + 1);
            food.splice(eatingFoodIndex, 1);
            newSnake.push(newSnake[newSnake.length - 1]);
          }
          return food;
        });

        if (
          newSnake
            .slice(1, newSnake.length)
            .some(
              (segment) =>
                newSnake[0].x === segment.x && newSnake[0].y === segment.y,
            )
        ) {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          setIsActive(false);
          setIsGameOver(true);
        }

        return newSnake;
      });

      if (currentTime % 10 === 0) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        const newSnekFood = { x, y };
        setSnakeFood((snakeFood) => [...snakeFood, newSnekFood]);
      }
    }
  }, [currentTime, isActive, gridSize, direction]);

  /**
   * TODO: Rather than this weird "create an empty array and them generate the grid of cells from it", the grid should just be generated straight up
   */
  const grid = useMemo(() => {
    const init: null[] = [];

    for (let i = 0; i <= gridSize; i++) {
      init.push(null);
    }

    const grid = init.map((item) => {
      return [...init];
    });

    return grid;
  }, [gridSize]);

  const input = useRef(null);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {/* 
      Mapping over the grid on every render doesn't seem efficient
      I'm pretty sure it's causing performance problems at higher grid sizes 
      */}
      {grid.map((row, y) => (
        <div className="flex flex-row" key={y}>
          {row.map((cell, x) => {
            const isSnek = snake.some(
              (segment) => segment.x === x && segment.y === y,
            );
            const isFood = snakeFood.some(
              (food) => food.x === x && food.y === y,
            );
            return <Cell key={x} isSnek={isSnek} isFood={isFood} />;
          })}
        </div>
      ))}
      <button
        onClick={() => (direction.current = "UP")}
        className={"mt-20 h-10 rounded-full bg-blue-600 px-5"}
      >
        UP
      </button>
      <div className="my-2">
        <button
          onClick={() => (direction.current = "LEFT")}
          className={"mr-2 h-10 rounded-full bg-blue-600 px-5"}
        >
          LEFT
        </button>
        <button
          onClick={() => (direction.current = "RIGHT")}
          className={"h-10 rounded-full bg-blue-600 px-5"}
        >
          RIGHT
        </button>
      </div>
      <button
        onClick={() => (direction.current = "DOWN")}
        className={"h-10 rounded-full bg-blue-600 px-5"}
      >
        DOWN
      </button>
      <P>{score}</P>

      {!isActive && (
        <Modal>
          {isGameOver && <H2>Game Over</H2>}{" "}
          <button
            onClick={isActive ? stop : start}
            className={"mb-2 h-10 rounded-full bg-blue-600 px-5"}
          >
            Play!
          </button>
        </Modal>
      )}
    </div>
  );
}
