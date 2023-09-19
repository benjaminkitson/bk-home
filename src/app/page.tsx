import Image from "next/image";
import snek from "../snek.png";
import tictactoe from "../tictactoe.png";
import wordlnt from "../wordlnt.png";
import me from "../me.png";
import { Card } from "@/components/Molecules/Card";
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

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 py-2 lg:py-20">
      <div className="flex h-2/5 w-2/3 flex-col items-center justify-center md:flex-row">
        <Image
          src={me}
          alt="Benjamin Kitson"
          className="m-2 h-full w-64 rounded-3xl object-cover"
        />
        <Card className="m-2 ml-4 w-1/2 bg-opacity-50 p-4">
          <P className="text-sm">
            Hi there, I&apos;m Benjamin, a Full-Stack software engineer from
            London!
          </P>
        </Card>
      </div>
      <div className="flex w-full grow flex-col items-center justify-center lg:flex-row">
        {portfolioItems.map((item) => (
          <Card
            key={item.name}
            className="m-2 h-32 w-full p-0 shadow-sm transition-transform duration-500 hover:scale-95 lg:h-80 lg:w-96 lg:flex-col lg:hover:scale-110"
            href={item.href}
          >
            <Image
              src={item.imgSrc}
              alt={item.imgAlt}
              className="h-full w-56 rounded-l-xl lg:h-56 lg:w-full lg:rounded-t-xl lg:rounded-bl-none"
            />
            <div className="flex h-full grow flex-col justify-center p-2">
              <H2 className="mb-1">{item.name}</H2>
              <P>{item.description}</P>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
