"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import HeartIcon from "../../Icons/HeartIcon";

export const FavoriteBar = () => {
  const router = useRouter();
  const { favoritesList } = useGlobalOptions();

  return (
    <Link
      href="/profile"
      className={`relative ${
        router?.pathname === "/profile" ? "text-primary" : "text-secondary"
      }`}
    >
      <span className="h-[18px] min-w-[16px] flex items-center justify-center text-xs rounded-[50%] bg-primary absolute -top-1 -right-1 text-white px-[2px] py-0 leading-[0px]">
        {Object.keys(favoritesList)?.length}
      </span>

      <HeartIcon className="w-6 h-6" />
    </Link>
  );
};
