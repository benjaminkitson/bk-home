export type LetterState = "CORRECT" | "PRESENT" | "ABSENT" | "EMPTY";

export interface EvaluatedLetter {
  letter: string;
  state: LetterState;
}

export type GameStatus = "IN_PROGRESS" | "WON" | "LOST";
