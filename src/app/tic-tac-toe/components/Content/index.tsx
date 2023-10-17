"use client";

import Board from "../Board";
import Header from "../../../../components/Molecules/Header";
import { AppContextProvider } from "../AppContext";
import SelectPlayersModal from "../SelectPlayersModal";

export type GameMode = "SINGLE_PLAYER" | "LOCAL_MULTI_PLAYER";

export type SquareContent = "X" | "O" | undefined;

// This should be related to player 1, player 2, cpu etc
export type Player = "X" | "O";

export type RowType = [SquareContent, SquareContent, SquareContent];

export type BoardType = [RowType, RowType, RowType];

export const Content = () => {
  return (
    <AppContextProvider>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <Header />
        <div className="flex w-full grow flex-col items-center justify-start">
          <Board />
          <SelectPlayersModal />
        </div>
      </div>
    </AppContextProvider>
  );
};
