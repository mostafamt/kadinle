import Image from "next/image";
import React from "react";
const background = "https://kadinle.com/media/images/background.png";

export const MainTitle = ({ title }) => {
  return (
    <main className="w-full relative">
      <Image
        src={background}
        alt={title}
        height={250}
        width={1900}
        className="h-auto max-h-[300px] object-cover"
        priority
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-owhite font-[700] text-[18px] text-center lg:text-[24px] 2xl:text-[34px] ">
        <h1 className="capitalize text-center">{title}</h1>
      </div>
    </main>
  );
};
