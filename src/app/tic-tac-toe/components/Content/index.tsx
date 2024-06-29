"use client";

import { Header } from "../../../../components/Molecules/Header";
import { AppContextProvider } from "../AppContext";
import Board from "../Board";
import { SelectPlayersModal } from "../SelectPlayersModal";

export type GameMode = "SINGLE_PLAYER" | "LOCAL_MULTI_PLAYER";

export type SquareContent = "X" | "O" | undefined;

// This should be related to player 1, player 2, cpu etc
export type Player = "X" | "O";

export type RowType = [SquareContent, SquareContent, SquareContent];

export type BoardType = [RowType, RowType, RowType];

export const Content = () => {
  return (
    <AppContextProvider>
      <Header title="Tic-Tac-Toe!" />
      <div className="relative flex w-full grow flex-col items-center justify-start pt-40">
        <Board />
        <SelectPlayersModal />
      </div>
    </AppContextProvider>
  );
};
