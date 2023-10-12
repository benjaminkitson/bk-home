import React from "react";
import Square from "../Square";
import { RowType } from "../Content";

interface RowProps {
  row: number;
  squares: RowType;
}

function Row({ row, squares }: RowProps) {
  return (
    <div className="inline-grid w-fit grid-cols-3 gap-2 md:gap-4">
      {squares.map((square, i) => (
        <Square col={i} content={square} row={row} key={row + i} />
      ))}
    </div>
  );
}

export default Row;
