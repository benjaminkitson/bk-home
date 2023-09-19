import { P } from "@/components/Atoms/Typography";
import { Card } from "@/components/Molecules/Card";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import me from "../../../me.png";

export const TopSection = () => {
  return (
    <div className="flex h-2/5 flex-col items-center justify-center md:flex-row lg:w-2/3">
      <Image
        src={me}
        alt="Benjamin Kitson"
        className="m-2 h-full w-64 rounded-3xl object-cover"
      />
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-start px-4 pt-2">
          <P className="text-justify text-sm">
            Hi there, I&apos;m Benjamin, a Full-Stack software engineer from
            London! I love using both my creativity and my analytical skills to
            build scalable and performant applications, while always maintaining
            integrity and seeking to bring real value to users.
          </P>
        </div>
        <div className="my-4 flex w-36 justify-center">
          <a href="https://github.com/benjaminkitson" className="mr-6">
            <BsGithub className=" fill-gray-300 text-3xl transition duration-500 hover:scale-90 hover:fill-black" />
          </a>
          <a href="https://uk.linkedin.com/in/benjamin-kitson">
            <BsLinkedin className="fill-gray-300 text-3xl transition duration-500 hover:scale-90 hover:fill-black" />
          </a>
        </div>
      </div>
    </div>
  );
};
