import { Card } from "../Card";
import { appendClasses } from "@/utils/appendClasses";

interface ModalProps {
  children: React.ReactNode;
  className: string;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
  return (
    <div
      className={
        "absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-300/60"
      }
    >
      <Card
        className={appendClasses(
          className,
          "flex h-56 w-3/4 items-center justify-center opacity-100 md:w-1/2",
        )}
      >
        {children}
      </Card>
    </div>
  );
};
