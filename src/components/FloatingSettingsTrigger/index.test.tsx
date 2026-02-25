import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { FloatingSettingsTrigger } from ".";

// Mock next/navigation so we can control the active route
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock SettingsCogButton to avoid needing the full SettingsContext in these tests
jest.mock("@/components/SettingsCogButton", () => ({
  SettingsCogButton: () => <button>Settings</button>,
}));

const mockUsePathname = usePathname as jest.Mock;

describe("FloatingSettingsTrigger", () => {
  it("renders on the home route", () => {
    mockUsePathname.mockReturnValue("/");
    render(<FloatingSettingsTrigger />);
    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
  });

  it("does not render on /snek", () => {
    mockUsePathname.mockReturnValue("/snek");
    const { container } = render(<FloatingSettingsTrigger />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render on /pokedex", () => {
    mockUsePathname.mockReturnValue("/pokedex");
    const { container } = render(<FloatingSettingsTrigger />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render on /tic-tac-toe", () => {
    mockUsePathname.mockReturnValue("/tic-tac-toe");
    const { container } = render(<FloatingSettingsTrigger />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render on /w6rdle", () => {
    mockUsePathname.mockReturnValue("/w6rdle");
    const { container } = render(<FloatingSettingsTrigger />);
    expect(container.firstChild).toBeNull();
  });
});
