"use client";

import { useEffect, useRef } from "react";
import Game from "./components/Game";
import { Direction } from "./types";

export default function Snek() {
  const direction = useRef<Direction>("UP");

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
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  return <Game direction={direction} />;
}
