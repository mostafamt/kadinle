"use client";

import React from "react";

import { getHomeSliders } from "@/app/api/supabase/home";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const HomeSwiper = async () => {
  const sliders = await getHomeSliders();
  const data = sliders?.data;

  return (
    <div className="h-[199px] md:h-[400px]">
      <Swiper
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.image}>
            <Image
              className="w-fit full-screen"
              src={item.web_image}
              alt={item.description}
              width={1200}
              height={500}
              style={{
                width: "100%",
              }}
            />
            <Image
              className="w-fit mob-screen"
              src={item.mobile_image}
              alt={item.description}
              width={500}
              height={200}
              style={{
                width: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
