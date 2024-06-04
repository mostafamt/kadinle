"use client";

import Image from "next/image";
import React, { useState } from "react";

export const UserCard = ({ user }) => {
  const [defaultImage, setDefaultImage] = useState(false);

  return (
    <div className="flex items-center gap-2 w-fit">
      {defaultImage ? (
        <span className="h-10 w-10 bg-purple-400 text-white rounded-full p-[1px] flex items-center justify-center capitalize text-xl">
          {user?.first_name?.[0]}
        </span>
      ) : (
        <Image
          className="h-10 w-10 rounded-full p-[1px]"
          onError={() => setDefaultImage(true)}
          src={user?.profile_img}
          alt={user?.first_name}
          height={40}
          width={40}
        />
      )}
      <div className="">
        <h3 className="text-black fount-medium text-sm">{`${user?.first_name} ${
          user?.last_name ? user?.last_name : ""
        }`}</h3>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};
