"use client";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import Link from "next/link";
import { useTranslations } from "next-intl";
import VideoCard from "./VideoCard";
import { SectionTitle } from "../global/SectionTitle";
import VideosSliderSkeleton from "../skeletons/VideosSliderSkeleton";
SwiperCore.use([Pagination, Navigation]);

export const VideoSection = ({
  head,
  videos,
  layout,
  sectionSettings,
  locale,
  order,
}) => {
  const [loadingClient, setLoadingClient] = useState(true);
  const t = useTranslations();
  const swiperRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [target, setTarget] = useState(0);

  const videosIds = videos?.map((v) => v.id);
  const randomVideoId = Math.floor(Math.random() * videosIds?.length);
  const randomVideo = randomVideoId
    ? videos?.[randomVideoId]?.id
    : videos?.[0]?.id;

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  useEffect(() => {
    setLoadingClient(false);
  }, [swiper]);

  const sliderNextHandler = () => {
    locale === "ar"
      ? swiperRef.current?.slideNext()
      : swiperRef.current?.slidePrev();
  };

  const sliderPrevHandler = () => {
    locale === "ar"
      ? swiperRef.current?.slidePrev()
      : swiperRef.current?.slideNext();
  };

  if (loadingClient) return <VideosSliderSkeleton order={order} />;

  return (
    <Fragment>
      {videos?.length && (
        <div
          style={{
            order: sectionSettings?.section_order,
            display: !sectionSettings?.display_home && "none !important",
          }}
          className={`my-3 px-2 container mx-auto`}
        >
          <div className="flex flex-col space-y-3">
            <div className=" w-full flex justify-between items-center">
              <SectionTitle
                title={head}
                containerClassName="!w-auto !mt-0 !mb-0"
              />
              <Link
                href={`/videos/${layout}?v=${randomVideo}`}
                className="capitalize text-sm text-primary no-underline cursor-pointer"
              >
                {t("SEE_MORE")}
              </Link>
            </div>
            <div className="w-[100%] flex items-center relative">
              <div className=" overflow-hidden">
                <Swiper
                  dir="ltr"
                  pagination={{
                    renderBullet: function (index, className) {
                      return `<span class="${className}"></span>`;
                    },
                    clickable: true,
                    bulletClass: "swiper-bullet",
                    bulletActiveClass: "swiper-bullet-active",
                    paginationClass: "flex gap-2 -bottom-8",
                  }}
                  modules={[Pagination]}
                  direction="horizontal"
                  spaceBetween={5}
                  // slidesPerView={3.1}
                  // slidesPerGroup={3}
                  breakpoints={{
                    0: { slidesPerView: 3.1, slidesPerGroup: 3 },
                    // 800: { slidesPerView: 3.7, slidesPerGroup: 3 },
                    // 1000: { slidesPerView: 5, slidesPerGroup: 5 },
                  }}
                  className="mySwiper"
                  showsPagination={true}
                >
                  {videos.slice(0, 31)?.map((review) => (
                    <SwiperSlide key={review?.id}>
                      <VideoCard review={review} layout={layout} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
