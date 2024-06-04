import Image from "next/image";
import React from "react";

const background = "https://kadinle.com/media/images/background.png";

export const StaticPageTitle = ({ title }) => {
  return (
    <main className="relative text-owhite text-[12px] w-full h-[70px]">
      <Image
        className="w-full object-cover h-auto"
        src={background}
        alt="background"
        layout="fill"
        priority
      />
      <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center text-sm">
        {title}
      </h1>
    </main>
  );
};
