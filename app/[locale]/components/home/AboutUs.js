"use client";

import React from "react";
import AboutUsBox from "./AboutUsBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

const AboutUs = ({ translations }) => {
  const aboutUsObj = [
    {
      id: 1,
      text: translations.who_we_are,
    },
    {
      id: 2,
      text: translations.sales,
    },
    {
      id: 3,
      text: translations.rating,
    },
    {
      id: 4,
      text: translations.map,
    },
    {
      id: 5,
      text: translations.best_quality,
    },
    {
      id: 6,
      text: translations.kadinle_blog,
    },
  ];

  return (
    <div className="my-2 overflow-hidden rtl:pl-4 ltr:pr-4 lg:container lg:mx-auto">
      <Swiper
        dir="ltr"
        pagination={{
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
          clickable: true,
          bulletClass: "swiper-bullet",
          bulletActiveClass: "swiper-bullet-active",
        }}
        modules={[Pagination]}
        direction="horizontal"
        spaceBetween={5}
        slidesPerView={3.1}
        slidesPerGroup={3}
        breakpoints={{
          0: { slidesPerView: 2.3 },
          300: { slidesPerView: 3.2 },
        }}
        className="mySwiper"
      >
        {aboutUsObj.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-md">
              <AboutUsBox>{item.text}</AboutUsBox>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutUs;
