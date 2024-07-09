"use client";

import React from "react";
import AboutUsBox from "./AboutUsBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";

const AboutUs = ({ translations,definitionSlider }) => {
  console.log("definitionSlider", definitionSlider);
  // local data
  const aboutUsObj = [
    {
      id: 1,
      text: translations.who_we_are,
      img:"/who-we-are.jpg",
    },
    {
      id: 2,
      text: translations.sales,
      img:"/sales.jpg",
    },
    {
      id: 3,
      text: translations.rating,
      img:"/ratings.jpg",
    },
    {
      id: 4,
      text: translations.map,
      img:"/site-map.jpg",
    },
    {
      id: 5,
      text: translations.best_quality,
      img:"/best-quality.jpg",
    },
    {
      id: 6,
      text: translations.kadinle_blog,
      img:"/blog.jpg",
    },
  ];

  return (
    <div className="my-2 overflow-hidden ltr:pl-2 rtl:pr-2 lg:container lg:mx-auto">
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
              {/* <AboutUsBox>{item.text}</AboutUsBox> */}
              <Image
                src={item.img}
                alt={item.text}
                width={200}
                height={100}
                className="w-full h-fit object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutUs;
