import { H2, P } from "@/components/Atoms/Typography";
import { Card } from "@/components/Molecules/Card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface PortfolioCardProps {
  name: string;
  description: string;
  href: string;
  imgSrc: StaticImport;
  imgAlt: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  name,
  description,
  href,
  imgSrc,
  imgAlt,
}) => {
  return (
    <Card
      key={name}
      className="flex h-full w-full min-w-0 p-0 shadow-md transition-all duration-200 hover:scale-110 lg:h-full lg:flex-col"
      href={href}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        className="w-36 shrink-0 rounded-l-xl object-cover lg:h-52 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
        placeholder="blur"
        quality={1}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-visible p-4">
        <H2 className="mb-2 md:mt-2">{name}</H2>
        <P className="min-h-0">{description}</P>
      </div>
    </Card>
  );
};
