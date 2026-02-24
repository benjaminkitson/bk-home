import { Modal } from "@/components/Molecules/Modal";
import React, { useContext } from "react";
import { Button } from "../../../../components/Atoms/Button";
import { AppContext } from "../AppContext";
import { GameMode } from "../Content";

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

export const SelectPlayersModal = () => {
  const { gameMode } = useContext(AppContext);

  return (
    <Modal
      isOpen={!gameMode}
      cardClassName="bg-gradient-to-br from-blue-600/75 to-sky-600/70 text-white ring-1 ring-white/20 backdrop-blur-sm"
    >
      <h1 className="mb-10 text-center text-3xl md:mb-0">
        Select number of players:
      </h1>
      <div className="flex h-1/2 w-full flex-col items-center justify-center p-2 md:flex-row">
        <SelectPlayersButton className="m-2" gameMode="SINGLE_PLAYER" />
        <SelectPlayersButton className="m-2" gameMode="LOCAL_MULTI_PLAYER" />
      </div>
    </Modal>
  );
};
