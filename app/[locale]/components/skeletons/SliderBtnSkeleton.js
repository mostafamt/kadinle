import Image from "next/image";
import React from "react";
const arrow = "https://kadinle.com/media/images/whiteArrow.png";

const SliderBtnSkeleton = ({ rotate }) => {
  return (
    <div
      className={`rounded-full bg-gray-200 w-[32px] h-[32px] min-w-[32px] z-10 flex items-center justify-center animate-pulse ${
        rotate && "rotate-180"
      }`}
    >
      <Image
        className="w-2 md:w-none rtl:rotate-180"
        src={arrow}
        alt="arrow"
        height={40}
        width={40}
      />
    </div>
  );
};

export default SliderBtnSkeleton;
