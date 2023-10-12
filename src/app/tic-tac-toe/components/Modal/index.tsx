import React, { ReactNode, useContext } from "react";
import { AppContext } from "../AppContext";
import { GameMode } from "../Content";
import { Button } from "../Button";

interface SelectPlayersButton {
  gameMode: GameMode;
  className?: string;
}

const SelectPlayersButton: React.FC<SelectPlayersButton> = ({
  gameMode,
  className,
}) => {
  const { setGameMode } = useContext(AppContext);
  // TODO: won't work for online multiplayer
  const text = gameMode === "SINGLE_PLAYER" ? "One player" : "Two players";

  return (
    <Button
      onClick={() => {
        setGameMode(gameMode);
      }}
      buttonColor="gray"
      buttonSize="md"
      className={className}
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
      } min-w-screen absolute left-0 top-0 z-50 h-screen w-screen items-center justify-center bg-white`}
    >
      <div className="flex h-96 w-5/6 flex-col items-center justify-center rounded-xl bg-blue-500 md:w-1/2 lg:w-1/3">
        <h1 className="mb-10 text-center text-3xl md:mb-0">
          Select number of players:
        </h1>
        <div className="flex h-1/2 w-full flex-col items-center justify-center p-2 md:flex-row">
          <SelectPlayersButton className="m-2" gameMode={"SINGLE_PLAYER"} />
          <SelectPlayersButton
            className="m-2"
            gameMode={"LOCAL_MULTI_PLAYER"}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
