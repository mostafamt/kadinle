"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { useTranslations } from "next-intl";
import { ProductSliderCard } from "./ProductSliderCard";
import Link from "next/link";

SwiperCore.use([Pagination, Navigation]);

export const MoreProductsSlider = ({ title, category, products }) => {
  const t = useTranslations();
  const [swiper, setSwiper] = useState(null);
  const [target, setTarget] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  if (!products?.length) return;

  return (
    <div className="container ">
      <div className="flex gap-4 text-sm mb-4 items-center justify-between w-full">
        <h3 className="capitalize">
          {title} {t("from_category")}
          <Link
            className="text-primary px-1 hover:underline"
            href={`/categories/${category?.category_id}`}
          >
            {category?.title}
          </Link>
        </h3>
        <Link
          href={`/categories/${category?.category_id}`}
          className="capitalize text-sm text-primary hover:!underline cursor-pointer"
        >
          {t("SEE_MORE")}
        </Link>
      </div>

      <div className="relative w-full pb-4">
        {!!products?.length && (
          <div className="flex flex-col">
            <div>
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
                onSwiper={setSwiper}
                direction="horizontal"
                spaceBetween={5}
                breakpoints={{
                  0: { slidesPerView: 1.6, slidesPerGroup: 1.5 },
                }}
                className="mySwiper"
                onSlideChange={() => {
                  setTarget(swiperRef.current.realIndex);
                }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {products?.map((item) => (
                  <SwiperSlide key={item?.id}>
                    <ProductSliderCard
                      small
                      item={item}
                      key={item?.id}
                      inSimilar
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
