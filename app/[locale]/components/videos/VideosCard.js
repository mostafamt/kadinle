import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const play = "https://kadinle.com/media/images/play.svg";
const star = "https://kadinle.com/media/images/star.svg";

const VideosCard = ({ review, layout, isLarge }) => {
  const t = useTranslations();
  const router = useRouter();
  const [active, setActive] = useState(false);

  const handleLink = () => {
    router.push(`/videos/${layout}/${review?.id}`);
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
        />
        <div
          onClick={(e) => setActive(true)}
          className={`${
            active && "scale-[1.25]"
          } transition duration-[300ms] z-[1000] absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2`}
        >
          <Image
            className="w-[30px] object-contain"
            src={play}
            alt="play"
            height={30}
            width={30}
          />
        </div>
        <div
          className={` w-full h-full absolute top-0 ltr:left-0 rtl:right-0 bg-tgray opacity-40`}
        ></div>
      </div>
      <div
        className="flex justify-between items-center  gap-2 mt-1
      "
      >
        <div className="flex flex-col w-full ">
          <div className="flex justify-between gap-[1px] w-full items-center">
            <div className="w-full p-1 flex-1">
              <h4 className="text-xs whitespace-nowrap">{review?.name}</h4>
              <p className="text-[8px] flex whitespace-nowrap items-center gap-2 ">
                {review?.views > 0
                  ? `${t("views")}: ${review?.views}`
                  : t("no_views")}
              </p>
            </div>
            {review?.rating ? (
              <div className="flex gap-1 text-white items-center px-3 py-1 lg:py-2 w-[25%] lg:w-none  bg-opink rounded-md lg:rounded-lg justify-center">
                <Image
                  className="w-[12px] lg:w-[15px] object-contain"
                  src={star}
                  alt="star"
                  height={15}
                  width={15}
                />
                <p className="text-[10px] xl:text-[14px] font-semibold">
                  {review?.rating}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosCard;
