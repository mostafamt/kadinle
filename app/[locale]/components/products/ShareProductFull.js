"use client";
import { onShareProductPoints } from "@/app/api/supabase/points";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  FacebookMessengerShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Cancel2 = "https://kadinle.com/media/images/Cancel2.svg";
const Facebook2 = "https://kadinle.com/media/images/Facebook2.svg";
const Instagram2 = "https://kadinle.com/media/images/instagram.svg";
const Link = "https://kadinle.com/media/images/Link.svg";
const Telegram2 = "https://kadinle.com/media/images/Telegram2.svg";
const Twitter2 = "https://kadinle.com/media/images/Twitter2.svg";
const Whatsapp2 = "https://kadinle.com/media/images/Whatsapp2.svg";

const ShareProductFull = ({ setShare, url, title }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(
      (typeof window === "object" && window?.location?.href) ||
        `https://kadinle.com`
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
    } else if (shareResult !== "cancel") {
    } else {
    }
    setShare(false);
  }

  return (
    <div className="">
      <div
        onClick={(e) => setShare(false)}
        className="fixed min-w-[100vw] min-h-[100vh] bg-[#2A131B] top-0 left-0 z-[9000] opacity-60"
      ></div>
      <div className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[50%] xl:w-[36%] xl:max-w-[530px] flex flex-col px-6 pb-5 bg-owhite rounded-[10px]">
        <div
          onClick={(e) => {
            setShare(false);
          }}
          className="absolute -top-[30px] ltr:-left-[25px] rtl:-right-[25px] cursor-pointer scale-75"
        >
          <Image src={Cancel2} alt="close" height={25} width={25} />
        </div>

        <h3 className="mt-6 font-[500] 2xl:text-[18px]">
          {t("Share_this_link_via")}
        </h3>

        <div className="flex gap-8 mt-4">
          <FacebookMessengerShareButton
            title={title ? title : ""}
            url={
              url ? url : typeof window === "object" && window?.location?.href
            }
            onShareWindowClose={handleShareClose}
          >
            <Image
              src={Facebook2}
              className="w-[30px] h-auto  object-contain"
              alt="Facebook"
              height={25}
              width={25}
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
              src={Instagram2}
              className="w-[30px] h-auto  object-contain"
              alt="Instagram"
              height={25}
              width={25}
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
              src={Twitter2}
              className="w-[30px] h-auto  object-contain"
              alt="Twitter"
              height={25}
              width={25}
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
              src={Whatsapp2}
              className="w-[30px] h-auto  object-contain"
              alt="Whatsapp"
              height={25}
              width={25}
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
              src={Telegram2}
              className="w-[30px] h-auto  object-contain"
              alt="Telegram"
              height={25}
              width={25}
            />
          </TelegramShareButton>
        </div>

        <p className="mt-4 flex items-center justify-between">
          {t("or_copy")}{" "}
          {copied ? (
            <span className="text-xs bg-green-100 text-green-500 p-1 px-2">
              {t("Copied")}
            </span>
          ) : null}{" "}
        </p>

        <div className="py-2 border rounded-[10px] flex justify-between mt-2 px-2 text-[14px] lg:text-[16px]">
          <div className="flex gap-2 items-center ">
            <Image
              src={Link}
              className="w-[30px] h-auto cursor-pointer object-contain"
              alt=""
              height={30}
              width={30}
            />
            <p>
              {typeof window === "object"
                ? typeof window === "object" && window?.location?.href
                : "https://kadinle.com"}
            </p>
          </div>

          <button
            onClick={copy}
            className="w-[70px] lg:w-[100px] 2xl:w-[100px] border border-opink  hover:bg-owhite hover:text-[#000000] px-2  py-3 2xl:py-4 text-[12px] 2xl:text-[16px] rounded-[10px] bg-opink text-owhite flex flex-col justify-center items-center"
          >
            {t("Copy")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareProductFull;
