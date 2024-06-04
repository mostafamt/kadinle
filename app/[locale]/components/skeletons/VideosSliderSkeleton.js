import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderBtnSkeleton from "./SliderBtnSkeleton";
import VideoCardSkeleton from "./VideoCardSkeleton";

const VideosSliderSkeleton = ({ order, count = 5 }) => {
  return (
    <div style={{ order }}>
      <div className=" w-full flex items-center justify-between">
        <div className="flex flex-col space-y-1 self-center mb-[18px]">
          <div className="h-11 w-[100px] bg-gray-200 animate-pulse rounded"></div>
          <div className="bg-gray-200 w-[60px] h-[8px] animate-pulse rounded"></div>
        </div>
        <div className="w-20 h-7 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="w-[100%] flex items-center relative mb-[64px]">
        <SliderBtnSkeleton />
        <div className=" w-[100%] overflow-hidden">
          <div className="flex gap-4">
            {Array(count)
              .fill()
              .map((_, idx) => (
                <div key={idx} className="flex-1">
                  <VideoCardSkeleton />
                </div>
              ))}
          </div>
        </div>
        <SliderBtnSkeleton rotate />
      </div>
    </div>
  );
};

export default VideosSliderSkeleton;
