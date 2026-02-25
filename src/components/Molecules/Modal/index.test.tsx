import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";

describe("Modal", () => {
  it("is hidden when isOpen is false", () => {
    const { container } = render(<Modal isOpen={false}>Modal content</Modal>);
    expect(container.firstChild).toHaveClass("hidden");
  });

  it("is visible when isOpen is true", () => {
    const { container } = render(<Modal isOpen>Modal content</Modal>);
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).not.toHaveClass("hidden");
  });

  it("renders children when open", () => {
    render(<Modal isOpen>Modal content</Modal>);
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders a close button when handleClose is provided", () => {
    render(
      <Modal isOpen handleClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("does not render a close button when handleClose is not provided", () => {
    render(<Modal isOpen>Content</Modal>);
    expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it("calls handleClose when the close button is clicked", async () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen handleClose={handleClose}>
        Content
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("adds md:hidden class when isMobileOnly is true", () => {
    const { container } = render(
      <Modal isOpen isMobileOnly>
        Content
      </Modal>,
    );
    expect(container.firstChild).toHaveClass("md:hidden");
  });

  it("does not add md:hidden class when isMobileOnly is false", () => {
    const { container } = render(<Modal isOpen>Content</Modal>);
    expect(container.firstChild).not.toHaveClass("md:hidden");
  });
});
