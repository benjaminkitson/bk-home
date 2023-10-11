import { ScrollLink, ScrollRef } from "@/components/Atoms/ScrollLink";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface DownLinkProps {
  portfolioScrollRef: ScrollRef;
}

export const DownLink: React.FC<DownLinkProps> = ({ portfolioScrollRef }) => {
  const isLoaded = useRef(false);

  const [currentSize, setCurrentSize] = useState("text-7xl");

  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      setInterval(() => {
        setCurrentSize((currentSize) =>
          currentSize === "text-7xl" ? "text-6xl" : "text-7xl",
        );
      }, 1000);
    }
  }, [currentSize]);

  return (
    <ScrollLink scrollRef={portfolioScrollRef}>
      <BsChevronDown
        className={`cursor-pointer fill-gray-100 ${currentSize} transition-all duration-1000 hover:scale-90 hover:fill-black`}
      />
    </ScrollLink>
  );
};
