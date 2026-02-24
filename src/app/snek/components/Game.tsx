"use client";

// import { AuthContext } from "@/AuthContext";
// import { checkClientToken } from "@/app/utils/auth";
import { Button } from "@/components/Atoms/Button";
import { H1 } from "@/components/Atoms/Typography";
import { Modal } from "@/components/Molecules/Modal";
import { MutableRefObject, useMemo } from "react";
import { Cell } from "../components/Cell";
import { useSnek } from "../hooks/useSnek";
import { Direction } from "../types";
// import { AuthModalContent } from "./AuthModalContent";
import { DirectionButtons } from "./DirectionButtons";

export default function Game({
  direction,
}: {
  direction: MutableRefObject<Direction>;
}) {
  const [snekState, dispatch] = useSnek({ directionRef: direction });

  // const [isAuthFlow, setIsAuthFlow] = useState<Boolean>(false);
  // const [isInitiallySigningUp, setisInitiallySigningUp] = useState(true);
  // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // useEffect(() => {
  //   const isValid = checkClientToken();
  //   setIsAuthenticated(isValid);
  // }, [isAuthFlow, setIsAuthenticated]);

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
    <div className="flex h-screen flex-col items-center justify-center pb-8 pt-28">
      <H1 className="mb-8 text-4xl md:text-5xl">{snekState.score}</H1>
      <div className="mb-6 rounded-lg bg-white/10 p-2 shadow-inner backdrop-blur-sm">
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
      </div>

      <DirectionButtons directionRef={direction} />

      <Modal
        cardClassName="flex flex-col h-1/2 py-16 bg-gradient-to-br from-blue-600/75 to-sky-600/70 text-white ring-1 ring-white/20 backdrop-blur-sm"
        isOpen={!snekState.isActive}
      >
        {snekState.isGameOver && <H1 className="my-10">Game Over</H1>}
        <Button
          onClick={() => dispatch({ type: "START_GAME" })}
          buttonColor="blue"
          buttonSize="lg"
          className="h-32 w-52"
        >
          Play!
        </Button>
      </Modal>
    </div>
  );
}
