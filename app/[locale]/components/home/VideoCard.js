"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { PlayCircleIcon } from "../Icons/PlayCircleIcon";
import { StarIcon } from "./../Icons/StarIcon";
import { useTranslations } from "next-intl";
const play = "https://kadinle.com/media/images/play.svg";

function VideoCard({ review, layout, isLarge }) {
  const t = useTranslations();
  const router = useRouter();

  const handleLink = () => {
    router?.push(`/videos/${layout}/${review?.id}`);
  };

  return (
    <div className="relative flex flex-col border border-[#E264AD] p-[3px] rounded-md">
      <div
        className={`relative w-full ${
          isLarge ? "h-full" : " h-[220px] sm:h-[280px]"
        }`}
        onClick={handleLink}
      >
        <video
          src={`${review?.url}#t=2.1`}
          preload="metadata"
          className="h-full w-full max-w-none object-cover"
        ></video>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            className="w-[30px]"
            src={play}
            alt="play"
            height={30}
            width={30}
          />
        </span>
        <div className="w-full h-full absolute top-0 ltr:left-0 rtl:right-0 bg-[#ffffff20] cursor-pointer opacity-40"></div>
      </div>
      <div className="w-full mt-2 rtl:right-dir">
        <h4 className="text-xs whitespace-nowrap lg:text-sm ">
          {layout === "influencer-videos"
            ? review?.first_name + " " + review?.last_name
            : review?.name}
        </h4>
        <div className="flex gap-2 items-center">
          <p className="text-[12px] flex-1 whitespace-nowrap text-ellipsis lg:text-[14px] text-gray-500">
            {review?.views > 0
              ? `${t("View_count")}: ${review?.views}`
              : t("no_views")}
          </p>
          {review?.rating ? (
            <div className="flex gap-1 text-white items-center px-1 py-[2px] bg-primary rounded-md">
              <StarIcon className="text-primary h-5 w-5" />
              <span className="text-[10px] font-semibold">
                {review?.rating}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
