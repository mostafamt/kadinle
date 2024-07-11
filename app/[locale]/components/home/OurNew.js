"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Link from "next/link";
import { SectionTitle } from "../global/SectionTitle";
import { SmallCard } from "./SmallCard";

SwiperCore.use([Pagination]);

const OurNew = ({ products, sectionSettings, order, ourNew,seeMore }) => {
  const t = useTranslations();
  const [target, setTarget] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  return (
    <div
      style={{
        order: sectionSettings?.section_order || order,
        display: !sectionSettings?.display_home && "none !important",
      }}
    >
      <div className=" w-full px-4 mb-2 flex justify-between items-center container mx-auto">
        <SectionTitle title={ourNew} containerClassName="!w-auto !mt-0 !mb-0" />
        <Link
          href={`/categories/new-arrivals`}
          className="capitalize text-sm md:text-xl md:font-semibold text-primary no-underline cursor-pointer"
        >
          {seeMore}
        </Link>
      </div>
      <div className="flex relative justify-center w-full bg-opink my-2 mt-4">
        <div className="flex flex-col p-4 items-center ltr:pl-4 rtl:pr-4 swipe-parent  w-full">
          <div className="flex justify-center items-center w-full">
            <div className="w-full overflow-hidden container mx-auto">
              <Swiper
                dir="ltr"
                onSwiper={setSwiper}
                modules={[Pagination]}
                pagination={{
                  renderBullet: function (index, className) {
                    return `<span class="${className}"></span>`;
                  },
                  clickable: true,
                  bulletClass: "swiper-bullet",
                  bulletActiveClass: "swiper-bullet-active-white",
                }}
                direction="horizontal"
                spaceBetween={10}
                slidesPerView={3.5}
                slidesPerGroup={3}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
                onSlideChange={() => {
                  setTarget(swiperRef.current.realIndex);
                }}
                className="mySwiper"
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                showsPagination={true}
              >
                {products?.slice(0, 30)?.map((product) => (
                  <SwiperSlide key={product?.id}>
                    <SmallCard small product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurNew;