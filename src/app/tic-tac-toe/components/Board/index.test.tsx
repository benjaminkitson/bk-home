import { render, screen } from "@testing-library/react";
import Board from ".";
import { AppContext, AppContextType } from "../AppContext";

describe("Board", () => {
  // Not sure these really belong here, probably should be with the square component
  it("populates a square when the board data is passed in", () => {
    const mockBoardData = {
      board: [
        [undefined, undefined, undefined],
        ["X", undefined, undefined],
        [undefined, undefined, undefined],
      ],
    } as unknown as AppContextType;

    render(
      <AppContext.Provider value={mockBoardData}>
        <Board />
      </AppContext.Provider>,
    );

    const xSquare = screen.getByTestId("1-0");

    expect(xSquare.firstChild).not.toBeNull();
  });

  it("leaves other squares empty when a single one is populated", () => {
    const mockBoardData = {
      board: [
        [undefined, undefined, undefined],
        ["X", undefined, undefined],
        [undefined, undefined, undefined],
      ],
    } as unknown as AppContextType;

    render(
      <AppContext.Provider value={mockBoardData}>
        <Board />
      </AppContext.Provider>,
    );

    const xSquare = screen.getByTestId("2-0");

    expect(xSquare.firstChild).toBeNull();
  });
});
