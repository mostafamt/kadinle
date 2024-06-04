'use client';

import { getSimilarProducts } from "@/app/api/supabase/products";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SliderNavigationBtn from "../global/SliderNavigationBtn";
import ProductCard from "../cards/ProductCard";

const SimilarProductsFull = ({ sku, locale }) => {
  const t = useTranslations()
  const swiperRef = useRef(null);
  const [target, setTarget] = useState(0);
  const [products, setProducts] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(15);
  const [preventLoadMore, setPreventLoadMore] = useState(false);

  useEffect(() => {
    setProducts([]);
    loadMoreData();
  }, [sku]);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  const loadMoreData = async (moreCount = 0) => {
    if (preventLoadMore) return;

    setEnd((prev) => prev + moreCount);
    setStart((prev) => prev + moreCount);
    getSimilarProducts(sku, start + moreCount, end + moreCount).then((res) => {
      if (res && res?.data) {
        setProducts((prev) => {
          return [...res?.data, ...prev];
        });
      } else {
        setPreventLoadMore(true);
      }
    });
  };

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

  return (
    <div className="container border-t border-t-[#AEAEAE] px-5 pt-5 mt-14 mb-5">
      <h3 className="font-bold text-[26px] mb-2">
        {t("Similar_Products")}
      </h3>
      <div className="relative w-full py-4">
        <div className=" relative flex flex-col space-y-3 ">
          <div className="flex items-center relative container-lrg w-[100%] carousl-section">
            {products?.length > 5 ? (
              <SliderNavigationBtn onClick={sliderNextHandler} />
            ) : null}

            <div className="container w-[100%] overflow-hidden">
              {!!products?.length ? (
                <Swiper
                  dir="ltr"
                  onSwiper={setSwiper}
                  // modules={[Pagination]}
                  // pagination={{
                  //   renderBullet: function (index, className) {
                  //     return `<span className="${className}"></span>`;
                  //   },
                  //   clickable: true,
                  //   bulletClass: "swiper-bullet",
                  //   bulletActiveClass: "swiper-bullet-active",
                  // }}
                  showsPagination={true}
                  direction="horizontal"
                  spaceBetween={10}
                  slidesPerView={5}
                  slidesPerGroup={5}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                  onSlideChange={() => {
                    setTarget(swiperRef.current.realIndex);
                  }}
                  onReachEnd={() => {
                    if (preventLoadMore) return;
                    loadMoreData(20);
                  }}
                  className="mySwiper"
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {products?.map((item) => (
                    <SwiperSlide key={item?.id}>
                      <ProductCard item={item} inSimilar />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
            {products?.length > 5 ? (
              <SliderNavigationBtn onClick={sliderPrevHandler} rotate />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductsFull;
