import { useContext } from "react";
import { Button } from "../../../../components/Atoms/Button";
import { AppContext } from "../AppContext";
import Row from "../Row";

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
    </>
  );
}

export default Board;
