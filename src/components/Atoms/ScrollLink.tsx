import { twMerge } from "@/utils/twMerge";
import { MutableRefObject } from "react";

export type ScrollRef = MutableRefObject<null | HTMLDivElement>;

interface ScrollLinkProps {
  children: React.ReactNode;
  className?: string;
  scrollRef: ScrollRef;
}

export const ScrollLink: React.FC<ScrollLinkProps> = ({
  children,
  className,
  scrollRef,
}) => {
  return (
    <a
      className={twMerge(
        "cursor-pointer text-lg underline underline-offset-4 transition-all duration-200 hover:font-bold",
        className,
      )}
      onClick={() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {children}
    </a>
  );
};
