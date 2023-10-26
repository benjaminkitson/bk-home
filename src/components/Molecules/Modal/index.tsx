import { Card } from "../Card";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  cardClassName,
}) => {
  return (
    <div
      className={twMerge(
        className,
        "absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-300/60 px-10",
      )}
    >
      <Card
        className={twMerge(
          "flex h-96 w-3/4 flex-col items-center justify-center opacity-100 md:w-1/2",
          cardClassName,
        )}
      >
        {children}
      </Card>
    </div>
  );
};
