"use client";

import { MutableRefObject, useMemo } from "react";
import { Cell } from "../components/Cell";
import { H1, H2 } from "@/components/Atoms/Typography";
import { Modal } from "@/components/Molecules/Modal";
import { Button } from "@/components/Atoms/Button";
import Link from "next/link";
import { useSnek } from "../hooks/useSnek";
import { DirectionButtons } from "./DirectionButtons";
import { Direction } from "../types";

export default function Game({
  direction,
}: {
  direction: MutableRefObject<Direction>;
}) {
  const [snekState, dispatch] = useSnek({ directionRef: direction });

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

      <DirectionButtons directionRef={direction} />

      <Modal cardClassName="flex flex-col" isOpen={!snekState.isActive}>
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
    </div>
  );
}
