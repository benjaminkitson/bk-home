import { Card } from "@/components/Molecules/Card";
import Image from "next/image";

import snek from "../../../snek.png";
import tictactoe from "../../../tictactoe.png";
import wordlnt from "../../../wordlnt.png";
import { H2, P } from "@/components/Atoms/Typography";
import { SectionProps } from "./TopSection";

const portfolioItems = [
  {
    name: "Snek",
    description: "Retro snake game, built only with Vanilla JS, HTML and CSS",
    href: "/snek",
    imgSrc: snek,
    imgAlt: "Snek portfolio image",
  },
  {
    name: "Tic-Tac-Toe",
    description: "Tic-tac-toe game with built in CPU opponent",
    href: "/tic-tac-toe",
    imgSrc: tictactoe,
    imgAlt: "Tic-Tac-Toe portfolio image",
  },
  {
    name: "Wordlnt",
    description: "A clone of wordle!",
    href: "https://wordlnt.benjaminkitson.com",
    imgSrc: wordlnt,
    imgAlt: "Wordlnt portfolio image",
  },
];

export const BottomSection: React.FC<SectionProps> = ({ scrollRefs }) => {
  return (
    <div
      ref={scrollRefs.portfolioScrollRef}
      className="flex h-screen w-full grow flex-col items-center justify-center p-5 lg:flex-row"
    >
      {portfolioItems.map((item) => (
        <Card
          key={item.name}
          className="m-4 h-40 w-full p-0 opacity-90 shadow-sm transition-all duration-500 hover:scale-95  hover:opacity-100 lg:h-96 lg:w-96 lg:flex-col"
          href={item.href}
        >
          <Image
            src={item.imgSrc}
            alt={item.imgAlt}
            // className="h-full w-56 rounded-l-xl object-fill lg:h-56 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
            className="w-56 rounded-l-xl lg:h-56 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
            placeholder="blur"
            quality={1}
          />
          <div className="flex w-full flex-col p-2">
            <H2 className="my-1 md:mb-4 md:mt-2">{item.name}</H2>
            <P>{item.description}</P>
          </div>
        </Card>
      ))}
    </div>
  );
};
