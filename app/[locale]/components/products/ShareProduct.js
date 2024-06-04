"use client";

import React, { useContext, useState, useTransition } from "react";
import {
  FacebookMessengerShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { onShareProductPoints } from "@/app/api/supabase/points";

const ShareProduct = ({ setShare, url, title }) => {
  const t = useTranslations();
  const { user, showShare, setShowShare } = useGlobalOptions();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(
      (typeof window === "object" && window?.location?.href) ||
        "https://kadinle.com"
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  function handleShareClose(shareResult) {
    if (!user?.id) return;
    if (shareResult === "success") {
      onShareProductPoints();
      console.log("Share successful");
    } else if (shareResult === "cancel") {
      console.log("Share canceled");
    } else {
      console.log("Share failed");
    }
    setShare(false);
  }

  return (
    <div className={`${showShare ? "block" : "hidden"}`}>
      <div
        onClick={(e) => setShowShare(false)}
        className="fixed min-w-[100vw] min-h-[100vh] top-0 ltr:left-0 rtl:right-0 z-[9000] opacity-60"
      ></div>
      <div className="fixed max-w-[300px] z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] flex flex-col px-3 pb-5 bg-owhite rounded-[10px]">
        <div
          onClick={(e) => {
            setShowShare(false);
          }}
          className="absolute top-[0] ltr:left-0 rtl:right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Image
            src={"https://kadinle.com/media/images/Cancel2.svg"}
            className="w-[40px] h-auto"
            height={40}
            width={40}
          />
        </div>

        <p className="mt-6 font-[500] ">{t("share_msg")}</p>

        <div className="flex justify-between gap-2 mt-4">
          <FacebookMessengerShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src={"https://kadinle.com/media/images/Facebook2.svg"}
              className="w-[30px] h-auto"
              height={30}
              width={30}
            />
          </FacebookMessengerShareButton>
          <InstapaperShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src="https://kadinle.com/media/images/instagram.svg"
              className="w-[30px] h-auto"
              height={30}
              width={30}
            />
          </InstapaperShareButton>
          <TwitterShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src={"https://kadinle.com/media/images/Twitter2.svg"}
              className="w-[30px] h-auto"
              height={30}
              width={30}
            />
          </TwitterShareButton>
          <WhatsappShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src={"https://kadinle.com/media/images/Whatsapp2.svg"}
              className="w-[30px] h-auto"
              height={30}
              width={30}
            />
          </WhatsappShareButton>
          <TelegramShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src={"https://kadinle.com/media/images/Telegram2.svg"}
              className="w-[30px] h-auto"
              height={30}
              width={30}
            />
          </TelegramShareButton>
        </div>

        <p className="mt-4 text-[14px]">
          {t("or_copy")}{" "}
          {copied ? (
            <span className="text-xs bg-green-100 text-green-500 p-1 px-2">
              {t("Copied")}
            </span>
          ) : null}{" "}
        </p>

        <div className="py-1 border rounded-[10px] flex gap-2 justify-between mt-2 px-2 text-[12px] ">
          <div className="flex gap-2 items-center w-[80%] overflow-hidden">
            <Image
              src={"https://kadinle.com/media/images/Link.svg"}
              className="w-[13px] min-w-[13px] h-auto cursor-pointer"
              height={15}
              width={15}
            />
            <p className="mx-1 break-words overflow-ellipsis whitespace-nowrap">
              {typeof window === "object"
                ? window?.location?.href
                : "https://kadinle.com"}
            </p>
          </div>

          <button
            onClick={copy}
            className="w-[20%] border border-opink  hover:bg-owhite hover:text-black px-2  py-1 text-[12px]  rounded-[10px] bg-opink text-owhite flex flex-col justify-center items-center"
          >
            {t("Copy")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProduct;
