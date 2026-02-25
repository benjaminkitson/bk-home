import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollLink } from "./ScrollLink";

describe("ScrollLink", () => {
  it("renders children", () => {
    render(<ScrollLink scrollRef={{ current: null }}>Click me</ScrollLink>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as an anchor element", () => {
    const { container } = render(
      <ScrollLink scrollRef={{ current: null }}>Link</ScrollLink>,
    );
    expect(container.querySelector("a")).toBeInTheDocument();
  });

  it("calls scrollIntoView when ref is set and the link is clicked", async () => {
    const scrollIntoViewMock = jest.fn();
    const div = document.createElement("div");
    div.scrollIntoView = scrollIntoViewMock;

    render(<ScrollLink scrollRef={{ current: div }}>Scroll</ScrollLink>);
    await userEvent.click(screen.getByText("Scroll"));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does not throw when ref.current is null", async () => {
    render(<ScrollLink scrollRef={{ current: null }}>Scroll</ScrollLink>);
    await expect(
      userEvent.click(screen.getByText("Scroll")),
    ).resolves.not.toThrow();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollLink scrollRef={{ current: null }} className="custom-class">
        Link
      </ScrollLink>,
    );
    expect(container.querySelector("a")).toHaveClass("custom-class");
  });
});
