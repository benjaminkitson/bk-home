import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/SettingsCogButton", () => ({
  SettingsCogButton: () => <button>Settings</button>,
}));

describe("Header", () => {
  it("renders the title", () => {
    render(<Header title="POKEDEX" />);
    expect(screen.getByText("POKEDEX")).toBeInTheDocument();
  });

  it("renders a home link pointing to /", () => {
    render(<Header title="SNEK" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("renders the settings button", () => {
    render(<Header title="Test" />);
    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
  });
});
