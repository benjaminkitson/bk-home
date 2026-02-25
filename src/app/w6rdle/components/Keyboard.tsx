import { twMerge } from "tailwind-merge";
import type { LetterState } from "../types";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const stateClasses: Record<LetterState, string> = {
  CORRECT: "bg-emerald-500 text-white",
  PRESENT: "bg-amber-500 text-white",
  ABSENT: "bg-white/10 text-white/40",
  EMPTY: "bg-white/20 text-white",
};

interface KeyboardProps {
  keyboardState: Record<string, LetterState>;
  onKey: (key: string) => void;
}

export function Keyboard({ keyboardState, onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => {
            const state = keyboardState[key] ?? "EMPTY";
            const isWide = key === "ENTER" || key === "BACKSPACE";
            const label = key === "BACKSPACE" ? "⌫" : key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onKey(key)}
                className={twMerge(
                  "flex h-12 items-center justify-center rounded-md font-semibold transition-colors duration-200 md:h-14",
                  isWide
                    ? "px-3 text-xs md:px-4 md:text-sm"
                    : "w-8 text-sm md:w-10 md:text-base",
                  stateClasses[state],
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
