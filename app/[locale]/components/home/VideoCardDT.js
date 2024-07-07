"use client";
import { useRouter } from "next/navigation";
import { PlayCircleIcon } from "../Icons/PlayCircleIcon";
import { StarIcon } from "./../Icons/StarIcon";
import { useTranslations } from "next-intl";

function VideoCardDT({ review, layout, viewCount, noView }) {
  const t = useTranslations();
  const router = useRouter();

  const handleLink = () => {
    router?.push(`/videos/${layout}/${review?.id}`);
  };

  return (
    <>
      <div
        className="relative flex flex-col border border-[#E264AD] p-2 md:p-2 rounded-lg"
        onClick={handleLink}
      >
        <div className="relative h-[360px]">
          <video
            src={`${review?.url}#t=2.1`}
            preload="metadata"
            className="h-full w-full max-w-none object-cover"
          ></video>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <PlayCircleIcon className="w-14 h-14 text-primary fill-white" />
          </span>
          <div className="w-full h-full absolute top-0 ltr:left-0 rtl:right-0 bg-[#ffffff20] cursor-pointer opacity-40"></div>
        </div>
        <div className="flex justify-between items-center  gap-2 mt-2">
          <div className="flex flex-col w-[65%]">
            <div className="flex flex-col gap-1 items-start">
              <h4 className="text-xs whitespace-nowrap lg:text-sm ">
                {layout === "influencer-videos"
                  ? review?.first_name + " " + review?.last_name
                  : review?.name}
              </h4>
              <p className="text-[12px] lg:text-[14px] text-gray-500 whitespace-nowrap">
                {review?.views > 0
                  ? `${viewCount}: ${review?.views}`
                  : noView}
              </p>
            </div>
          </div>
          {review?.rating ? (
            <div className="flex gap-1 text-white items-center px-3 py-1 lg:py-2 w-[25%] lg:w-none  bg-primary rounded-md lg:rounded-lg justify-center">
              <StarIcon className="text-primary h-8 w-8" />
              <p className="text-[10px] xl:text-[14px] font-semibold">
                {review?.rating}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default VideoCardDT;
