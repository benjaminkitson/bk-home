"use client";

import { BsChevronDown } from "react-icons/bs";

export const DownLink: React.FC = () => {
  return (
    <BsChevronDown
      className={`animate-bounce cursor-pointer fill-gray-100 text-7xl transition-all duration-1000 hover:scale-90 hover:fill-black hover:text-6xl`}
      onClick={() =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    />
  );
};
