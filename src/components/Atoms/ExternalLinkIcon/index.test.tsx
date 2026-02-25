import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BsGithub } from "react-icons/bs";
import { ExternalLinkIcon } from ".";

describe("ExternalLinkIcon", () => {
  it("renders the a tag with the correct href", () => {
    render(<ExternalLinkIcon href="test-href" Icon={BsGithub} />);
    expect(screen.getByTestId("icon-link-a")).toHaveAttribute(
      "href",
      "test-href",
    );
  });

  it("renders the icon", () => {
    render(<ExternalLinkIcon href="test-href" Icon={BsGithub} />);
    expect(screen.getByTestId("icon-link-icon")).toBeInTheDocument();
  });

  it("opens in a new tab by default", () => {
    render(<ExternalLinkIcon href="test-href" Icon={BsGithub} />);
    expect(screen.getByTestId("icon-link-a")).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("opens in the current tab when openInCurrentTab is true", () => {
    render(
      <ExternalLinkIcon href="test-href" Icon={BsGithub} openInCurrentTab />,
    );
    expect(screen.getByTestId("icon-link-a")).not.toHaveAttribute(
      "target",
      "_blank",
    );
  });
});
