"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";
import CloseIcon from "../Icons/CloseIcon";
import { ShopNowBtn } from "../global/ShopNowBtn";
import { PlayCircleIcon } from "../Icons/PlayCircleIcon";
import Link from "next/link";
import { supabase } from "@/app/api/supabase/supabase.config";

export const Banner = () => {
  const t = useTranslations();
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <main className="relative text-white w-full overflow-hidden ">
      {openVideo ? (
        <div className="max-h-[500px] w-full relative capitalize">
          <button
            className="absolute top-4 ltr:left-4 rtl:right-4 z-10 h-8 w-8 flex items-center justify-center bg-[#00000050]  transition-colors hover:bg-[#ffffff60] rounded-full"
            onClick={() => setOpenVideo(false)}
          >
            <CloseIcon />{" "}
          </button>
          <video
            src={`https://kadinle.com/media/static/kadinle_home.mp4`}
            controls
            className="w-full object-cover max-w-none object-center h-full"
          />
        </div>
      ) : (
        <div className="w-full relative">
          <div className="relative w-full h-[170px] img-cover-sec">
            <Image
              layout="fill"
              className="object-cover object-top w-full"
              src={`https://kadinle.com/media/static/general_1920_1080.jpg`}
              alt="kadinle home banner"
              priority
            />
          </div>

          <div className="absolute flex top-[50%] -translate-y-1/2   ltr:left-[1%] rtl:right-[1%]   justify-between w-full px-5 desc-image">
            <div className="flex  items-center">
              <div className="flex flex-col space-y-1 ">
                <h1 className="text-[17px]  max-w-[100px] leading-[24px] ">
                  {t("saleOfSummer")}
                </h1>
                <div className="flex gap-2 items-center slide-btns">
                  <Link
                    href="/new-arrivals"
                    className="text-[10px] font-medium  bg-[#E264AD] px-3 py-1  rounded-[12px] cursor-pointer"
                  >
                    {t("shopNow")}
                  </Link>
                  <button
                    onClick={() => setOpenVideo(true)}
                    className="flex gap-2 items-center cursor-pointer text-[10px]  "
                  >
                    <PlayCircleIcon className="text-primary w-7 h-7 fill-white" />
                    {t("playVideo")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
