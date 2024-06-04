"use client";
import React from "react";
import HeartIcon from "../../Icons/HeartIcon";
import { CountriesBar } from "./CountriesBar";
import { LanguageBar } from "./LanguageBar";
import { CartBar } from "./CartBar";
import { MenuBar } from "./MenuBar";
import { UserBar } from "./UserBar";
import Link from "next/link";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar";

export const IconsBar = ({ locale, languages, countries, searchOnly }) => {
  const router = useRouter();
  const { showOptions, setShowOptions, showAuthPopup, setShowAuthPopup } =
    useGlobalOptions();

  return (
    <div className="flex gap-2 items-center justify-between">
      {searchOnly ? null : <MenuBar />}
      <SearchBar />
      {searchOnly ? null : (
        <div className="gap-2 flex">
          <LanguageBar languages={languages} locale={locale} />
          <CountriesBar countries={countries} />
        </div>
      )}
    </div>
  );
};
