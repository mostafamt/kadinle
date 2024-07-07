import { getCountries, getLanguages } from "@/app/api/supabase/shared";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import HeartIcon from "../Icons/HeartIcon";
import { CartBar } from "./menu/CartBar";
import { IconsBar } from "./menu/IconsBar";
import { NotificationBar } from "./NotificationBar";
import { FavoriteBar } from "./menu/FavoriteBar";

export const Menu = async ({ locale, router, searchOnly }) => {
  const responseLanguages = await getLanguages();
  const responseCountries = await getCountries();
  const languages = responseLanguages;
  const countries = responseCountries;

  return (
    <div className="px-2 pt-3 pb-1 md:max-w-[575px] md:mx-auto w-full">
      <div className="flex gap-2 mb-2 justify-between items-center">
        <NotificationBar />
        <Link href="/" className="md:flex-1 flex justify-center">
          <Image
            src="/logo.svg"
            alt="kadinle logo"
            height={20}
            width={120}
            className="w-[110px]"
          />
        </Link>
        <div className="flex gap-2">
          <FavoriteBar />
          <CartBar />
        </div>
      </div>
      <IconsBar
        searchOnly={searchOnly}
        locale={locale}
        languages={languages}
        countries={countries}
      />
    </div>
  );
};
