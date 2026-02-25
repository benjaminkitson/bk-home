"use client";

import { Button } from "@/components/Atoms/Button";
import { H1 } from "@/components/Atoms/Typography";
import { useW6rdle } from "../hooks/useW6rdle";
import { Grid } from "./Grid";
import { Keyboard } from "./Keyboard";

export default function Game({ word }: { word: string }) {
  const {
    rows,
    status,
    target,
    shake,
    currentRowIndex,
    keyboardState,
    handleKey,
    reset,
  } = useW6rdle(word);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 pb-8 pt-28">
      <Grid rows={rows} currentRowIndex={currentRowIndex} shake={shake} />

      {status !== "IN_PROGRESS" && (
        <div className="flex flex-col items-center gap-3">
          <H1 className="text-2xl md:text-3xl">
            {status === "WON" ? "Nice one!" : `The word was ${target}`}
          </H1>
          <Button onClick={reset} buttonColor="blue" buttonSize="md">
            Play again
          </Button>
        </div>
      )}

      <Keyboard keyboardState={keyboardState} onKey={handleKey} />
    </div>
  );
}
