import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Cell } from ".";
import { snekBgColour, foodBgColour, standardBgColour } from ".";

describe("Cell", () => {
  it("uses the correct colour when the cell contains part of the snake", () => {
    render(<Cell isSnek={true} isFood={false} />);

    const cell = screen.getByTestId("snek-cell");

    expect(cell.className.split(" ")).toContain(snekBgColour);
  });

  it("uses the correct colour when the cell contains snake food", () => {
    render(<Cell isSnek={false} isFood={true} />);

    const cell = screen.getByTestId("snek-cell");

    expect(cell.className.split(" ")).toContain(foodBgColour);
  });

  it("uses the correct colour when the cell contains snake food", () => {
    render(<Cell isSnek={false} isFood={false} />);

    const cell = screen.getByTestId("snek-cell");

    expect(cell.className.split(" ")).toContain(standardBgColour);
  });
});
