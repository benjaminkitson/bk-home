import { twMerge } from "tailwind-merge";
import type { LetterState } from "../types";

const stateClasses: Record<LetterState, string> = {
  correct: "bg-emerald-500 ring-emerald-400/50 text-white",
  present: "bg-amber-500 ring-amber-400/50 text-white",
  absent: "bg-white/10 ring-white/10 text-white/60",
  empty: "bg-white/5 ring-white/15 text-white",
};

interface TileProps {
  letter: string;
  state: LetterState;
  className?: string;
}

export function Tile({ letter, state, className }: TileProps) {
  return (
    <div
      className={twMerge(
        "flex h-14 w-14 items-center justify-center rounded-lg text-2xl font-bold ring-1 ring-inset transition-colors duration-300 md:h-16 md:w-16 md:text-3xl",
        stateClasses[state],
        letter && state === "empty" && "bg-white/10 ring-white/30",
        className,
      )}
    >
      {letter}
    </div>
  );
}
