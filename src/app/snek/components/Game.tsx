"use client";

import { AuthContext } from "@/AuthContext";
import { checkClientToken } from "@/app/utils/auth";
import { Button } from "@/components/Atoms/Button";
import { H1 } from "@/components/Atoms/Typography";
import { Modal } from "@/components/Molecules/Modal";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cell } from "../components/Cell";
import { useSnek } from "../hooks/useSnek";
import { Direction } from "../types";
import { AuthModalContent } from "./AuthModalContent";
import { DirectionButtons } from "./DirectionButtons";

export default function Game({
  direction,
}: {
  direction: MutableRefObject<Direction>;
}) {
  const [snekState, dispatch] = useSnek({ directionRef: direction });

  const [isAuthFlow, setIsAuthFlow] = useState<Boolean>(false);
  const [isInitiallySigningUp, setisInitiallySigningUp] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Bit unclear if this is necessary
  useEffect(() => {
    const isValid = checkClientToken();
    setIsAuthenticated(isValid);
  }, [isAuthFlow, setIsAuthenticated]);

  /**
   * TODO: Rather than this weird "create an empty array and them generate the grid of cells from it", the grid should just be generated straight up
   */
  const grid = useMemo(() => {
    const init: null[] = [];

    for (let i = 0; i <= snekState.gridSize; i++) {
      init.push(null);
    }

    const grid = init.map((item) => {
      return [...init];
    });

    return grid;
  }, [snekState.gridSize]);

  // const { mutate, status, data, error, isLoading } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <H1 className="mb-6">{snekState.score}</H1>
      {grid.map((row, y) => (
        <div className="flex flex-row" key={y}>
          {row.map((cell, x) => {
            const isSnek = snekState.snake.some(
              (segment) => segment.x === x && segment.y === y,
            );
            const isFood = snekState.snakeFood.some(
              (food) => food.x === x && food.y === y,
            );
            return <Cell key={x} isSnek={isSnek} isFood={isFood} />;
          })}
        </div>
      ))}

      <DirectionButtons directionRef={direction} />

      <Modal
        cardClassName="flex flex-col h-1/2 py-16"
        isOpen={!snekState.isActive}
      >
        {
          // Auth is temporarily disabled
          // isAuthFlow ? (
        }
        {false ? (
          <>
            <AuthModalContent
              isInitiallySigningUp={isInitiallySigningUp}
              exitAuth={() => setIsAuthFlow(false)}
            />
            <Button
              buttonColor="blue"
              buttonSize="sm"
              className="mt-5 w-44"
              onClick={() => setIsAuthFlow(false)}
            >
              Continue as Guest
            </Button>
          </>
        ) : (
          <>
            {snekState.isGameOver && <H1 className="my-10">Game Over</H1>}
            <Button
              onClick={() => dispatch({ type: "START_GAME" })}
              buttonColor="blue"
              buttonSize="lg"
              className="h-32 w-52"
            >
              Play!
            </Button>
            {
              // Auth disabled
            }
            {/* <div className="flex w-3/4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Button
                    buttonColor="gray"
                    buttonSize="sm"
                    className="mr-4 mt-10"
                    onClick={() => {
                      setisInitiallySigningUp(false);
                      setIsAuthFlow(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    buttonColor="gray"
                    buttonSize="sm"
                    className="mt-10"
                    onClick={() => {
                      setisInitiallySigningUp(true);
                      setIsAuthFlow(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  buttonColor="gray"
                  buttonSize="sm"
                  className="mt-10"
                  onClick={() => {
                    deleteToken();
                    setIsAuthenticated(false);
                  }}
                >
                  Sign Out
                </Button>
              )}
            </div> */}
          </>
        )}
      </Modal>
    </div>
  );
}
