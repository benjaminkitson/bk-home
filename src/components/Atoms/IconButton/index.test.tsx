import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BsGithub } from "react-icons/bs";
import { IconButton } from ".";

describe("IconButton", () => {
  it("renders a button element", () => {
    render(<IconButton Icon={BsGithub} aria-label="GitHub" />);
    expect(screen.getByRole("button", { name: "GitHub" })).toBeInTheDocument();
  });

  it("renders the icon inside the button", () => {
    render(<IconButton Icon={BsGithub} aria-label="GitHub" />);
    const button = screen.getByRole("button", { name: "GitHub" });
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(
      <IconButton Icon={BsGithub} onClick={onClick} aria-label="GitHub" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "GitHub" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards data-testid", () => {
    render(<IconButton Icon={BsGithub} data-testid="my-icon-btn" />);
    expect(screen.getByTestId("my-icon-btn")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <IconButton
        Icon={BsGithub}
        aria-label="GitHub"
        className="custom-class"
      />,
    );
    expect(screen.getByRole("button", { name: "GitHub" })).toHaveClass(
      "custom-class",
    );
  });
});
