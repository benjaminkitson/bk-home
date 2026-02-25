import moment from "moment";
import wordList from "./words.json";

export const WORDS: string[] = wordList;

export const VALID_GUESSES = new Set(WORDS);

export function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const EPOCH = moment("2025-01-01");

export function getDailyWord(): string {
  const dayIndex = moment().startOf("day").diff(EPOCH, "days");
  return WORDS[dayIndex % WORDS.length];
}
