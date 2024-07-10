import Image from "next/image";
import Link from "next/link";
import React from "react";

const PriceLimitCard = ({ id, language_id, mobile_image, web_image }) => {
  return (
    <Link
      href={""}
      className="flex-1 relative rounded-lg overflow-hidden w-fit h-fit "
    >
      <div className="full-screen">
        <Image
          src={web_image}
          alt={"image"}
          className="w-full object-cover"
          height={250}
          width={400}
        />
      </div>
      <div className="mob-screen">
        <Image
          src={mobile_image}
          alt={"image"}
          // className="w-full object-cover"
          height={250}
          width={250}
          className="w-fit h-fit object-cover rounded-md"
        />
      </div>
      {/* 
      <h3 className="absolute w-full lg:w-[200px] h-full flex items-center justify-center top-0 left-0 lg:left-[30%] md:m-auto text-white font-semibold capitalize text-center max-lg:text-base lg:text-[24px]">
        {text}
      </h3> */}
    </Link>
  );
};

export default PriceLimitCard;
