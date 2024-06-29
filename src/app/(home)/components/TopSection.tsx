import { H1, P } from "@/components/Atoms/Typography";
import Image from "next/image";
import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaCode, FaInfoCircle } from "react-icons/fa";
import me from "../../../me.png";
import { DownLink } from "./DownLink";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { SeeBelow } from "./SeeBelow";

export const TopSection: React.FC = () => {
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
              When I&apos;m not squashing bugs in Aviva Zero&apos;s distributed
              Go backend or building internal tooling for their engineering
              department, I&apos;m probably either building some random personal
              project {" ("}
              <SeeBelow />
              {") "}
              or playing and writing music.{" "}
            </P>
            <P>
              This site has been lovingly crafted using TypeScript and NextJS,
              and is hosted on AWS. The various APIs associated with the
              different projects are built with various different technologies,
              all also hosted on AWS.
            </P>
          </div>
          <div className="mt-5 flex h-20 w-full justify-center md:hidden">
            <DownLink />
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
              Icon={FaCode}
            />
          </div>
        </div>
      </div>
      <div className="mt-20 hidden h-32 md:flex">
        <DownLink />
      </div>
    </div>
  );
};
