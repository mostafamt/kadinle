"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";

const star = "https://kadinle.com/media/images/star.png";

export const TestimonialCard = ({ review, small }) => {
  const [defaultImage, setDefaultImage] = useState(false);

  const { first_name, last_name } = review?.user || {
    first_name: "",
    last_name: "",
  };

  const hashName = useMemo(() => {
    if (!review?.user?.hash_name)
      return `${first_name} ${last_name ? last_name : ""}`;
    let name =
      first_name?.[0] + first_name.substring(1).replace(/[a-zA-Z]/g, "*");
    name += last_name?.[0]
      ? last_name?.[0] + last_name.substring(1).replace(/[a-zA-Z]/g, "*")
      : "";
    return name;
  }, [first_name, last_name, review]);

  return (
    <div className="flex justify-center xl:mt-20 xl:mb-44 transition-all duration-[1000ms]]">
      <div
        className={` w-full max-w-[325px h-full min-h-[300px] transition-all duration-[1000ms] relative flex flex-col border-2 border-dotted bg-white px-5 md:px-[40px] rounded-xl border-opink items-center   ${
          small ? "space-y-4" : "space-y-6"
        }`}
      >
        <div
          className={`absolute transition-all rounded-[50%] h-20 w-20 -top-[50px] md:h-32 md:w-32 overflow-hidden duration-[1000ms] md:-top-[80px]
          border-[#FFE5F4] ${review?.image ? "border-[7px]" : null}`}
        >
          {defaultImage || !review?.user?.profile_img ? (
            <span className="w-full h-full capitalize flex items-center justify-center bg-pink-400 text-white">
              {" "}
              {review?.user?.first_name?.[0] || "UNK"}
            </span>
          ) : (
            <Image
              className="w-full h-full object-cover !max-w-none"
              src={review?.user?.profile_img}
              alt="product avatar"
              onError={() => {
                setDefaultImage(true);
              }}
              height={100}
              width={100}
            />
          )}
        </div>
        <div
          className={`flex flex-col items-center transition-all duration-[1000ms]  ${
            small ? "space-y-2 pt-10" : "space-y-3 pt-14"
          }`}
        >
          <p
            className={`text-opink transition-all duration-[1000ms] ${
              small ? "text-[16px]" : "text-[18px]"
            }`}
          >
            {hashName}
          </p>
          <div className="flex gap-1">
            {Array(review?.rating).map((r, index) => (
              <Image
                key={index}
                className={`transition-all duration-[1000ms] ${
                  small ? "h-3" : "h-5"
                }`}
                src={star}
                alt="review"
                height={12}
                width={18}
              />
            ))}
          </div>
        </div>
        <div>
          <p
            className={`text-center mb-6 max-w-[250px] leading-[25px] md:leading-8  ${
              small ? "text-[10px] " : "text-[12px]"
            }`}
          >
            {review?.content?.substring(0, 120)}
          </p>
        </div>
      </div>
    </div>
  );
};
