import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Keyboard } from "./Keyboard";

const emptyState: Record<string, never> = {};

describe("Keyboard", () => {
  it("renders all letter keys", () => {
    render(<Keyboard keyboardState={emptyState} onKey={jest.fn()} />);
    for (const key of ["Q", "W", "E", "A", "Z"]) {
      expect(screen.getByRole("button", { name: key })).toBeInTheDocument();
    }
  });

  it("renders ENTER key", () => {
    render(<Keyboard keyboardState={emptyState} onKey={jest.fn()} />);
    expect(screen.getByRole("button", { name: "ENTER" })).toBeInTheDocument();
  });

  it("renders BACKSPACE as ⌫", () => {
    render(<Keyboard keyboardState={emptyState} onKey={jest.fn()} />);
    expect(screen.getByRole("button", { name: "⌫" })).toBeInTheDocument();
  });

  it("calls onKey with the correct key when a letter is clicked", async () => {
    const onKey = jest.fn();
    render(<Keyboard keyboardState={emptyState} onKey={onKey} />);
    await userEvent.click(screen.getByRole("button", { name: "A" }));
    expect(onKey).toHaveBeenCalledWith("A");
  });

  it("calls onKey with ENTER when ENTER is clicked", async () => {
    const onKey = jest.fn();
    render(<Keyboard keyboardState={emptyState} onKey={onKey} />);
    await userEvent.click(screen.getByRole("button", { name: "ENTER" }));
    expect(onKey).toHaveBeenCalledWith("ENTER");
  });

  it("calls onKey with BACKSPACE when ⌫ is clicked", async () => {
    const onKey = jest.fn();
    render(<Keyboard keyboardState={emptyState} onKey={onKey} />);
    await userEvent.click(screen.getByRole("button", { name: "⌫" }));
    expect(onKey).toHaveBeenCalledWith("BACKSPACE");
  });

  it("applies correct state class to a guessed letter", () => {
    render(<Keyboard keyboardState={{ A: "CORRECT" }} onKey={jest.fn()} />);
    expect(screen.getByRole("button", { name: "A" })).toHaveClass(
      "bg-emerald-500",
    );
  });

  it("applies present state class to a present letter", () => {
    render(<Keyboard keyboardState={{ S: "PRESENT" }} onKey={jest.fn()} />);
    expect(screen.getByRole("button", { name: "S" })).toHaveClass(
      "bg-amber-500",
    );
  });
});
