"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { StarIcon } from "../Icons/StarIcon";

export const ReviewCard = ({ layout, review }) => {
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
    <div className="flex gap-2 border shadow-sm mb-4 border-gray-200 items-start rounded-md p-4">
      <figure className="p-1 rounded-full border shadow shrink-0">
        {!defaultImage ? (
          <Image
            onError={() => setDefaultImage(true)}
            className=" w-14 h-14 object-cover rounded-full"
            src={review?.user?.profile_img}
            alt="username"
            height={56}
            width={56}
          />
        ) : (
          <span className="w-14 h-14 flex items-center justify-center capitalize rounded-full bg-orange-400 text-white">
            {first_name?.[0]}
          </span>
        )}
      </figure>
      <div className="">
        <h3 className="text-black font-medium flex items-center">{hashName}</h3>
        <small className="text-[9px] text-gray-600 block mb-2">
          {new Date(review?.created_at)?.toLocaleDateString("en-UK")}
        </small>
        <div className="flex gap-[1px] items-center">
          {Array(5)
            .fill(0)
            .map((r, index) => (
              <StarIcon
                key={index}
                className={`h-4 w-4  object-contain ${
                  index + 1 <= review?.rating
                    ? "text-primary fill-primary"
                    : "text-gray-500"
                }`}
              />
            ))}
        </div>
        <p className="text-xs leading-[19px] text-gray-500 my-2">
          {review?.content}
        </p>
        {layout === "store" ? null : (
          <Link href={`/product/${review?.product_sku}`} className="flex gap-2">
            <Image
              className="w-16 h-20 object-contain rounded-md "
              src={review?.image}
              alt="product name"
              height={80}
              width={64}
            />
          </Link>
        )}
      </div>
    </div>
  );
};
