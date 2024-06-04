"use client";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useMemo } from "react";
import CalenderIcon from "../Icons/CalenderIcon";
import { getFormatPrice } from "@/app/api/lib/functions";

export const WalletCard = ({ wallet }) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();

  const statusColor = useMemo(() => {
    return ["RECEIVED", "DEPOSIT"]?.includes(wallet?.status);
  }, [wallet?.status]);

  const userView = useMemo(() => {
    if (!wallet?.user_from) return;
    let { user } = wallet;
    return user?.first_name + " " + user?.last_name;
  }, [wallet]);

  return (
    <div
      className={`rtl:border-l-[6px] text-xs ltr:border-r-[6px] p-2 md:p-4 rounded-md shadow bg-white mb-2 ${
        statusColor ? "border-green-400" : "border-red-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <h4
          className={`text-lg font-semibold ${
            statusColor ? "text-green-500" : "text-red-500"
          }`}
        >
          {getFormatPrice(wallet?.amount, currency)}
        </h4>
        <span
          className={`text-white px-2 py-[2px] rounded-md text-xs ${
            statusColor ? "bg-green-400" : "bg-red-500"
          }`}
        >
          {t(
            typeof wallet?.status === "string"
              ? wallet?.status?.toLowerCase()
              : wallet?.status
          )}
        </span>
      </div>
      <div className="flex gap-2 items-center justify-between text-gray-400 text-xs font-medium">
        {wallet?.user_from ? (
          <p className="capitalize text-black">
            {statusColor
              ? `${t("user_wallet_from")}`
              : `${t("user_wallet_to")}`}
            <span className="text-opink">{userView}</span>
          </p>
        ) : null}
        <p className="flex gap-1 items-center">
          <CalenderIcon />{" "}
          {new Date(wallet?.created_at).toLocaleDateString("en-UK")}
        </p>
      </div>
    </div>
  );
};
