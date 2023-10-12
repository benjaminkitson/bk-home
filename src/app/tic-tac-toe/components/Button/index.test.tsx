import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("Button", () => {
  it("renders the Button component", () => {
    render(
      <Button buttonColor="blue" buttonSize="lg">
        Test Button
      </Button>,
    );

    const button = screen.getByText(/Test Button/i);

    const expectedClass =
      "rounded-lg m-5 bg-blue-400 hover:bg-blue-500 w-60 h-20 text-3xl";

    expect(button.className).toStrictEqual(expectedClass);
  });
});
