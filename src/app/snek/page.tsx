"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Cell } from "./components/Cell";
import { Grid } from "./components/Grid";
import { P } from "@/components/Atoms/Typography";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Coord = {
  x: number;
  y: number;
};

type GameState = {
  currentDirection: Direction | null;
  currentHead: Coord;
  gridSize: number;
  length: number;
};

export default function Home() {
  // const initialState: GameState = {
  //   currentDirection: null,
  //   currentHead: { x: 0, y: 0 },
  //   gridSize: 10,
  //   length: 1,
  // };

  const [currentTime, setCurrentTime] = useState(0);

  const gridSize = 40;

  const initialCoord = Math.floor(gridSize / 2);

  const [snake, setSnake] = useState<Coord[]>([
    { x: initialCoord, y: initialCoord },
    { x: initialCoord, y: initialCoord },
    { x: initialCoord, y: initialCoord },
  ]);

  const [snakeFood, setSnakeFood] = useState<Coord[]>([]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const [tick, setTick] = useState(100);

  /**
   * Not sure if this is fine as a ref or should be state
   */
  // const direction = useState<Direction>("UP");
  const direction = useRef("UP");
  const [isActive, setIsActive] = useState(false);

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
      setSnake((snake) => {
        return snake.map((segment, i) => {
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
      });
    }
  }, [currentTime, isActive]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <button
        onClick={isActive ? stop : start}
        className={"mb-2 h-10 rounded-full bg-blue-600 px-5"}
      >
        Button
      </button>
      <button
        onClick={increaseSpeed}
        className={"mb-2 h-10 rounded-full bg-blue-600 px-5"}
      >
        SPEED
      </button>
      <Grid gridSize={gridSize} snake={snake} />
      <button
        onClick={() => (direction.current = "UP")}
        className={"mt-2 h-10 rounded-full bg-blue-600 px-5"}
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
    </div>
  );
}
