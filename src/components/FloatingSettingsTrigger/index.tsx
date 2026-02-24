"use client";

import { usePathname } from "next/navigation";
import { SettingsCogButton } from "@/components/SettingsCogButton";

const ROUTES_WITH_HEADER = ["/pokedex", "/snek", "/tic-tac-toe"];

export function FloatingSettingsTrigger() {
  const pathname = usePathname();
  const show = pathname && !ROUTES_WITH_HEADER.includes(pathname);

  if (!show) return null;

  return (
    <div className="fixed right-6 top-6 z-50 md:right-8 md:top-8">
      <SettingsCogButton />
    </div>
  );
}
