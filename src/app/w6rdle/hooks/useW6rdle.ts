import { useCallback, useEffect, useState } from "react";
import type { EvaluatedLetter, GameStatus, LetterState } from "../types";
import { VALID_GUESSES } from "../words";

const WORD_LENGTH = 6;
const MAX_GUESSES = 6;

function evaluateGuess(guess: string, target: string): EvaluatedLetter[] {
  const result: EvaluatedLetter[] = guess.split("").map((letter) => ({
    letter,
    state: "absent" as LetterState,
  }));

  const targetLetters = target.split("");
  const remaining: (string | null)[] = [...targetLetters];

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].letter === targetLetters[i]) {
      result[i].state = "CORRECT";
      remaining[i] = null;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].state === "CORRECT") continue;
    const idx = remaining.indexOf(result[i].letter);
    if (idx !== -1) {
      result[i].state = "PRESENT";
      remaining[idx] = null;
    }
  }

  return result;
}

export function useW6rdle(word: string) {
  const [target] = useState(word);
  const [guesses, setGuesses] = useState<EvaluatedLetter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState<GameStatus>("IN_PROGRESS");
  const [shake, setShake] = useState(false);

  const keyboardState = useCallback((): Record<string, LetterState> => {
    const map: Record<string, LetterState> = {};
    for (const guess of guesses) {
      for (const { letter, state } of guess) {
        const existing = map[letter];
        if (state === "CORRECT") {
          map[letter] = "CORRECT";
        } else if (state === "PRESENT" && existing !== "CORRECT") {
          map[letter] = "PRESENT";
        } else if (!existing) {
          map[letter] = "ABSENT";
        }
      }
    }
    return map;
  }, [guesses]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) return;
    if (!VALID_GUESSES.has(currentGuess)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const evaluated = evaluateGuess(currentGuess, target);
    const newGuesses = [...guesses, evaluated];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === target) {
      setStatus("WON");
    } else if (newGuesses.length >= MAX_GUESSES) {
      setStatus("LOST");
    }
  }, [currentGuess, target, guesses]);

  const handleKey = useCallback(
    (key: string) => {
      if (status !== "IN_PROGRESS") return;

      if (key === "ENTER") {
        submitGuess();
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [status, currentGuess, submitGuess],
  );

  const reset = useCallback(() => {
    setGuesses([]);
    setCurrentGuess("");
    setStatus("IN_PROGRESS");
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const rows: (EvaluatedLetter[] | null)[] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      rows.push(guesses[i]);
    } else if (i === guesses.length) {
      rows.push(
        currentGuess
          .padEnd(WORD_LENGTH)
          .split("")
          .map((ch) => ({
            letter: ch === " " ? "" : ch,
            state: "empty" as LetterState,
          })),
      );
    } else {
      rows.push(
        Array.from({ length: WORD_LENGTH }, () => ({
          letter: "",
          state: "empty" as LetterState,
        })),
      );
    }
  }

  return {
    rows,
    status,
    target,
    shake,
    currentRowIndex: guesses.length,
    keyboardState: keyboardState(),
    handleKey,
    reset,
  };
}
