import type { EvaluatedLetter } from "../types";
import { Tile } from "./Tile";

interface GridProps {
  rows: (EvaluatedLetter[] | null)[];
  currentRowIndex: number;
  shake: boolean;
}

export function Grid({ rows, currentRowIndex, shake }: GridProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex gap-1.5 ${shake && i === currentRowIndex ? "animate-shake" : ""}`}
        >
          {row?.map((tile, j) => (
            <Tile key={j} letter={tile.letter} state={tile.state} />
          ))}
        </div>
      ))}
    </div>
  );
}
