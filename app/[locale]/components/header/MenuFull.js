import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconsBarFull } from "./menu/IconsBarFull";
import { SearchBar } from "./menu/SearchBar";
import { getCountries, getLanguages } from "@/app/api/supabase/shared";

export const MenuFull = async ({ locale }) => {
  const responseLanguages = await getLanguages();
  const responseCountries = await getCountries();
  const languages = responseLanguages;
  const countries = responseCountries;
  return (
    <div className="xs:h-16 container flex flex-col xs:flex-row gap-4 items-center justify-between mx-auto">
      <SearchBar />
      <Link
        href="/"
        className="sm:order-2 order-1 md:flex-1 flex justify-center"
      >
        <Image
          src="https://kadinle.com/media/images/logo.svg"
          alt="kadinle logo"
          height={80}
          width={120}
          className="w-[120px] lg:w-[200px]"
        />
      </Link>
      <IconsBarFull locale={locale} languages={languages} countries={countries} />
    </div>
  );
};
