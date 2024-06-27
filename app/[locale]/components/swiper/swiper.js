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
    <div className="max-w-[406px] h-[199px] md:max-w-[1200px] md:h-[400px] px-2 pb-96 m-auto">
      <Swiper
        pagination={{
          clickable: true,
          
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.image}>
            <Image
              className="max-w-[1200px] h-[400px]"
              src={item.image}
              alt={item.description}
              width={1200}
              height={400}
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
