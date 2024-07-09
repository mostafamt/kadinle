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
    <div className="w-full xs:h-16 container flex gap-4 items-center justify-between px-12">
      <SearchBar />
      <Link
        href="/"
        className="sm:order-2 order-1 md:flex-1 flex justify-center"
      >
        <Image
          src="/logo.svg"
          alt="kadinle logo"
          className="w-[250px]"
          height={80}
          width={200}
        />
      </Link>
      <IconsBarFull
        locale={locale}
        languages={languages}
        countries={countries}
      />
    </div>
  );
};

