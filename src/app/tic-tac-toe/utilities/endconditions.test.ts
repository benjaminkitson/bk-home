import endConditions from "./endconditions";
import { BoardType } from "../components/Content";

const _ = undefined;

describe("endConditions", () => {
  it("returns all false for an empty board", () => {
    const board: BoardType = [
      [_, _, _],
      [_, _, _],
      [_, _, _],
    ];
    expect(endConditions(board).every((c) => c === false)).toBe(true);
  });

  it("detects top row win", () => {
    const board: BoardType = [
      ["X", "X", "X"],
      [_, _, _],
      [_, _, _],
    ];
    expect(endConditions(board)[0]).toBe(true);
  });

  it("detects middle row win", () => {
    const board: BoardType = [
      [_, _, _],
      ["O", "O", "O"],
      [_, _, _],
    ];
    expect(endConditions(board)[1]).toBe(true);
  });

  it("detects bottom row win", () => {
    const board: BoardType = [
      [_, _, _],
      [_, _, _],
      ["X", "X", "X"],
    ];
    expect(endConditions(board)[2]).toBe(true);
  });

  it("detects first column win", () => {
    const board: BoardType = [
      ["O", _, _],
      ["O", _, _],
      ["O", _, _],
    ];
    expect(endConditions(board)[3]).toBe(true);
  });

  it("detects second column win", () => {
    const board: BoardType = [
      [_, "X", _],
      [_, "X", _],
      [_, "X", _],
    ];
    expect(endConditions(board)[4]).toBe(true);
  });

  it("detects third column win", () => {
    const board: BoardType = [
      [_, _, "O"],
      [_, _, "O"],
      [_, _, "O"],
    ];
    expect(endConditions(board)[5]).toBe(true);
  });

  it("detects top-left to bottom-right diagonal win", () => {
    const board: BoardType = [
      ["X", _, _],
      [_, "X", _],
      [_, _, "X"],
    ];
    expect(endConditions(board)[6]).toBe(true);
  });

  it("detects top-right to bottom-left diagonal win", () => {
    const board: BoardType = [
      [_, _, "O"],
      [_, "O", _],
      ["O", _, _],
    ];
    expect(endConditions(board)[7]).toBe(true);
  });

  it("does not trigger when a row has mixed players", () => {
    const board: BoardType = [
      ["X", "O", "X"],
      [_, _, _],
      [_, _, _],
    ];
    expect(endConditions(board).every((c) => c === false)).toBe(true);
  });

  it("only flags the winning condition, not others", () => {
    const board: BoardType = [
      ["X", "X", "X"],
      ["O", "O", _],
      [_, _, _],
    ];
    const results = endConditions(board);
    expect(results[0]).toBe(true);
    expect(results.filter(Boolean).length).toBe(1);
  });
});
