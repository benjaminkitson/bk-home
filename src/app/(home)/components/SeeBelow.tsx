"use client";

export const SeeBelow = () => {
  return (
    <a
      className={
        "cursor-pointer whitespace-nowrap text-inherit underline underline-offset-4 transition-all duration-200 hover:font-bold"
      }
      onClick={() =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }
    >
      see below 👇
    </a>
  );
};
