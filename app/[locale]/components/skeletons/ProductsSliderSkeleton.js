"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsSliderSkeleton = () => {
  return (
    <div className="px-1 w-full mt-[10px] relative">
      <div className="w-[100%] overflow-hidden">
        <Swiper
          dir="ltr"
          direction="horizontal"
          spaceBetween={5}
          slidesPerView={3.25}
          slidesPerGroup={3}
          breakpoints={{
            0: { slidesPerView: 2.3 },
            300: { slidesPerView: 3.25 },
            450: { slidesPerView: 3.75 },
            500: { slidesPerView: 4.5 },
            600: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {Array(5)
            .fill()
            .map((_, idx) => (
              <SwiperSlide key={idx}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex justify-center items-center gap-2 animate-pulse -mt-2">
        {Array(5)
          .fill()
          ?.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index === 0
                    ? "h-2 w-[40px] bg-gray-200 rounded-xl cursor-pointer"
                    : "h-2 w-2 bg-gray-200 rounded-xl cursor-pointer"
                }
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsSliderSkeleton;
