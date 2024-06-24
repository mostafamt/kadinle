"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "../Icons/ArrowBackIcon";
import { ShortPlayer } from "./ShortPlayer";

const ShortsDT = ({ videos, videoId, layout }) => {
  const router = useRouter();
  const videoRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transitionStage, setTransistionStage] = useState("");

  useEffect(() => {
    for (let index = 0; index < videos?.length; index++) {
      if (videos[index]?.id === videoId) {
        setCurrentIndex(index);
      }
    }
  }, [videos]);

  const handleWheel = (event) => {
    if (event.deltaY < 0 && currentIndex > 0) {
      setTransistionStage("fadeOut");
      setCurrentIndex((prev) => prev - 1);
      router.push(`/videos/${layout}/${videos[currentIndex - 1]?.id}`);
    } else if (event.deltaY > 0) {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setTransistionStage("fadeIn");
      setCurrentIndex((prev) => prev + 1);
      router.push(`/videos/${layout}/${videos[currentIndex + 1]?.id}`);
    }
  };

  useEffect(() => {
    typeof window === "object" &&
      window.addEventListener("scroll", handleWheel);
    return () => {
      typeof window === "object" &&
        window.removeEventListener("scroll", handleWheel);
    };
  }, []);

  return (
    <div className="fixed bg-black w-screen h-screen top-0 bottom-0 left-0 right-0 z-[10000]">
      <div
        className={`bg-black top-0 left-0 right-0 bottom-0  `}
        style={{
          // height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onTouchStart={handleWheel}
        onWheel={handleWheel}
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 ltr:left-4 text-gray-200 rtl:right-4 rtl:rotate-180"
        >
          <ArrowBackIcon />
        </button>
        <div
          className={`video-container
        ${transitionStage}
          `}
          onAnimationEnd={() => {
            if (transitionStage) {
              setTransistionStage("");
            }
          }}
        >
          <ShortPlayer
            video={videos?.[currentIndex]}
            videoRef={videoRef}
            handleNext={handleNext}
            layout={layout}
          />
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default ShortsDT;
