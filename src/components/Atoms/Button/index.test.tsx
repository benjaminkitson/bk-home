import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
  it("correcly sets the button's colour", () => {
    render(
      <Button buttonColor="blue" buttonSize="lg">
        Test Button
      </Button>,
    );

    const button = screen.getByText(/Test Button/i);

    expect(button.className.split(" ")).toContain("bg-blue-400");
  });

  it("correcly sets the button's size", () => {
    render(
      <Button buttonColor="blue" buttonSize="lg">
        Test Button
      </Button>,
    );

    const button = screen.getByText(/Test Button/i);

    expect(button.className.split(" ")).toContain("w-60");
  });
});
