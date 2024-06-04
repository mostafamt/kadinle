"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export const ShippingOrderScreen = ({ onMoveScreen, handleBack }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 max-h-[60vh] overflow-auto">
      <p className="text-center">{t("shipping_order_msg")}</p>
      <Link
        href="/shipping-information"
        className="text-xs p-1 rounded-md bg-opink text-white mx-auto block w-fit"
      >
        {t("Shipping_information")}
      </Link>
      <button className="text-gray-400 font-medium  mt-2" onClick={handleBack}>
        {t("back")}{" "}
      </button>
      <button
        className="text-opink font-medium"
        onClick={() => onMoveScreen("help_screen")}
      >
        {t("center_help")}{" "}
      </button>
    </div>
  );
};
