"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export const ProductCartBtn = () => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  return (
    <button
      disabled={loading}
      className="bg-primary items-center justify-center gap-3 overflow-hidden h-10 hover:shadow-2xl relative disabled::bg-gray-400 disabled::shadow-inner hover:-rotate-1 duration-200 text-white rounded-3xl text-sm py-2 flex mx-auto flex-1"
    >
      {loading ? (
        <>
          <span className="bg-primary-light block animate-pulse w-6 h-6 rounded-full" />
          <span className="bg-primary-light block animate-pulse w-6 h-6 rounded-full" />
          <span className="bg-primary-light block animate-pulse w-6 h-6 rounded-full" />
        </>
      ) : (
        t("ADD_TO_CART")
      )}
    </button>
  );
};
