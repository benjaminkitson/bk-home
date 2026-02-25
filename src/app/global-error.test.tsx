import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlobalError from "./global-error";

const error = new Error("boom");

describe("GlobalError", () => {
  it("renders the heading", () => {
    render(<GlobalError error={error} reset={jest.fn()} />);
    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
  });

  it("renders the descriptive message", () => {
    render(<GlobalError error={error} reset={jest.fn()} />);
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });

  it("renders a try again button", () => {
    render(<GlobalError error={error} reset={jest.fn()} />);
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("calls reset when try again is clicked", async () => {
    const reset = jest.fn();
    render(<GlobalError error={error} reset={reset} />);
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
