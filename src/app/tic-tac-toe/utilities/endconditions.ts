import { BoardType } from "../components/Content";

const endConditions = (board: BoardType) => {
  return [
    // Rows equal
    board[0][0] !== undefined &&
      board[0][0] === board[0][1] &&
      board[0][0] === board[0][2],
    board[1][0] !== undefined &&
      board[1][0] === board[1][1] &&
      board[1][0] === board[1][2],
    board[2][0] !== undefined &&
      board[2][0] === board[2][1] &&
      board[2][0] === board[2][2],
    // Columns equal
    board[0][0] !== undefined &&
      board[0][0] === board[1][0] &&
      board[0][0] === board[2][0],
    board[0][1] !== undefined &&
      board[0][1] === board[1][1] &&
      board[0][1] === board[2][1],
    board[0][2] !== undefined &&
      board[0][2] === board[1][2] &&
      board[0][2] === board[2][2],
    // Diagonals
    board[0][0] !== undefined &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2],
    board[0][2] !== undefined &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0],
  ];
};

export default endConditions;
