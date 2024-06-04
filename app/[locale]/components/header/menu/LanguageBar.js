"use client";

import React, { useEffect, useState } from "react";
import { ChevronIcon } from "../../Icons/ChevronIcon";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { LANGUAGES } from "@/app/api/static/constants";
import { usePathname, useRouter } from "next/navigation";

export const LanguageBar = ({ languages, locale }) => {
  const router = useRouter();
  const pathname = usePathname()
  const { language, changeLanguage } = useGlobalOptions();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const lang = languages?.find((lang) => lang?.id === LANGUAGES?.[locale]);
    changeLanguage(lang);
  }, []);

  const handleChangeLanguage = (lang) => {
    typeof window === "object" &&
      localStorage.setItem("kadinle_lang", JSON.stringify(lang));
    changeLanguage(lang);
    const langCode =
      lang?.code?.toLowerCase() === "tur"
        ? "tr"
        : lang?.code?.toLowerCase() === "eng"
        ? "en"
        : lang?.code?.toLowerCase();
        router.replace(pathname?.replace(locale, langCode));
      };

  return (
    <div className="relative">
      <button
        className={`text-[#727C8E] text-xs capitalize h-8 flex items-center gap-1 border p-1 rounded-md ${
          open ? "bg-primary text-white" : ""
        }`}
        onClick={() => setOpen((p) => !p)}
      >
        {language?.code || locale}
        <ChevronIcon className="w-4 h-4 text-primary" />
      </button>
      {open ? (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bg-white shadow rounded-md z-30 top-full ltr:right-0 rtl:left-0">
            {languages?.map((lang) => (
              <button
                key={lang?.id}
                onClick={() => {
                  if (lang?.id !== language?.id) handleChangeLanguage(lang);
                  setOpen(false);
                }}
                className="p-2 px-4  whitespace-nowrap"
              >
                {lang?.name}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
