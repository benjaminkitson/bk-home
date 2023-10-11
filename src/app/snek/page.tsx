"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Cell } from "./components/Cell";
import { H2, P } from "@/components/Atoms/Typography";
import Game from "./components/Game";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

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

export default function Snek() {
  /**
   * Not sure if this is fine as a ref or should be state
   */
  // const [isActive, setIsActive] = useState(false);
  const direction = useRef("UP");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          direction.current = "UP";
          break;
        case "ArrowDown":
          direction.current = "DOWN";
          break;
        case "ArrowLeft":
          direction.current = "LEFT";
          break;
        case "ArrowRight":
          direction.current = "RIGHT";
          break;
      }
    });

    return () => {
      window.removeEventListener("keydown", () => console.log("test"));
    };
  }, []);

  return <Game direction={direction} />;
}
