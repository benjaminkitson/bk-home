import { useContext } from "react";
import { RxCircle, RxCross1 } from "react-icons/rx";

import { AppContext } from "../AppContext";
import { BoardType, SquareContent } from "../Content";

interface SquareProps {
  content: SquareContent;
  row: number;
  col: number;
}

function Square({ content, row, col }: SquareProps) {
  const { gameOver, crossesTurn, setBoard, board } = useContext(AppContext);

  const markSquare = (row?: number, col?: number) => {
    // TODO: row and col shouldn't need to be "asserted" here, fix
    if (
      !gameOver &&
      row !== undefined &&
      col !== undefined &&
      !board[row][col]
    ) {
      const newBoard: BoardType = [...board];
      newBoard[row][col] = crossesTurn ? "X" : "O";
      setBoard(newBoard);
    } else {
      console.log("invalid");
    }
  };

  return (
    <div
      className={`flex items-center justify-center text-6xl md:text-8xl ${
        gameOver || content ? "" : "hover:cursor-pointer hover:bg-blue-300"
      } square h-28 w-28  rounded-xl border border-gray-400 bg-blue-100 md:h-44 md:w-44 lg:h-52 lg:w-52`}
      onClick={() => markSquare(row, col)}
      data-testid={`${row}-${col}`}
      // gameOver={gameOver}
    >
      {
        // TODO: This is dumb and needs to change
      }
      {content === "X" ? (
        <RxCross1 className="text-7xl md:text-9xl" />
      ) : content === "O" ? (
        <RxCircle className="text-7xl md:text-9xl" />
      ) : null}
    </div>
  );
}

export default Square;
