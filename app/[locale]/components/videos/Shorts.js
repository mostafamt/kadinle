"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ShortPlayer } from "./ShortPlayer";

const Shorts = ({ layout, videos, videoId }) => {
  const t = useTranslations();
  const videoRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [transitionStage, setTransistionStage] = useState("");
  const [touchStartY, setTouchStartY] = useState(null);

  useEffect(() => {
    document.body.style.paddingBottom = 0;
  }, []);
  
  useEffect(() => {
    for (let index = 0; index < videos?.length; index++) {
      if (videos[index]?.id === videoId) {
        setCurrentIndex(index);
      }
    }
  }, [videos]);

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    return false;
  };

  const handleTouchMove = (event) => {
    if (!touchStartY) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    if (deltaY > 0) {
      if (currentIndex > 0) {
        setTransistionStage("fadeOut");
        setCurrentIndex((prev) => prev - 1);
        router.push(`/videos/${layout}/${videos[currentIndex - 1]?.id}`);
      }
      // go previous
    } else {
      // go next
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
  return (
    <div
      className=" bg-[#101010] top-0 left-0 right-0 bottom-0"
      // onWheel={handleWheel}
      // onTouchStart={onTouchStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
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
    </div>
  );
};

export default Shorts;
