import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("Button", () => {
  it("renders children", () => {
    render(
      <Button buttonColor="blue" buttonSize="md">
        Click me
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies blue color classes", () => {
    render(
      <Button buttonColor="blue" buttonSize="md">
        Button
      </Button>,
    );
    expect(screen.getByRole("button").className).toContain("from-blue-400");
  });

  it("applies gray color classes", () => {
    render(
      <Button buttonColor="gray" buttonSize="md">
        Button
      </Button>,
    );
    expect(screen.getByRole("button").className).toContain("from-white/30");
  });

  it("applies lg size classes", () => {
    render(
      <Button buttonColor="blue" buttonSize="lg">
        Button
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("min-w-32");
  });

  it("applies sm size classes", () => {
    render(
      <Button buttonColor="blue" buttonSize="sm">
        Button
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("min-w-16");
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button buttonColor="blue" buttonSize="md" disabled>
        Button
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when isLoading is true", () => {
    render(
      <Button buttonColor="blue" buttonSize="md" isLoading>
        Button
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies disabled styles when disabled", () => {
    render(
      <Button buttonColor="blue" buttonSize="md" disabled>
        Button
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-gray-100");
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(
      <Button buttonColor="blue" buttonSize="md" onClick={onClick}>
        Button
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = jest.fn();
    render(
      <Button buttonColor="blue" buttonSize="md" disabled onClick={onClick}>
        Button
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
