import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ExternalLinkIcon } from ".";
import { BsGithub } from "react-icons/bs";

describe("ExternalLinkIcon", () => {
  it("renders the a tag with the correct href", () => {
    render(<ExternalLinkIcon href="test-href" Icon={BsGithub} />);

    const aTag = screen.getByTestId("icon-link-a");

    expect(aTag).toHaveAttribute("href", "test-href");
  });

  it("renders the a tag with the correct href", () => {
    render(<ExternalLinkIcon href="test-href" Icon={BsGithub} />);

    const icon = screen.getByTestId("icon-link-icon");

    expect(icon).toBeInTheDocument();
  });
});
