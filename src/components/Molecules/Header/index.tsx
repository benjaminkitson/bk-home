import { IconButton } from "@/components/Atoms/IconButton";
import { H1 } from "@/components/Atoms/Typography";
import { SettingsCogButton } from "@/components/SettingsCogButton";
import Link from "next/link";
import { TiHome } from "react-icons/ti";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-24 min-h-fit w-full items-center justify-between bg-blue-400/40 drop-shadow-lg backdrop-blur-md">
      <div className="flex h-full w-32 items-center justify-center">
        <Link href="/" className="group" target={undefined}>
          <IconButton
            Icon={TiHome}
            iconClassName="text-5xl group-hover:scale-110 group-hover:text-white"
            className="pointer-events-none"
            data-testid="icon-link-icon"
          />
        </Link>
      </div>
      <H1 className="mb-0 text-3xl md:text-5xl">{title}</H1>
      <div className="flex h-full w-32 items-center justify-center">
        <SettingsCogButton />
      </div>
    </div>
  );
};
