import { H1, P } from "@/components/Atoms/Typography";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaCode, FaInfoCircle } from "react-icons/fa";
import me from "../../me.png";
import pokedex from "../../pokedex.png";
import snek from "../../snek.png";
import tictactoe from "../../tictactoe.png";
import { ExternalLinkIcon } from "./components/ExternalLinkIcon";
import { PortfolioCard } from "./components/PortfolioCard";

const portfolioItems = [
  {
    name: "Snek",
    description: "Retro snake game, built with React, TypeScript and Tailwind",
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
  // {
  //   name: "Wordlnt",
  //   description: "A clone of wordle!",
  //   href: "/wordlnt",
  //   imgSrc: wordlnt,
  //   imgAlt: "Wordlnt portfolio image",
  // },
  {
    name: "Pokédex",
    description: "A pokédex web app",
    href: "/pokedex",
    imgSrc: pokedex,
    imgAlt: "Pokédex portfolio image",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <section className="flex flex-col items-center justify-center px-6 py-10 md:py-12">
        <div className="flex w-full max-w-6xl flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-center lg:gap-10">
          <div className="flex h-full shrink-0 justify-center lg:w-1/3">
            <Image
              src={me}
              alt="Benjamin Kitson"
              className="aspect-square w-72 rounded-3xl object-cover lg:w-64"
              quality={50}
              placeholder="blur"
              priority
            />
            <div className="ml-4 flex flex-col justify-center lg:hidden">
              <ExternalLinkIcon
                href="https://github.com/benjaminkitson"
                className="m-6"
                Icon={BsGithub}
              />
              <ExternalLinkIcon
                href="https://www.linkedin.com/in/benjamin-kitson"
                className="m-6"
                Icon={BsLinkedin}
              />
              <ExternalLinkIcon
                href="https://github.com/benjaminkitson/bk-home"
                className="m-6"
                Icon={FaInfoCircle}
              />
            </div>
          </div>
          <div className="my-6 flex min-w-0 flex-1 flex-col items-start lg:my-0">
            <div className="flex w-full flex-col px-2 pt-0 lg:px-0">
              <H1 className="mb-3">Hi there 👋</H1>
              <P className="mb-2">
                I&apos;m Benjamin, a Full-Stack software engineer from London! I
                love using both my creativity and my analytical skills to build
                apps that deliver real value to users.
              </P>
              <P className="mb-2 hidden md:block">
                When I&apos;m not designing and building microservices or using
                Cursor to smash out UI updates for Penny Technology&apos;s
                internal tooling at speed, I&apos;m probably either building
                some random personal project or playing and writing music.{" "}
              </P>
              <P>
                This site has been lovingly crafted using TypeScript and NextJS,
                and is hosted on AWS. The various APIs associated with the
                different projects are built with various different
                technologies, all also hosted on AWS.
              </P>
            </div>
            <div className="mt-5 hidden w-full gap-5 lg:flex">
              <ExternalLinkIcon
                href="https://github.com/benjaminkitson"
                className="mr-6"
                Icon={BsGithub}
              />
              <ExternalLinkIcon
                href="https://www.linkedin.com/in/benjamin-kitson"
                className="mr-6"
                Icon={BsLinkedin}
              />
              <ExternalLinkIcon
                href="https://github.com/benjaminkitson/bk-home"
                className="mr-6"
                Icon={FaCode}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center gap-6 p-6 pb-12 pt-8 md:pt-10 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="flex w-full flex-col justify-center gap-5 lg:flex-row lg:gap-10 xl:w-2/3">
          {portfolioItems.map(({ name, description, href, imgSrc, imgAlt }) => (
            <PortfolioCard
              key={name}
              name={name}
              description={description}
              href={href}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
