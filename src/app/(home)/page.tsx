"use client";

import { TopSection } from "./components/TopSection";
import { BottomSection } from "./components/BottomSection";
import { useRef } from "react";
import { ScrollRef } from "@/components/Atoms/ScrollLink";

export default function Home() {
  const portfolioScrollRef: ScrollRef = useRef(null);

  return (
    <>
      <TopSection scrollRefs={{ portfolioScrollRef }} />
      <BottomSection scrollRefs={{ portfolioScrollRef }} />
    </>
  );
}
