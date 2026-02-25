import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { H1, H2, P } from "./Typography";

describe("H1", () => {
  it("renders children", () => {
    render(<H1>Heading 1</H1>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading 1",
    );
  });

  it("renders as an h1 element", () => {
    render(<H1>Heading</H1>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<H1 className="custom-class">Heading</H1>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
      "custom-class",
    );
  });
});

describe("H2", () => {
  it("renders children", () => {
    render(<H2>Heading 2</H2>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Heading 2",
    );
  });

  it("renders as an h2 element", () => {
    render(<H2>Heading</H2>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<H2 className="custom-class">Heading</H2>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass(
      "custom-class",
    );
  });
});

describe("P", () => {
  it("renders children", () => {
    const { container } = render(<P>Paragraph text</P>);
    expect(container.querySelector("p")).toHaveTextContent("Paragraph text");
  });

  it("renders as a p element", () => {
    const { container } = render(<P>Text</P>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<P className="custom-class">Text</P>);
    expect(container.querySelector("p")).toHaveClass("custom-class");
  });
});
