"use client";

// TODO: All of this stuff can be bundled into custom hooks etc
import React, { useEffect, useState } from "react";
import endConditions from "../../utilities/endconditions";
import mrRobot from "../../utilities/robot";
import { BoardType, GameMode, Player, SquareContent } from "../Content";

export type AppContextType = {
  gameMode: GameMode | undefined;
  board: BoardType;
  crossesTurn: boolean;
  gameOver: boolean;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  resetGame: () => void;
  statusText: () =>
    | "Tie!"
    | "Winner: O"
    | "Winner: X"
    | "Current Turn: X"
    | "Current Turn: O";
  setGameMode: React.Dispatch<React.SetStateAction<GameMode | undefined>>;
};

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType,
);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  // Gross useState stuff that should be in a reducer
  const [gameMode, setGameMode] = useState<GameMode | undefined>(undefined);
  const [board, setBoard] = useState<BoardType>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [isCrossesTurn, setIsCrossesTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<Player | undefined>(
    undefined,
  );

  // Logic evaluating the end state of the game
  const isGameEnd = () => {
    const didWin = endConditions(board).some((condition) => {
      return condition;
    });
    const isTie = board.flat().every((square: SquareContent) => square);
    if (didWin) {
      setIsGameOver(true);
      setWinningPlayer(isCrossesTurn ? "X" : "O");
    } else if (isTie) {
      setIsGameOver(true);
    }
  };

  // Resets all state
  const resetGame = () => {
    setIsGameOver(false);
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setIsCrossesTurn(true);
    setWinningPlayer(undefined);
  };

  // Generates the status text (this has no business beign here lol)
  const statusText = () => {
    if (isGameOver) {
      if (!winningPlayer) {
        return "Tie!";
      } else {
        return isCrossesTurn ? "Winner: O" : "Winner: X";
      }
    } else {
      return isCrossesTurn ? "Current Turn: X" : "Current Turn: O";
    }
  };

  // Responds to the board changing and toggles the turn
  useEffect(() => {
    if (!board.flat().every((square: SquareContent) => !square)) {
      isGameEnd();
      setIsCrossesTurn(!isCrossesTurn);
    }
  }, [board]);

  // Checks if it's the CPU's turn, and plays a move if it is
  useEffect(() => {
    if (!board.flat().every((square: SquareContent) => !square)) {
      const shouldRobot =
        !isCrossesTurn &&
        !board.flat().every((square: SquareContent) => square) &&
        gameMode === "SINGLE_PLAYER" &&
        !isGameOver;
      if (shouldRobot) mrRobot(board, setBoard);
    }
  }, [isCrossesTurn]);

  const data = {
    gameMode,
    board,
    crossesTurn: isCrossesTurn,
    gameOver: isGameOver,
    setBoard,
    resetGame,
    statusText,
    setGameMode,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
