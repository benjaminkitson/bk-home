"use client";

import { useEffect, useState } from "react";

export function Pokeball() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r + 0.05);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 lg:left-[10%] lg:translate-x-0"
      aria-hidden
    >
      <img
        src="/images/pokeball.svg"
        alt=""
        width={640}
        height={640}
        className="pointer-events-none select-none opacity-25 lg:w-[min(70vw,800px)] lg:h-auto"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
}
