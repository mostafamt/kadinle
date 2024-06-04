"use client";

import { getCoupons } from "@/app/api/supabase/products";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { MainTitle } from "../global/MainTitle";
import Link from "next/link";

const Discounts = ({ coupons }) => {
  const t = useTranslations();
  const [copied, setCopied] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => {
      setCopied("");
    }, 4000);
  };

  return (
    <>
      <ScrollUpComponent />
      <div className="flex flex-col poppins mb-10">
        <MainTitle title={t("Discounts")} />
        <div className="container mx-auto">
          {coupons?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {coupons?.map((coupon) => (
                <div
                  key={coupon?.value}
                  className="flex flex-col gap-1 bg-opink text-white p-4 py-6 rounded-md relative"
                >
                  <span className="absolute h-10 w-10 rounded-xl bg-white top-1/2 -translate-y-1/2 ltr:-left-5 rtl:-right-5" />
                  <span className="absolute h-10 w-10 rounded-xl bg-white top-1/2 -translate-y-1/2 ltr:-right-5 rtl:-left-5" />
                  <div className="flex justify-center gap-4 mb-2">
                    <button
                      onClick={() => handleCopy(coupon?.code)}
                      className="text-center text-xl font-medium cursor-copy bg-pink-100 rounded-md px-2 text-opink -mt-1"
                    >
                      {coupon?.code}
                      {copied === coupon?.code ? (
                        <span className="text-green-500 bg-green-100 p-1 text-[9px] rounded-md mx-2">
                          {t("Copied")}
                        </span>
                      ) : null}
                    </button>
                    <h3 className=" text-center text-3xl font-semibold">
                      {coupon?.value}
                      <span className="text-xs">
                        {coupon?.percentage ? "%" : "$"}
                      </span>
                    </h3>
                  </div>
                  <p className="flex gap-2 justify-between items-center text-xs mx-auto max-w-[80%]">
                    {t("Expedition_date")}:{" "}
                    <span>
                      {new Date(coupon?.expiration_date).toLocaleDateString(
                        "en-UK"
                      )}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 justify-center mt-8 flex-col items-center ">
              <p className="text-opink">{t("discounts_msg")}</p>
              <Link
                href="/"
                className="bg-opink text-white p-2 rounded-md text-sm"
              >
                {t("Continue_Shopping")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Discounts;
