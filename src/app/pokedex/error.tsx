"use client";

import { Header } from "@/components/Molecules/Header";
import { Pokeball } from "./components/Pokeball";

interface ErrorProps {
  reset: () => void;
}

export default function PokedexError({ reset }: ErrorProps) {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <Pokeball />
      <Header title="Pokedex" />
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xl font-semibold">Could not load Pokémon data</p>
        <p className="text-white/60">
          The Pokédex API is unreachable. Check your connection and try again.
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-white/15 px-6 py-3 font-semibold ring-1 ring-white/20 transition hover:bg-white/25"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
