export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Coord = {
  x: number;
  y: number;
};

export type SnekState = {
  currentDirection?: Direction;
  gridSize: number;
  snake: Coord[];
  snakeFood: Coord[];
  tick: number;
  score: number;
  isGameOver: boolean;
  isActive: boolean;
  currentTime: number;
};

export type ActionType =
  | "START_GAME"
  | "SNAKE_MOVES"
  | "SNAKE_MOVES"
  | "CHECK_EATS_FOOD"
  | "CHECK_GAME_OVER"
  | "GENERATE_FOOD"
  | "INCREMENT_TIME";

export type SnekAction = { type: ActionType };
