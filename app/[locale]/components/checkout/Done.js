"use client";
import { getFormatPrice } from "@/app/api/lib/functions";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

const done = "https://kadinle.com/media/images/done.png";

const Done = ({ total, order_number }) => {
  const t = useTranslations();
  const { currency, user } = useGlobalOptions();

  return (
    <div className="flex flex-col text-[12px]">
      <div className="flex justify-between items-center">
        {/* <div className="w-1/3">
          <Image className="w-[11px] rtl:rotate-180" src={back} />
        </div> */}
        <p className="w-1/3 capitalize">{t("finishedOrder")}</p>
        {/* <div className="flex justify-end gap-7 mt-3 mb-3 w-1/3">
          <NavIcons />
        </div> */}
      </div>

      <div className="self-center w-[65%] mt-8">
        <Image
          className="w-full object-contain h-auto max-h-[200px]"
          src={done}
          alt="completed order"
          height={200}
          width={200}
        />
      </div>

      <div className="flex flex-col self-center pb-3 border-b-2 ">
        <p className="text-center mt-3 ">{t("thankYouForOrder")}</p>
        <p className="text-center mt-1 text-[10px] text-[#6C8394] max-w-[307px]">
          {`${t("thankYouEmail")} ${user?.email}`}
        </p>
      </div>

      <div className="self-center flex flex-col w-full mt-3 space-y-3">
        <div className="flex justify-between w-full">
          <p className="w-[110px] capitalize">{t("orderSummary")}</p>
          <Link
            href="/profile"
            className="w-[70px] text-opink text-[11px] capitalize"
          >
            {t("viewDetails")}
          </Link>
        </div>

        <div className="flex justify-between w-full">
          <p className="w-[110px] capitalize">{t("orderTotal")}</p>
          <p className="w-[70px] text-[#6C8394] text-[11px]">
            {getFormatPrice(total, currency)}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <p className="w-[110px] capitalize">{t("orderNumber")}</p>
          <p className="w-[70px] text-[#6C8394] text-[11px]">{order_number}</p>
        </div>

        <div className="flex justify-between w-full">
          <p className="w-[110px] capitalize">{t("paymentMethod")}</p>
          <p className="w-[70px] text-[#6C8394] text-[11px]">Card</p>
        </div>
      </div>

      <div className="self-center justify-center flex gap-4 w-full mt-6">
        <Link
          href="/"
          className={`flex capitalize justify-center items-center w-[45%] max-w-[135px] py-1 ltr:pr-2 rtl:pl-2 rounded-full `}
        >
          {t("home")}
        </Link>

        <Link
          href="/profile"
          className={`flex justify-center items-center w-[45%] max-w-[135px] py-1 ltr:pr-2 rtl:pl-2 rounded-full `}
        >
          {t("myOrders")}
        </Link>
      </div>
    </div>
  );
};

export default Done;
