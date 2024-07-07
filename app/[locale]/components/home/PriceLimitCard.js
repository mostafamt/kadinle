import Image from "next/image";
import Link from "next/link";
import React from "react";

const PriceLimitCard = ({ text, link, img }) => {
  return (
    <Link
      href={link}
      className="flex-1 h-[110px] relative rounded-lg overflow-hidden"
    >
      <Image
        src={img}
        alt={text}
        className="w-full object-cover h-full"
        height={200}
        width={200}
      />

        <h3 className="absolute w-full lg:w-[200px] h-full flex items-center justify-center top-0 left-0 lg:left-[30%] md:m-auto text-white font-semibold capitalize text-center max-lg:text-base lg:text-[24px]">
          {text}
        </h3>

    </Link>
  );
};

export default PriceLimitCard;
