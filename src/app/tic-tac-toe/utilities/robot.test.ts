import { BoardType } from "../components/Content";
import mrRobot from "./robot";

const _ = undefined;

describe("mrRobot", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  function runRobot(board: BoardType): BoardType {
    const setBoard = jest.fn();
    mrRobot(board, setBoard);
    jest.runAllTimers();
    return setBoard.mock.calls[0][0] as BoardType;
  }

  it("takes the center square when the board is empty", () => {
    const board: BoardType = [
      [_, _, _],
      [_, _, _],
      [_, _, _],
    ];
    const result = runRobot(board);
    expect(result[1][1]).toBe("O");
  });

  it("finishes a winning line when two O's are in a row", () => {
    const board: BoardType = [
      ["O", "O", _],
      [_, _, _],
      [_, _, _],
    ];
    const result = runRobot(board);
    expect(result[0][2]).toBe("O");
  });

  it("blocks when the opponent has two in a row", () => {
    const board: BoardType = [
      ["X", "X", _],
      [_, _, _],
      [_, "O", _],
    ];
    const result = runRobot(board);
    expect(result[0][2]).toBe("O");
  });

  it("prioritises finishing over blocking", () => {
    // O can win via top-left diagonal ([0][0],[1][1],[2][2]), free at [0][0]
    // X threatens first row ([0][0],[0][1],[0][2]), also free at [0][0]
    // Robot should go for the win rather than just blocking
    const board: BoardType = [
      [_, "X", "X"],
      [_, "O", _],
      [_, _, "O"],
    ];
    const result = runRobot(board);
    expect(result[0][0]).toBe("O");
  });

  it("always places exactly one O", () => {
    const board: BoardType = [
      [_, _, _],
      [_, _, _],
      [_, _, _],
    ];
    const result = runRobot(board);
    const oCount = result.flat().filter((s) => s === "O").length;
    expect(oCount).toBe(1);
  });
});
