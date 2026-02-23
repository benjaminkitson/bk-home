import { H1, P } from "@/components/Atoms/Typography";
import Image from "next/image";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaCode, FaInfoCircle } from "react-icons/fa";
import me from "../../../me.png";
import { ExternalLinkIcon } from "./ExternalLinkIcon";

export const TopSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 md:py-16">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center lg:flex-row lg:gap-12">
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
        <div className="my-6 flex flex-col items-start lg:my-0">
          <div className="flex w-full flex-col px-4 pt-2">
            <H1 className="mb-6">Hi there 👋</H1>
            <P className="mb-4">
              I&apos;m Benjamin, a Full-Stack software engineer from London! I
              love using both my creativity and my analytical skills to build
              apps that deliver real value to users.
            </P>
            <P className="mb-4 hidden md:block">
              When I&apos;m not designing and building microservices or using
              Cursor to smash out UI updates for Penny Technology&apos;s
              internal tooling at speed, I&apos;m probably either building some
              random personal project or playing and writing music.{" "}
            </P>
            <P>
              This site has been lovingly crafted using TypeScript and NextJS,
              and is hosted on AWS. The various APIs associated with the
              different projects are built with various different technologies,
              all also hosted on AWS.
            </P>
          </div>
          <div className="mt-6 hidden w-full gap-6 lg:flex">
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
  );
};
