"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const ErrorView = ({ error, reset }) => {
  const t = useTranslations();
  return (
    <main className="max-h-full grid place-items-center py-16 bg-gray-800">
      <div className="text-center text-white">
        <p className="text-lg text-red-600">{t("error_msg_1")}</p>
        <h1 className="text-2xl text-white my-2 font-semibold">
          {error?.message || t("error_msg_title")}
        </h1>
        <p className="bg-yellow-100 text-yellow-500 p-2 w-[80%] mx-auto rounded-md text-center">
          {t("error_msg_2")}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="p-2 rounded-md text-white capitalize bg-primary"
          >
            {t("try_again")}
          </button>
          <Link
            href="/"
            className="p-2 rounded-md text-white capitalize bg-blue-500"
          >
            {t("go_back_home")}
          </Link>
        </div>
      </div>
    </main>
  );
};
