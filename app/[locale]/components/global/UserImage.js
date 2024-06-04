"use client";
import Image from "next/image";
import React, { useState } from "react";

export const UserImage = ({
  imageSrc,
  first_name,
  imageClassName,
  defaultClassName,
  ...imgProps
}) => {
  const [defaultImage, setDefaultImage] = useState(false);

  return (
    <>
      {defaultImage || !imageSrc ? (
        <span
          className={`w-full h-full rounded-full capitalize flex items-center justify-center bg-pink-400 text-white ${defaultClassName}`}
        >
          {first_name?.[0] || "UN"}
        </span>
      ) : (
        <Image
          className={`w-full h-full object-cover rounded-full !max-w-none ${imageClassName}`}
          src={imageSrc}
          alt="product avatar"
          width={60}
          height={60}
          onError={() => {
            setDefaultImage(true);
          }}
          {...imgProps}
        />
      )}
    </>
  );
};
