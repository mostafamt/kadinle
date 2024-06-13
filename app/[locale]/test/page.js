"use client";
import React from "react";
import { getHomeSliders } from "@/app/api/supabase/home";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const page = async () => {
  const sliders = await getHomeSliders();
  const data = sliders?.data;

  const item = data?.[0];

  return (
    <div>
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data.map((item) => (
          <SwiperSlide key={item.image}>
            <Image
              src={item.image}
              alt={item.description}
              width={600}
              height={600}
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

export default page;
