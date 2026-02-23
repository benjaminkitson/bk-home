import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { Card } from "../Card";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  isOpen: boolean;
  handleClose?: () => void;
  isMobileOnly?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  cardClassName,
  isOpen,
  handleClose,
  isMobileOnly = false,
}) => {
  const openClasses = isMobileOnly ? "md:hidden flex" : "flex";

  return (
    <div
      className={twMerge(
        "absolute left-0 top-0 z-40 h-screen w-screen items-center justify-center bg-blue-300/60 px-10",
        className,
        `${isOpen ? openClasses : "hidden"}`,
      )}
    >
      {handleClose && (
        <AiOutlineClose
          className="absolute right-5 top-5 cursor-pointer text-3xl"
          onClick={handleClose}
        />
      )}
      <Card
        className={twMerge(
          "relative flex h-96 w-3/4 flex-col items-center justify-center opacity-100 md:w-1/2",
          cardClassName,
        )}
      >
        {children}
      </Card>
    </div>
  );
};
