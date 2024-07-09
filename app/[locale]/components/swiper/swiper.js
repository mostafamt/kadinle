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

// eslint-disable-next-line @next/next/no-async-client-component
const HomeSwiper = async ({languageId}) => {
  const sliders = await getHomeSliders();
  const data = sliders?.data;
  const content = data?.filter((c) => c?.language_id == languageId);

  return (
    <div className="">
      <div className="full-screen">
        <Swiper
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {content.map((item) => (
            <SwiperSlide key={item.image}>
              <Image
                className="w-fit object-cover"
                src={item.web_image}
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
      <div className="mob-screen mob-home-swiper">
        <Swiper
          pagination={{
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
            clickable: true,
            bulletClass: "swiper-bullet",
            bulletActiveClass: "swiper-bullet-active",
          }}
          modules={[Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {content.map((item) => (
            <SwiperSlide key={item.image}>
              <Image
                className="w-fit object-cover"
                src={item.mobile_image}
                alt={item.description}
                width={1000}
                height={500}
                style={{
                  width: "100%",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default HomeSwiper;
       {
         /* <div className="mob-screen">
              
            </div> */
       }