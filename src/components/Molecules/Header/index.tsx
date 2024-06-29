import { H1 } from "@/components/Atoms/Typography";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-24 min-h-fit w-full items-center justify-between border-b-2 border-blue-400 bg-blue-300 drop-shadow-xl">
      <div className="bg-red-60 flex h-full w-32 items-center justify-center">
        <Link href="/" target={undefined}>
          <TiHome
            className={
              "fill-gray-100 text-5xl transition duration-500 hover:scale-90 hover:fill-sky-800"
            }
            data-testid="icon-link-icon"
          />
        </Link>
      </div>
      <H1 className="mb-0 text-3xl md:text-5xl">{title}</H1>
      <div className="h-full w-32"></div>
    </div>
  );
};
