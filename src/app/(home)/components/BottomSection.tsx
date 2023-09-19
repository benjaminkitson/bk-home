import { Card } from "@/components/Molecules/Card";
import Image from "next/image";

import snek from "../../../snek.png";
import tictactoe from "../../../tictactoe.png";
import wordlnt from "../../../wordlnt.png";
import { H2, P } from "@/components/Atoms/Typography";

const portfolioItems = [
  {
    name: "Snek",
    description: "Retro snake game, built only with Vanilla JS, HTML and CSS",
    href: "https://snek.benjaminkitson.com",
    imgSrc: snek,
    imgAlt: "Snek portfolio image",
  },
  {
    name: "Tic-Tac-Toe",
    description: "Tic-tac-toe game with built in CPU opponent",
    href: "https://tic-tac-toe.benjaminkitson.com",
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

export const BottomSection = () => {
  return (
    <div className="flex w-full grow flex-col items-center justify-center lg:flex-row">
      {portfolioItems.map((item) => (
        <Card
          key={item.name}
          className="m-2 h-32 w-full p-0 shadow-sm transition-transform duration-500 hover:scale-95 lg:h-80 lg:w-96 lg:flex-col"
          href={item.href}
        >
          <Image
            src={item.imgSrc}
            alt={item.imgAlt}
            // className="h-full w-56 rounded-l-xl object-fill lg:h-56 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
            className="w-56 rounded-l-xl lg:h-56 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
          />
          <div className="flex w-full flex-col p-2">
            <H2 className="mb-1">{item.name}</H2>
            <P className="whitespace-wrap">{item.description}</P>
          </div>
        </Card>
      ))}
    </div>
  );
};
