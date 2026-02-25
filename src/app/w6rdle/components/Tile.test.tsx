import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Tile } from "./Tile";

describe("Tile", () => {
  it("renders the letter", () => {
    const { getByText } = render(<Tile letter="A" state="EMPTY" />);
    expect(getByText("A")).toBeInTheDocument();
  });

  it("applies correct state class", () => {
    const { container } = render(<Tile letter="A" state="CORRECT" />);
    expect(container.firstChild).toHaveClass("bg-emerald-500");
  });

  it("applies present state class", () => {
    const { container } = render(<Tile letter="A" state="PRESENT" />);
    expect(container.firstChild).toHaveClass("bg-amber-500");
  });

  it("applies absent state class", () => {
    const { container } = render(<Tile letter="A" state="ABSENT" />);
    expect(container.firstChild).toHaveClass("bg-white/10");
  });

  it("applies a brighter ring when an empty tile has a letter", () => {
    const { container } = render(<Tile letter="B" state="EMPTY" />);
    expect(container.firstChild).toHaveClass("ring-white/30");
  });

  it("does not apply the filled-empty ring when there is no letter", () => {
    const { container } = render(<Tile letter="" state="EMPTY" />);
    expect(container.firstChild).not.toHaveClass("ring-white/30");
  });

  it("applies a custom className", () => {
    const { container } = render(
      <Tile letter="A" state="EMPTY" className="custom" />,
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
