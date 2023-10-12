import React, { ReactNode, useContext } from "react";
import { AppContext } from "../AppContext";
import { GameMode } from "../Content";
import { Button } from "../Button";

const SelectPlayersButton = ({ gameMode }: { gameMode: GameMode }) => {
  const { setGameMode } = useContext(AppContext);
  // TODO: won't work for online multiplayer
  const text =
    gameMode === "SINGLE_PLAYER" ? "Single Player" : "Local Multi Player";

  return (
    <Button
      onClick={() => {
        setGameMode(gameMode);
      }}
      buttonColor="gray"
      buttonSize="md"
    >
      {text}
    </Button>
  );
};

function Modal() {
  const { gameMode } = useContext(AppContext);
  // return null;
  return (
    <div
      className={`${
        gameMode ? "hidden" : "flex"
      } absolute left-0 top-0 z-50 h-screen w-screen items-center justify-center bg-white`}
    >
      <div className="flex h-96 w-5/6 flex-col items-center justify-center rounded-xl bg-blue-500 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl">Select number of players:</h1>
        <div className="flex h-1/2 w-2/3 items-center justify-between">
          <SelectPlayersButton gameMode={"SINGLE_PLAYER"} />
          <SelectPlayersButton gameMode={"LOCAL_MULTI_PLAYER"} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
