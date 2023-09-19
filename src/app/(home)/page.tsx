import { TopSection } from "./components/TopSection";
import { BottomSection } from "./components/BottomSection";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 py-2 lg:py-20">
      <TopSection />
      <BottomSection />
    </div>
  );
}
