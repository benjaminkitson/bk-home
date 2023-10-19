import { H1, P } from "@/components/Atoms/Typography";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import Image from "next/image";
import me from "../../../me.png";
import React, { useState } from "react";
import { ScrollLink, ScrollRef } from "@/components/Atoms/ScrollLink";
import { DownLink } from "./DownLink";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

export interface SectionProps {
  scrollRefs: Record<string, ScrollRef>;
}

export const TopSection: React.FC<SectionProps> = ({ scrollRefs }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex w-5/6 flex-col items-center justify-center lg:flex-row">
        <div className="flex h-full items-center lg:w-1/3">
          <Image
            src={me}
            alt="Benjamin Kitson"
            className="w-56 rounded-3xl object-cover lg:h-3/4 lg:w-full"
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
        <div className="my-10 flex flex-col items-center lg:ml-14">
          <div className="flex w-full flex-col px-4 pt-2">
            <H1 className="mb-10">Hi there 👋</H1>
            <P className="mb-4">
              I&apos;m Benjamin, a Full-Stack software engineer from London! I
              love using both my creativity and my analytical skills to build
              apps that deliver real value to users.
            </P>
            <P className="mb-4 hidden md:block">
              When I&apos;m not working on either Penfold&apos;s customer-facing
              mobile app or their serverless Node.JS API, I&apos;m probably
              either building some random personal project {" ("}
              <ScrollLink scrollRef={scrollRefs.portfolioScrollRef}>
                see below 👇
              </ScrollLink>
              {") "}
              or playing and writing music.{" "}
            </P>
            <P>
              This site has been lovingly crafted using TypeScript and NextJS,
              and is hosted on AWS.
            </P>
          </div>
          <div className="mt-5 flex h-20 w-full justify-center md:hidden">
            <DownLink portfolioScrollRef={scrollRefs.portfolioScrollRef} />
          </div>
          <div className="align-start mt-10 hidden w-full pl-4 lg:flex">
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
              Icon={FaInfoCircle}
            />
          </div>
        </div>
      </div>
      <div className="mt-20 hidden h-32 md:flex">
        <DownLink portfolioScrollRef={scrollRefs.portfolioScrollRef} />
      </div>
    </div>
  );
};
