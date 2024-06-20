"use client";

import React from "react";

import { getHomeSliders } from "@/app/api/supabase/home";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const HomeSwiper = async () => {
  const sliders = await getHomeSliders();
  const data = sliders?.data;

  return (
    <div>
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
              src={item.image}
              alt={item.description}
              width={4800}
              height={4800}
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
