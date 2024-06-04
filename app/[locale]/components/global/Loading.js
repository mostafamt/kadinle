import { useTranslations } from "next-intl";
import React from "react";

export const Loading = () => {
  const t = useTranslations();
  return (
    <p className="flex justify-center items-center w-full my-2 text-opink animate-pulse">
      {t("loading")}
    </p>
  );
};
