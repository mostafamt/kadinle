"use client";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";
import CloseIcon from "../Icons/CloseIcon";
import ArrowBackIcon from "../Icons/ArrowBackIcon";

export const CartSendGift = ({ sendGiftMessage, setSendGiftMessage }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <div className="flex flex-col gap-2 bg-gray-100 w-full p-1 rounded-xl overflow-hidden border border-gray-200 bg md:max-w-[500px] mb-8 relative">
          <button
            onClick={() => setOpen(false)}
            className="top-2 ltr:right-2 rtl:left-2 absolute"
          >
            <CloseIcon className="text-sx text-red-500 h-5 w-5" />
          </button>
          <label className="capitalize pt-1 px-1">{t("sendGift")} </label>
          <textarea
            value={sendGiftMessage}
            onChange={(e) => setSendGiftMessage(e.target.value)}
            className="resize-y min-h-[80px] w-full"
          />
          {/* <button onClick={}>{t('send')}</button> */}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mb-8 flex items-center text-opink text-sm"
        >
          {t("sendAsGift")}{" "}
          <span className="block ltr:rotate-180 px-1 scale-90">
            <ArrowBackIcon />
          </span>
        </button>
      )}
    </>
  );
};
