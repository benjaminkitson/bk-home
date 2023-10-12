import React, { useContext } from "react";
import Row from "../Row";
import { AppContext } from "../AppContext";
import { Button } from "../Button";

function Board() {
  const { board, resetGame } = useContext(AppContext);

  return (
    <>
      <div className="grid grid-rows-3 gap-2 md:gap-4">
        {board.map((row, i) => (
          <Row row={i} squares={row} key={i} />
        ))}
      </div>
      <Button buttonColor="blue" buttonSize="lg" onClick={() => resetGame()}>
        Reset
      </Button>
    </>
  );
}

export default Board;
