"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductPageSliderSkeleton = () => {
  return (
    <div className="w-full flex justify-center productColor">
      <div className="flex flex-col items-centers w-[90%] xs:max-w-[400px]">
        <div className="relative w-full flex justify-center">
          <div className="w-full">
            <Swiper
              dir="ltr"
              direction="horizontal"
              spaceBetween={5}
              slidesPerView={1}
              className="mySwiper single-product-swiper"
              effect="coverflow"
              showsPagination={true}
            >
              {Array(8)
                .fill()
                .map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full min-h-[600px] bg-gray-200">
                      <div className="absolute ltr:right-6 rtl:left-6 top-4 flex flex-col gap-2 z-[1]">
                        <div className="w-[35px] h-[35px] rounded bg-gray-400 animate-pulse" />
                        <div className="w-[35px] h-[35px] rounded bg-gray-400 animate-pulse" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-center items-center gap-2 animate-pulse z-[1] absolute bottom-8 left-1/2 -translate-x-1/2">
              {Array(5)
                .fill()
                ?.map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "h-2 w-[40px] bg-gray-400 rounded-xl cursor-pointer"
                          : "h-2 w-2 bg-gray-400 rounded-xl cursor-pointer"
                      }
                    ></div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSliderSkeleton;
