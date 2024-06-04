"use client";
import React from "react";

import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { HourLessIcon } from "../Icons/HourLessIcon";
import { ShippingIcon } from "../Icons/ShippingIcon";
import { TrunkFlatIcon } from "../Icons/TrunkFlatIcon";
import { PendingIcon } from "../Icons/PendingIcon";
import { CompletedOrderIcon } from "../Icons/CompletedOrderIcon";

const STATUS_NUMBER = {
  pending: 1,
  shipping: 2,
  delivery: 3,
  completed: 4,
};

export const OrderStatusBar = ({ statusNumber: status, orderStatus }) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();

  return (
    <div className=" overflow-auto scroll-hide px-4">
      <div className="my-10 mx-auto">
        <div className="flex items-center mx-auto mt-2">
          <div className="flex flex-col relative">
            <CompletedOrderIcon
              className={`absolute -top-8 ltr:-left-1 w-6 h-6 rtl:-right-1 ${
                status >= 1 ? "text-opink" : "text-secondary"
              }`}
            />
            <span
              className={`${
                status >= 1 ? "before:border-opink" : " before:border-[#727C8E]"
              } ${
                status >= 1 ? "bg-opink" : "bg-[#727C8E]"
              } h-3 w-3 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-5 before:h-5 before:rounded-full before:border`}
            />
            <p
              className={`text-xs ${
                status >= 1 ? "text-opink" : "text-secondary"
              } rtl:text-right ltr:text-center text-[9px] w-fit  w-[90px] absolute top-[125%] rtl:top-[134%] ltr:-left-10 rtl:-right-5`}
            >
              {
                orderStatus?.["1"]?.order_status_content?.find(
                  (c) => c?.language_id === language?.id
                )?.status
              }
            </p>
          </div>
          <div
            className={`flex-1 h-[2px] ${
              status >= 2 ? "bg-opink" : "bg-[#727C8E]"
            }`}
          />
          <div className="flex flex-col relative">
            <HourLessIcon
              className={`absolute -top-8 ltr:-left-1 w-6 h-6 rtl:-right-1 ${
                status >= 2 ? "text-opink" : "text-secondary"
              }`}
            />
            <span
              className={`${
                status >= 2 ? "before:border-opink" : " before:border-[#727C8E]"
              } ${
                status > 2 ? "bg-opink" : "bg-[#727C8E]"
              } h-3 w-3 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-5 before:h-5 before:rounded-full before:border`}
            />
            <p
              className={`text-xs ${
                status >= 2 ? "text-opink" : "text-secondary"
              } rtl:text-right ltr:text-center text-[9px] w-[90px] absolute top-[125%] rtl:top-[134%]  ltr:-left-10 rtl:-right-5`}
            >
              {
                orderStatus?.["2"]?.order_status_content?.find(
                  (c) => c?.language_id === language?.id
                )?.status
              }
            </p>
          </div>
          <div
            className={`flex-1 h-[2px] ${
              status >= 3 ? "bg-opink" : "bg-[#727C8E]"
            }`}
          />
          <div className="flex flex-col relative">
            <ShippingIcon
              className={`absolute -top-8 ltr:-left-3 w-7 h-7 rtl:-right-1 ${
                status >= 3 ? "text-opink" : "text-secondary"
              }`}
            />
            <span
              className={`${
                status >= 3 ? "before:border-opink" : " before:border-[#727C8E]"
              } ${
                status >= 2 ? "bg-opink" : "bg-[#727C8E]"
              } h-3 w-3 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-5 before:h-5 before:rounded-full before:border`}
            />
            <p
              className={`text-xs ${
                status >= 3 ? "text-opink" : "text-secondary"
              } rtl:text-right ltr:text-center text-[9px] w-[90px] absolute top-[125%] rtl:top-[134%] ltr:-left-10 rtl:-right-5`}
            >
              {
                orderStatus?.["3"]?.order_status_content?.find(
                  (c) => c?.language_id === language?.id
                )?.status
              }
            </p>
          </div>
          <div
            className={`flex-1 h-[2px] ${
              status >= 4 ? "bg-opink" : "bg-[#727C8E]"
            }`}
          />
          <div className="flex flex-col relative">
            <TrunkFlatIcon
              className={`absolute  ${
                language?.code?.toLowerCase() === "ar" ? "icon-flipped" : ""
              } -left-2 -top-8 ltr:-left-2 w-7 h-7 rtl:-right-2 ${
                status >= 4 ? "text-opink" : "text-secondary"
              }`}
            />
            <span
              className={`${
                status >= 4 ? "before:border-opink" : " before:border-[#727C8E]"
              } ${
                status > 4 ? "bg-opink" : "bg-[#727C8E]"
              } h-3 w-3 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-5 before:h-5 before:rounded-full before:border`}
            />
            <p
              className={`text-xs ${
                status >= 4 ? "text-opink" : "text-secondary"
              } rtl:text-right ltr:text-center text-[9px] w-[90px] absolute top-[125%] rtl:top-[134%] ltr:-left-10 rtl:-right-5`}
            >
              {
                orderStatus?.["4"]?.order_status_content?.find(
                  (c) => c?.language_id === language?.id
                )?.status
              }
            </p>
          </div>
          <div
            className={`flex-1 h-[2px] ${
              status >= 5 ? "bg-opink" : "bg-[#727C8E]"
            }`}
          />
          <div className="flex flex-col relative">
            <PendingIcon
              className={`absolute -top-7 ltr:-left-1 w-5 h-5 rtl:-right-1 ${
                status >= 5 ? "text-opink" : "text-secondary"
              }`}
            />
            <span
              className={`${
                status >= 5 ? "before:border-opink" : " before:border-[#727C8E]"
              } ${
                status > 5 ? "bg-opink" : "bg-[#727C8E]"
              } h-3 w-3 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-5 before:h-5 before:rounded-full before:border`}
            />
            <p
              className={`text-xs ${
                status > 5 ? "text-opink" : "text-secondary"
              } rtl:text-right ltr:text-center text-[9px] w-[90px] absolute top-[125%] rtl:top-[134%] ltr:-left-10 rtl:-right-5`}
            >
              {
                orderStatus?.["5"]?.order_status_content?.find(
                  (c) => c?.language_id === language?.id
                )?.status
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
