"use client";
import React from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

export const ShopNowBtn = () => {
  const t = useTranslations();
  return (
    <Link
      href="/new-arrivals"
      className="text-xs xs:text-sm px-8 border border-primary hover:bg-white hover:text-black p-2 rounded-full bg-primary text-white flex flex-col justify-center items-center"
    >
      {t("SHOP_NOW")}
    </Link>
  );
};
