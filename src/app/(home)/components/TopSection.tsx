import { H1, P } from "@/components/Atoms/Typography";
import { BsGithub, BsLinkedin, BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import me from "../../../me.png";
import React from "react";
import { ScrollLink, ScrollRef } from "@/components/Atoms/ScrollLink";
import { DownLink } from "./DownLink";

export interface SectionProps {
  scrollRefs: Record<string, ScrollRef>;
}

export const TopSection: React.FC<SectionProps> = ({ scrollRefs }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex h-5/6 w-5/6 flex-col items-center justify-center lg:flex-row">
        <Image
          src={me}
          alt="Benjamin Kitson"
          className="m-2 h-1/4 w-56 rounded-3xl object-cover lg:h-1/2"
        />
        <div className="my-10 flex flex-col items-center lg:ml-14">
          <div className="flex w-full flex-col justify-start px-4 pt-2">
            <H1 className="mb-10">Hi there 👋</H1>
            <P className="mb-4">
              I&apos;m Benjamin, a Full-Stack software engineer from London! I
              love using both my creativity and my analytical skills to build
              apps that deliver real value to users.
            </P>
            <P className="hidden md:block">
              When I&apos;m not working on Penfold&apos;s customer-facing mobile
              app, I&apos;m probably either building some random personal
              project {" ("}
              <ScrollLink scrollRef={scrollRefs.portfolioScrollRef}>
                see below 👇
              </ScrollLink>
              {") "}
              or playing and writing music.{" "}
            </P>
          </div>
          <div className="mt-10 flex justify-center">
            <a href="https://github.com/benjaminkitson" className="mr-6">
              <BsGithub className=" fill-gray-100 text-4xl transition duration-500 hover:scale-90 hover:fill-black" />
            </a>
            <a href="https://uk.linkedin.com/in/benjamin-kitson">
              <BsLinkedin className="fill-gray-100 text-4xl transition duration-500 hover:scale-90 hover:fill-black" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex h-1/6 items-center justify-center">
        <DownLink portfolioScrollRef={scrollRefs.portfolioScrollRef} />
      </div>
    </div>
  );
};
