"use client";
import React from "react";
import HeartIcon from "../../Icons/HeartIcon";
import { CountriesBar } from "./CountriesBar";
import { LanguageBar } from "./LanguageBar";
import { CartBar } from "./CartBar";
import { MenuBar } from "./MenuBar";
import { UserBarFull } from "./UserBarFull";
import Link from "next/link";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useRouter } from "next/navigation";
import { FavoriteBarFull } from "./FavoriteBarFull";
import { useTranslations } from "next-intl";

export const IconsBarFull = ({ locale, languages, countries }) => {
  const router = useRouter();
  const { showOptions, setShowOptions, showAuthPopup, setShowAuthPopup } =
    useGlobalOptions();
    const t = useTranslations();

  return (
    <div className="flex gap-2 lg:gap-4 items-center justify-between order-2 xs:order-3">
      
      <div className="flex flex-col items-center justify-center">
        <MenuBar />
        <div className="text-[10px] text-[#727C8E]">{t("Category")}</div>
      </div>
      <CartBar />
      <UserBarFull />
      <FavoriteBarFull />
      <div className="h-[30px] bg-primary-gray w-[1px]" />
      <LanguageBar languages={languages} locale={locale} />
      <CountriesBar countries={countries} />
    </div>
  );
};
