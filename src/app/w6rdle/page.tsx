import { Header } from "@/components/Molecules/Header";
import Game from "./components/Game";
import { getDailyWord } from "./words";

export default function W6rdle() {
  const word = getDailyWord();
  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <Header title="W6RDLE" />
      <Game word={word} />
    </div>
  );
}
