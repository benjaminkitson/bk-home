import { MutableRefObject } from "react";
import { Direction } from "../../page";
import { DirectionButton } from "./DirectionButton";

export const DirectionButtons = ({
  directionRef,
}: {
  directionRef: MutableRefObject<Direction>;
}) => {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-center">
        <DirectionButton
          onClick={() => {
            if (directionRef.current != "DOWN") {
              directionRef.current = "UP";
            }
          }}
          direction="UP"
          className="mt-10"
        />
      </div>
      <div className="flex items-center justify-center">
        <DirectionButton
          onClick={() => {
            if (directionRef.current != "RIGHT") {
              directionRef.current = "LEFT";
            }
          }}
          direction="LEFT"
          className="mr-14"
        />
        <DirectionButton
          onClick={() => {
            if (directionRef.current != "LEFT") {
              directionRef.current = "RIGHT";
            }
          }}
          direction="RIGHT"
        />
      </div>
      <div className="flex items-center justify-center">
        <DirectionButton
          className="mb-24"
          onClick={() => {
            if (directionRef.current != "UP") {
              directionRef.current = "DOWN";
            }
          }}
          direction="DOWN"
        />
      </div>
    </div>
  );
};
