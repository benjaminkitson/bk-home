import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DirectionButton } from ".";

describe("Button", () => {
  const mockOnClick = () => {};
  it("applies the correct icon for a given direction", () => {
    render(<DirectionButton onClick={mockOnClick} direction="LEFT" />);

    const leftIcon = screen.getByTestId("direction-icon-left");

    expect(leftIcon).toBeInTheDocument();
  });
});
