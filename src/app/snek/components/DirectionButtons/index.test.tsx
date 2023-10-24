import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DirectionButtons } from ".";
import { MutableRefObject } from "react";
import { Direction } from "../../types";
import userEvent from "@testing-library/user-event";
import assert from "assert";

const getMockDirectionRef = (direction: Direction) =>
  ({
    current: direction,
  }) as unknown as MutableRefObject<Direction>;

describe("DirectionButtons", () => {
  it("renders the left direction buttons", () => {
    render(<DirectionButtons directionRef={getMockDirectionRef("LEFT")} />);

    const buttonIcon = screen.getByTestId("direction-icon-left");

    expect(buttonIcon).toBeInTheDocument();
  });

  it("clicking the left direction button updates the direction ref", async () => {
    const directionRef = getMockDirectionRef("UP");

    render(<DirectionButtons directionRef={directionRef} />);

    const buttonIcon = screen.getByTestId("direction-icon-left");

    await userEvent.click(buttonIcon);

    expect(directionRef.current).toBe("LEFT");
  });

  it("renders the right direction buttons", () => {
    render(<DirectionButtons directionRef={getMockDirectionRef("RIGHT")} />);

    const buttonIcon = screen.getByTestId("direction-icon-right");

    expect(buttonIcon).toBeInTheDocument();
  });

  it("clicking the right direction button updates the direction ref", async () => {
    const directionRef = getMockDirectionRef("UP");

    render(<DirectionButtons directionRef={directionRef} />);

    const buttonIcon = screen.getByTestId("direction-icon-right");

    await userEvent.click(buttonIcon);

    expect(directionRef.current).toBe("RIGHT");
  });

  it("renders the up direction buttons", () => {
    render(<DirectionButtons directionRef={getMockDirectionRef("UP")} />);

    const buttonIcon = screen.getByTestId("direction-icon-up");

    expect(buttonIcon).toBeInTheDocument();
  });

  it("clicking the up direction button updates the direction ref", async () => {
    const directionRef = getMockDirectionRef("RIGHT");

    render(<DirectionButtons directionRef={directionRef} />);

    const buttonIcon = screen.getByTestId("direction-icon-up");

    await userEvent.click(buttonIcon);

    expect(directionRef.current).toBe("UP");
  });

  it("renders the down direction buttons", () => {
    render(<DirectionButtons directionRef={getMockDirectionRef("DOWN")} />);

    const buttonIcon = screen.getByTestId("direction-icon-down");

    expect(buttonIcon).toBeInTheDocument();
  });

  it("clicking the down direction button updates the direction ref", async () => {
    const directionRef = getMockDirectionRef("RIGHT");

    render(<DirectionButtons directionRef={directionRef} />);

    const buttonIcon = screen.getByTestId("direction-icon-down");

    await userEvent.click(buttonIcon);

    expect(directionRef.current).toBe("DOWN");
  });
});
