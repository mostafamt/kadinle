"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SliderNavigationBtn from "../global/SliderNavigationBtn";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { ProductSliderCard } from "./ProductSliderCard";
import Link from "next/link";

export const MoreProductsSliderFull = ({ title, category, products }) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const swiperRef = useRef(null);
  const [target, setTarget] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  const sliderNextHandler = () => {
    language?.code?.toLowerCase() === "ar"
      ? swiperRef.current?.slideNext()
      : swiperRef.current?.slidePrev();
  };

  const sliderPrevHandler = () => {
    language?.code?.toLowerCase() === "ar"
      ? swiperRef.current?.slidePrev()
      : swiperRef.current?.slideNext();
  };

  if (!products?.length) return;
  
  return (
    <div className="container ">
      <div className="flex gap-4items-center justify-between w-full">
        <h3 className="text-gray-600 text-lg capitalize">
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
          className="capitalize text-sm text-primary hover:!underline"
        >
          {t("SEE_MORE")}
        </Link>
      </div>{" "}
      <div className="relative w-full py-4">
        <div className=" relative flex flex-col space-y-3 ">
          <div className="flex items-center relative container-lrg w-[100%] carousl-section">
            {products?.length > 5 ? (
              <SliderNavigationBtn
                btnClassName="scale-90 -mt-4"
                onClick={sliderNextHandler}
              />
            ) : null}

            <div className="container w-[100%] overflow-hidden">
              {!!products?.length ? (
                <Swiper
                  dir="ltr"
                  onSwiper={setSwiper}
                  showsPagination={true}
                  direction="horizontal"
                  spaceBetween={10}
                  breakpoints={{
                    640: { slidesPerView: 2, slidesPerGroup: 2 },
                    768: { slidesPerView: 3, slidesPerGroup: 3 },
                    1024: { slidesPerView: 4, slidesPerGroup: 4 },
                    1260: { slidesPerView: 5, slidesPerGroup: 5 },
                  }}
                  onSlideChange={() => {
                    setTarget(swiperRef.current.realIndex);
                  }}
                  className="mySwiper"
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {products?.map((item) => (
                    <SwiperSlide key={item?.id}>
                      <ProductSliderCard item={item} inSimilar />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
            {products?.length > 5 ? (
              <SliderNavigationBtn
                btnClassName="scale-90 -mt-4"
                onClick={sliderPrevHandler}
                rotate
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
