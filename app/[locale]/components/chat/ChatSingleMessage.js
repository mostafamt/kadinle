"use client";

import Image from "next/image";
import React from "react";

export const ChatSingleMessage = ({ item, user }) => {
  return (
    <div className={`${item?.sender !== 'CLIENT' && "flex-1 flex items-start gap-2"}`}>
      {item?.sender !== 'CLIENT' ? (
        <Image
          src="https://kadinle.com/media/images/logo-icon.png"
          alt="kadinle logo"
          height={40}
          width={40}
          className="w-10 h-1o object-contain bg-white rounded-full p-1 shadow"
        />
      ) : null}
      <div
        className={`px-4 flex-1 py-2 max-w-[70%] rounded-md w-fit ${
          item?.sender === 'CLIENT'
            ? "bg-[#129b9b] text-white ltr:ml-auto flex-1 max-w-fit rtl:mr-auto"
            : "bg-gray-200 text-black"
        }`}
        key={item?.id}
      >
        {item?.text}
      </div>
    </div>
  );
};
