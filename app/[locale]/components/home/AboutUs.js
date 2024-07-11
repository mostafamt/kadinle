"use client";

import React from "react";
import AboutUsBox from "./AboutUsBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";
import Link from "next/link";

const AboutUs = ({
  translations,
  definitionSlider,
  lessThenGallery,
  languageId,
  homeSectionsOrder,
  homeSections,
}) => {
  // console.log("definitionSlider", definitionSlider);
  // console.log("lessThenGallery", lessThenGallery);
  // console.log("homeSectionsOrder", homeSectionsOrder?.["our videos"]);
  // console.log("homeSections", homeSections?.our_videos);

  const definitionSliderLaguage = definitionSlider
    .filter((item) => item.language_id === languageId)
    .sort((a, b) => a.sku - b.sku);
  // local data
  // console.log("definitionSlider", definitionSlider);
  // const aboutUsObj = [
  //   {
  //     id: 1,
  //     text: translations.who_we_are,
  //     img: "/who-we-are.jpg",
  //   },
  //   {
  //     id: 2,
  //     text: translations.sales,
  //     img: "/sales.jpg",
  //   },
  //   {
  //     id: 3,
  //     text: translations.rating,
  //     img: "/ratings.jpg",
  //   },
  //   {
  //     id: 4,
  //     text: translations.map,
  //     img: "/site-map.jpg",
  //   },
  //   {
  //     id: 5,
  //     text: translations.best_quality,
  //     img: "/best-quality.jpg",
  //   },
  //   {
  //     id: 6,
  //     text: translations.kadinle_blog,
  //     img: "/blog.jpg",
  //   },
  // ];

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
          1000: {
            slidesPerView: 5.1, 
          },
        }}
        className="mySwiper"
      >
        {/* vercel */}
        {definitionSliderLaguage?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-md">
              {/* <AboutUsBox>{item.text}</AboutUsBox> */}
              <Link href={item.url}>
                <Image
                  src={item.image}
                  alt={"image"}
                  width={200}
                  height={100}
                  className="!w-fit !h-fit object-cover rounded-md"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutUs;
