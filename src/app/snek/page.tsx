"use client";

import { useEffect, useRef } from "react";
import Game from "./components/Game";
import { Direction } from "./types";

export default function Snek() {
  const direction = useRef<Direction>("UP");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      // TODO: these are duplicated across in reducer - need to change this
      switch (e.key) {
        case "ArrowUp":
          if (direction.current != "DOWN") {
            direction.current = "UP";
          }
          break;
        case "ArrowDown":
          if (direction.current != "UP") {
            direction.current = "DOWN";
          }
          break;
        case "ArrowLeft":
          if (direction.current != "RIGHT") {
            direction.current = "LEFT";
          }
          break;
        case "ArrowRight":
          if (direction.current != "LEFT") {
            direction.current = "RIGHT";
          }
          break;
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return <Game direction={direction} />;
}
