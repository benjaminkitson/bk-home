import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from ".";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a div when no href is provided", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<Card href="/some-page">Content</Card>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/some-page");
  });

  it("calls onClick when clicked (div)", async () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>Content</Card>);
    await userEvent.click(screen.getByText("Content"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when clicked (link)", async () => {
    const onClick = jest.fn();
    render(
      <Card href="/page" onClick={onClick}>
        Content
      </Card>,
    );
    await userEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders a hover overlay when interactive via href", () => {
    const { container } = render(<Card href="/page">Content</Card>);
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
  });

  it("renders a hover overlay when interactive via onClick", () => {
    const { container } = render(<Card onClick={() => {}}>Content</Card>);
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
  });

  it("does not render a hover overlay when not interactive", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector("[aria-hidden]")).not.toBeInTheDocument();
  });
});
