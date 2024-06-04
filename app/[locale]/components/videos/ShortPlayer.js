"use client";
import {
  addLike,
  addMediaLike,
  addProductLike,
  incrementView,
} from "@/app/api/supabase/videos";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ShareProduct from "../products/ShareProduct";
import ArrowBackIcon from "../Icons/ArrowBackIcon";
import { SpeakerMuteIcon } from "../Icons/SpeakerMuteIcon";
import { SpeakerIcon } from "../Icons/SpeakerIcon";
import { PauseIcon } from "../Icons/PauseIcon";
import { PlayIcon } from "../Icons/PlayIcon";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "../Icons/StarIcon";
import { ThumbsUpIcon } from "../Icons/ThumbsUpIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { ShareIcon } from "../Icons/ShareIcon";

export const ShortPlayer = ({ video, layout, handleNext, videoRef }) => {
  const { language, user, setShowShare } = useGlobalOptions();
  const router = useRouter();
  const containerRef = useRef(null);
  const [isViewed, setIsViewed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", () => {
      setDuration(videoRef.current.duration);
      videoRef?.current?.play();
      // if (currentIndex === 0 && videoRef?.current)
    });
    const intervalId = setInterval(() => {
      setCurrentTime(videoRef.current.currentTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [videoRef, video?.url]);

  const togglePlay = () => {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
      if (!isViewed) {
        increaseViews();
        setIsViewed(true);
      }
    } else {
      videoRef?.current?.pause();
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const getProgressPercentage = () => {
    return (currentTime / duration) * 100;
  };

  const handleAddLike = async () => {
    if (user?.id) {
      if (layout === "influencer-videos") {
        addLike(video?.video_id, user?.id).then((res) => {
          if (!res?.error) setIsLiked(true);
        });
      } else if (layout === "customer-videos") {
        addMediaLike(video?.comment_id || video?.video_id, user?.id).then(
          (res) => {
            if (!res?.error) setIsLiked(true);
          }
        );
      } else if (layout === "our-videos") {
        addProductLike(video?.product_id || video?.video_id, user?.id).then(
          (res) => {
            if (!res?.error) setIsLiked(true);
          }
        );
      }
    } else router.push("/login");
  };

  const increaseViews = async () => {
    if (
      (layout === "customer-videos" || layout === "influencer-videos") &&
      video?.comment_id
    )
      incrementView(video?.comment_id, "comment");
    else if (layout === "our-videos")
      incrementView(video?.content?.[0]?.product_id);
    else incrementView(video?.video_id);
  };

  const handleLink = () => {
    router.push(`/product/${video?.product_sku}`);
  };
  const content = video?.content?.find((c) => c?.language_id === language?.id);
  return (
    <>
      <ShareProduct
        setShare={setShowShare}
        title={content?.name}
        url={`${
          typeof window === "object" && window?.location?.origin
        }/product/${video?.product_sku}`}
      />
      <div className="w-full bg-[#101010]">
        <div
          className="xs:max-w-[400px] h-screen relative mx-auto items-end gap-2 "
          ref={containerRef}
        >
          <div className="absolute top-0 z-10 w-full">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="opacity-0 absolute z-[2] left-0 top-0 w-full"
            />
            <div
              style={{ width: "100%", height: "5px", backgroundColor: "gray" }}
            >
              <div
                className="bg-opink"
                style={{ width: `${getProgressPercentage()}%`, height: "100%" }}
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-4 z-10 w-full left-0 px-4 flex justify-between items-center">
              <button
                onClick={() => router.push("/")}
                className="text-gray-200 hover:bg-[#00000050] rounded-full rtl:rotate-180 p-1"
              >
                <ArrowBackIcon />
              </button>
              <button onClick={toggleMute}>
                {videoRef?.current?.muted ? (
                  <SpeakerMuteIcon className="w-6 h-6 text-white" />
                ) : (
                  <SpeakerIcon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
            <div
              className="h-screen w-ful relative flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              <video
                src={video?.url}
                ref={videoRef}
                className="aspect-video h-full w-full object-contain max-w-none"
                onEnded={handleNext}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={`absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 bg-[#00000080] p-2 rounded-full flex items-center justify-center scale-125 w-16 h-16 -translate-y-1/2 z-10 ${
                  !videoRef?.current?.paused ? "hidden" : ""
                }`}
              >
                {!videoRef?.current?.paused ? (
                  <PauseIcon className="w-10 h-10 text-white" />
                ) : (
                  <PlayIcon className="w-10 h-10 text-white" />
                )}
              </button>
            </div>
            {/* body */}
          </div>
          {/* bars */}

          <div className="w-full flex justify-between items-end gap-2 text-gray-200 px-4 text-sm absolute rtl:right-0 ltr:left-0 bottom-20">
            <div className="flex flex-1 flex-col gap-4 max-w-[80%]">
              <Link
                href={`/product/${video?.product_sku}`}
                className="text-opink underline mb-3 text-sm capitalize  overflow-hidden text-ellipsis whitespace-nowrap "
              >
                {content?.name}
              </Link>

              {/* images */}
              <div className="flex gap-3 mb-6">
                {video?.images?.slice(0, 6)?.map((img) => (
                  <figure
                    key={img}
                    className="h-14 w-10 cursor-pointer"
                    onClick={handleLink}
                  >
                    <Image
                      src={img}
                      alt={content?.image_alt}
                      className="rounded-lg"
                      height={56}
                      width={40}
                    />
                  </figure>
                ))}
              </div>
              {layout === "influencer-videos" || layout === "customer-videos" ? (
                <div className="flex gap-2 items-center">
                  <Image
                    src={video?.profile_img}
                    alt="user creator"
                    className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center"
                    height={36}
                    width={46}
                  />
                  <div className="">
                    <h3>
                      {layout === "influencer-videos"
                        ? video?.first_name + " " + video?.last_name
                        : video?.name}
                    </h3>
                    {layout === "customer-videos" ? (
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          ?.map((r, index) => (
                            <StarIcon
                              key={index}
                              className={`h-3 w-3 ${
                                index <= video?.rating
                                  ? "text-primary fill-primary"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddLike}
                className="flex flex-col items-center justify-center gap-1"
              >
                <span
                  className={`${
                    isLiked ? "h-10 w-10 rounded-full bg-[#fff3]" : ""
                  } flex items-center justify-center`}
                >
                  <ThumbsUpIcon className={`w-7 h-7 text-opink `} />
                </span>
                {video?.likes}
              </button>
              <div className="flex flex-col items-center justify-center gap-1">
                <EyeIcon className="w-7 h-7 text-opink" />
                {video?.views}
              </div>
              <button
                onClick={() => setShowShare(true)}
                className="flex flex-col items-center justify-center gap-1"
              >
                <ShareIcon className="w-7 h-7 text-opink" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
