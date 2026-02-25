import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokedexError from "./error";

jest.mock("@/components/Molecules/Header", () => ({
  Header: ({ title }: { title: string }) => <header>{title}</header>,
}));

jest.mock("./components/Pokeball", () => ({
  Pokeball: () => <div data-testid="pokeball" />,
}));

describe("PokedexError", () => {
  it("renders the error message", () => {
    render(<PokedexError reset={jest.fn()} />);
    expect(screen.getByText(/could not load/i)).toBeInTheDocument();
  });

  it("renders the descriptive hint", () => {
    render(<PokedexError reset={jest.fn()} />);
    expect(screen.getByText(/api is unreachable/i)).toBeInTheDocument();
  });

  it("renders the header with the Pokedex title", () => {
    render(<PokedexError reset={jest.fn()} />);
    expect(screen.getByText("Pokedex")).toBeInTheDocument();
  });

  it("renders the Pokeball decoration", () => {
    render(<PokedexError reset={jest.fn()} />);
    expect(screen.getByTestId("pokeball")).toBeInTheDocument();
  });

  it("renders a try again button", () => {
    render(<PokedexError reset={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("calls reset when try again is clicked", async () => {
    const reset = jest.fn();
    render(<PokedexError reset={reset} />);
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
