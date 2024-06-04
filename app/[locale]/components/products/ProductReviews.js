"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { StarIcon } from "../Icons/StarIcon";

const ProductReviews = ({ review }) => {
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
    <div className="mb-3 w-full text-[#25252D]">
      <div className="flex gap-4">
        {/* <img   className='w-[50px] h-[50px]' src={profile}/> */}
        <div
          className={`min-w-[45px] overflow-hidden w-[45px] h-[45px] rounded-full  flex items-center justify-center`}
        >
          {defaultImage ? (
            <span className="h-12 w-12 rounded-full border bg-white flex items-center justify-center text-xl">
              {first_name?.[0]}
            </span>
          ) : (
            <Image
              onError={() => setDefaultImage(true)}
              className="h-12 w-12 rounded-full border"
              src={review?.user_info?.profile_img}
              alt={review?.user_info?.first_name}
              height={48}
              width={48}
            />
          )}
        </div>

        <div className="flex justify-center flex-col w-full ">
          <div className="flex items-center justify-between w-full">
            <div className="flex">
              {Array(5)
                .fill(5)
                .map((r, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${
                      index + 1 <= review?.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
            </div>

            <p className="text-[11px] font-[200]">
              {new Date(review?.created_at).toLocaleDateString("en-UK")}
            </p>
          </div>

          <p className="text-[11px]">{hashName}</p>
          <small className="text-[9px] text-gray-600 block mb-2">
            {new Date(review?.created_at)?.toLocaleDateString("en-UK")}
          </small>
          <p className="text-[10px] max-w-[160px] font-[300]">
            {review?.content}
          </p>

          {review?.media ? (
            <div className="flex items-center my-2 gap-1">
              {review?.media?.map((item) => (
                <Image
                  key={item?.id}
                  src={item?.url}
                  alt="Content media"
                  className="h-20 w-20 object-contain p-1 bg-gray-100 rounded-md"
                  height={80}
                  width={80}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
