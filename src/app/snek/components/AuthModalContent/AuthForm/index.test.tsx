import { P } from "@/components/Atoms/Typography";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AuthForm } from ".";

describe("AuthForm", () => {
  const mockSubmit = jest.fn(() => {});

  beforeEach(() => {
    render(
      <AuthForm text="TEST_TEXT" onSubmit={mockSubmit}>
        <P>CHILD</P>
        <P>CHILD</P>
      </AuthForm>,
    );
  });

  it("renders the child elements", () => {
    const children = screen.getAllByText(/CHILD/i);
    expect(children.length).toStrictEqual(2);
  });

  it("renders the heading with the text prop as the value", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("TEST_TEXT");
  });

  it("renders the primary button with the text prop as the value", () => {
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("TEST_TEXT");
  });

  it("calls the passed onSubmit function when the primary button is clicked", () => {
    const button = screen.getByRole("button");
    button.click();
    expect(mockSubmit).toHaveBeenCalled();
  });
});
