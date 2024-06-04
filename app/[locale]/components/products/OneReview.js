"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";

const fullStar = "https://kadinle.com/media/images/full_star.png";
const star = "https://kadinle.com/media/images/outlien_star.png";

const OneReview = ({ review }) => {
  const [defaultImage, setDefaultImage] = useState(false);
  const { first_name, last_name } = review?.user_info || {
    first_name: "",
    last_name: "",
  };

  const hashName = useMemo(() => {
    if (!review?.user_info?.hash_name)
      return `${first_name} ${last_name ? last_name : ""}`;
    let name =
      first_name?.[0] + first_name.substring(1).replace(/[a-zA-Z]/g, "*");
    name += last_name?.[0]
      ? last_name?.[0] + last_name.substring(1).replace(/[a-zA-Z]/g, "*")
      : "";
    return name;
  }, [first_name, last_name, review]);

  return (
    <div className="flex gap-4 items-start  ">
      {defaultImage ? (
        <span className="h-12 w-12 rounded-full flex items-center justify-center text-xl bg-white object-cover border border-gray-100 shadow-sm">
          {first_name?.[0]}
        </span>
      ) : (
        <Image
          onError={() => setDefaultImage(true)}
          src={review?.user_info?.profile_img}
          className="h-12 w-12 rounded-full bg-white object-cover border border-gray-100 shadow-sm"
          alt="user avatar"
          height={48}
          width={48}
        />
      )}
      <div className="flex flex-col ">
        <p className="text-[11px] ">{hashName}</p>
        <small className="text-[9px] text-gray-600">
          {new Date(review?.created_at)?.toLocaleDateString("en-UK")}
        </small>
        <div className="flex gap-[2px] mb-2 mt-[6px]">
          {Array(5)
            .fill(5)
            .map((r, index) => (
              <Image
                key={index}
                className="w-3 h-3 object-contain"
                src={index + 1 <= review?.rating ? fullStar : star}
                alt="review"
                height={12}
                width={12}
              />
            ))}
        </div>
        <p className="w-[490px] text-[10px] mb-2">{review?.content}</p>
        {review?.media ? (
          <div className="flex items-center my-2 gap-1">
            {review?.media?.map((item) => {
              return (
                <Image
                  key={item?.url}
                  src={item?.url}
                  alt="Content media"
                  className="md:h-32 md:w-32 h-20 w-20 object-contain p-1 bg-gray-100 rounded-md"
                  height={128}
                  width={128}
                />
              );
            })}
          </div>
        ) : null}
        <div className="h-[0.08px] bg-[#AEAEAE] w-[455px]  mt-1" />
      </div>
    </div>
  );
};

export default OneReview;
