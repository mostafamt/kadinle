import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Offer = ({ offer, languageId }) => {
  const content = offer?.offer_content?.find(
    (c) => c?.language_id === languageId
  );

  return (
    <div className="!my-4 lg:!mb-5 lg:container lg:mx-auto lg:rounded-md lg:!px-4">
      <Link
        href={`/category/offer/${offer?.id}`}
        className="lg:py-36 offerBanner relative before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-[#000080b3] cursor-pointer overflow-hidden text-white h-40 lg:h-60 flex items-center justify-center offer-sec lg:p-24 lg:rounded-lg"
      >
        <span className="absolute top-4 ltr:left-4 rtl:right-4 animate-pulse">
          <Image
            src="https://kadinle.com/media/images/flash.png"
            alt="flash icon"
            className="w-[90px] h-[120px] mx-auto lg:w-[120px] lg:h-[150px]"
            height={90}
            width={120}
          />
        </span>
        <div className="chippyBannerOffer bg-yellow-400 absolute z-[11] w-1/3 min-w-[120px] md:min-w-[200px] h-full text-lg xs:text-2xl lg:text-[50px] flex items-center justify-end  px-4 top-0 ltr:right-0 rtl:left-0 opacity-90 rtl:rotate-180">
          <span class="bg-clip-text uppercase text-center text-transparent bg-gradient-to-r from-black to-violet-500 font-extrabold">
            {content?.title?.split(" ")?.map((item) => (
              <span key={item} className="block">
                {" "}
                {item}
              </span>
            ))}
          </span>
        </div>
        <div className="relative z-20 w-2/3 ltr:pr-20 rtl:pl-20">
          <h2 className="text-2xl lg:text-5xl xl:whitespace-nowrap">
            {content?.description}
          </h2>
        </div>
      </Link>
    </div>
  );
};
