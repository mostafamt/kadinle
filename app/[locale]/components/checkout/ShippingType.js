"use client";

import { getFormatPrice } from "@/app/api/lib/functions";
import { FREE_SHIPPING_COST, SHIPPING_TYPE } from "@/app/api/static/constants";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React from "react";
import { useContext } from "react";

export const ShippingType = ({
  warehouseInformation,
  setShipping_type,
  shipping_type,
  shippingsCosts,
  loadingShipping,
  total,
}) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();
  return (
    <div>
      <h3 className="text-base mb-3 border-b pb-2">{t("type_shipping")}</h3>
      {warehouseInformation && !loadingShipping ? (
        <div>
          <div className="flex gap-4 items-center flex-wrap">
            {total >= FREE_SHIPPING_COST ? (
              <div
                className={`flex flex-col flex-1 gap-2 items-center border border-gray-300 text-sm capitalize justify-center p-2 px-4 cursor-pointer rounded-md ${
                  SHIPPING_TYPE[1] === shipping_type
                    ? "bg-opink text-white"
                    : ""
                }`}
                onClick={() => {
                  setShipping_type(SHIPPING_TYPE[1]);
                }}
              >
                <div className="flex items-center gap-2 justify-center">
                  <strong className="md:text-xl text-inherit capitalize whitespace-nowrap font-medium">
                    {t("Free_Shipping")}
                  </strong>
                </div>
                <div className="text-inherit text-xs flex gap-2 items-center  ">
                  {t("Delivery")}:
                  <span className="text-inherit flex">
                    {warehouseInformation?.shipping?.min_normal_duration ||
                      warehouseInformation?.shipping?.min_fast_duration}{" "}
                    -
                    {warehouseInformation?.shipping?.max_normal_duration ||
                      warehouseInformation?.shipping?.max_fast_duration}{" "}
                    {t("days")}
                  </span>
                </div>
              </div>
            ) : null}
            {warehouseInformation?.shipping?.min_normal_duration ? (
              <div
                className={`flex flex-col flex-1 gap-2 items-center border border-gray-300 text-sm capitalize justify-center p-2 px-4 cursor-pointer rounded-md ${
                  SHIPPING_TYPE[0] === shipping_type
                    ? "bg-opink text-white"
                    : ""
                }`}
                onClick={() => {
                  setShipping_type(SHIPPING_TYPE[0]);
                }}
              >
                <div className="flex items-center gap-2 justify-center">
                  <strong className="md:text-xl text-inherit font-medium">
                    {getFormatPrice(shippingsCosts?.normal, currency)}
                  </strong>
                  <p className="capitalize whitespace-nowrap font-medium">
                    {t("standard_shipping")}
                  </p>
                </div>
                <div className="text-inherit text-xs flex gap-2 items-center  ">
                  {t("Delivery")}:
                  <span className="text-inherit flex">
                    {warehouseInformation?.shipping?.min_normal_duration} -
                    {warehouseInformation?.shipping?.max_normal_duration}{" "}
                    {t("days")}
                  </span>
                </div>
              </div>
            ) : null}
            {warehouseInformation?.shipping?.min_fast_duration ? (
              <div
                className={`flex flex-col flex-1 gap-2 items-center border border-gray-300 text-sm capitalize justify-center p-2 px-4 cursor-pointer rounded-md ${
                  SHIPPING_TYPE[2] === shipping_type
                    ? "bg-opink text-white"
                    : ""
                }`}
                onClick={() => {
                  setShipping_type(SHIPPING_TYPE[2]);
                }}
              >
                <div className="flex items-center gap-2 justify-center">
                  <strong className="md:text-xl text-inherit font-medium">
                    {getFormatPrice(shippingsCosts?.fast, currency)}
                  </strong>
                  <p className="capitalize whitespace-nowrap font-medium">
                    {t("Fast_Shipping")}
                  </p>
                </div>
                <div className="text-inherit text-xs flex gap-2 items-center  ">
                  {t("Delivery")}:
                  <span className="text-inherit flex">
                    {warehouseInformation?.shipping?.min_fast_duration} -
                    {warehouseInformation?.shipping?.max_fast_duration}{" "}
                    {t("days")}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          {/* <div className="">
            <p></p>
            <p>total</p>
            <p>{t("total")}</p>
            <p>{t("subtotal")}</p>
          </div> */}
        </div>
      ) : (
        <p className=" text-sm text-red-400">{t("address_choose_msg")}</p>
      )}
    </div>
  );
};
