import { useState } from "react";
import { Cell } from "./Cell";

export const Grid = ({ snake, gridSize }) => {
  const init = [];

  for (let i = 0; i <= gridSize; i++) {
    init.push(1);
  }

  const grid = init.map((item) => {
    return [...init];
  });

  return grid.map((row, y) => (
    <div className="flex flex-row" key={y}>
      {row.map((cell, x) => {
        return (
          <Cell
            key={x}
            isSnek={snake.some((segment) => segment.x === x && segment.y === y)}
          />
        );
      })}
    </div>
  ));
};
