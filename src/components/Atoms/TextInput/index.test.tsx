import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from ".";

describe("TextInput", () => {
  it("renders an input element", () => {
    render(<TextInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies the placeholder", () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with the given value", () => {
    render(<TextInput value="hello" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange when the user types", async () => {
    const onChange = jest.fn();
    render(<TextInput onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "test");
    expect(onChange).toHaveBeenCalled();
  });

  it("merges custom className with defaults", () => {
    render(<TextInput className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
    expect(input).toHaveClass("rounded-md");
  });
});
