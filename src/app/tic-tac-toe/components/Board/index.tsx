import React, { useContext } from "react";
import Row from "../Row";
import { AppContext } from "../AppContext";
import { Button } from "../../../../components/Atoms/Button";
import Link from "next/link";

function Board() {
  const { board, resetGame } = useContext(AppContext);

  return (
    <>
      <div className="grid grid-rows-3 gap-2 md:gap-4">
        {board.map((row, i) => (
          <Row row={i} squares={row} key={i} />
        ))}
      </div>
      <Button
        buttonColor="blue"
        buttonSize="lg"
        className="m-8"
        onClick={() => resetGame()}
      >
        Reset
      </Button>
      <Link href="/">
        <Button buttonColor="gray" buttonSize="sm">
          Home
        </Button>
      </Link>
    </>
  );
}

export default Board;
