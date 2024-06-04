"use client";
import { getFormatPrice } from "@/app/api/lib/functions";
import { SHIPPING_TYPE } from "@/app/api/static/constants";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";

const pinkArrow = "https://kadinle.com/media/images/pinkArrow.png";

export const TotalBottomBar = ({
  shipping_cost,
  shipping_adress,
  setStage,
  stage,
  total,
  shipping_type,
  STAGES,
}) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();

  const onGoNext = () => {
    let index = STAGES.indexOf(stage);
    if (index + 1 === 2) {
      checkStage();
      return;
    }
    setStage(STAGES[index + 1]);
  };

  const checkStage = () => {
    if (shipping_adress) {
      setStage("checkout");
    } else {
      toast.error(t("select_address_msg"));
    }
  };

  return (
    <div className="text-[11px] pt-1 pb-3 border-t fixed left-0 flex items-center justify-center bottom-[65px] w-full bg-[#F5F6F8] z-[100]">
      <div className="w-full md:max-w-[500px] px-4 relative flex justify-between items-center">
        <div
          className={`flex ${
            stage === STAGES?.[3]
              ? "flex-row items-center justify-between gap-2 flex-wrap"
              : "flex-col"
          }`}
        >
          <p className="text-[#25252D]  capitalize flex items-center gap-2">
            {t("subtotal")}: {getFormatPrice(total, currency)}
          </p>
          {shipping_cost ? (
            <p className="text-[#525C8E] font-medium">
              {t("Delivery")}: {getFormatPrice(shipping_cost, currency)}
            </p>
          ) : null}
          {shipping_type === SHIPPING_TYPE?.[1] && stage !== "Cart" ? (
            <p className="text-[#525C8E] font-medium">
              {t("Delivery")}: {t("Free_Shipping")}
            </p>
          ) : null}
          <div className="border-t " />
          <h3 className="font-bold text-[15px] flex items-center capitalize">
            {t("total")}: {getFormatPrice(total + shipping_cost, currency)}
          </h3>
        </div>
        {stage === STAGES?.[3] ? null : (
          <button
            onClick={onGoNext}
            className="flex cursor-pointer capitalize px-4 justify-between items-center w-[145px] text-center py-1 ltr:pr-2 rtl:pl-2 rounded-full bg-opink text-[12px] text-owhite"
          >
            {t("next")}
            <Image
              className="w-[25px] rtl:rotate-180"
              src={pinkArrow}
              alt="go next"
              height={25}
              width={25}
            />
          </button>
        )}
      </div>
    </div>
  );
};
