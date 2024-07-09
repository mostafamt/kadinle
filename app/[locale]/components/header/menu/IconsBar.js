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
import { useTranslations } from "next-intl";
import Image from "next/image";

export const IconsBar = ({
  locale,
  languages,
  countries,
  searchOnly,
  hideCategoryIcon,
}) => {
  const router = useRouter();
  const { showOptions, setShowOptions, showAuthPopup, setShowAuthPopup } =
    useGlobalOptions();

  const t = useTranslations();
  return (
    <div className="flex gap-2 items-center justify-between relative">
      {hideCategoryIcon ? null : (
        <div className="flex flex-col items-center justify-center">
          <MenuBar />
          <div className="text-[10px] text-[#727C8E]">{t("Category")}</div>
        </div>
      )}

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
