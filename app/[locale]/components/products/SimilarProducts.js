"use client";
import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";

import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import ProductsSliderSkeleton from "../skeletons/ProductsSliderSkeleton";
import { getSimilarProducts } from "@/app/api/supabase/products";

SwiperCore.use([Pagination, Navigation]);

const SimilarProducts = ({ sku }) => {
  const [swiper, setSwiper] = useState(null);
  const [target, setTarget] = useState(0);
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(14);
  const [preventLoadMore, setPreventLoadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  useEffect(() => {
    setProducts([]);
    loadMoreData();
  }, [sku]);

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
    setLoading(false);
  };

  return (
    <Fragment>
      {loading ? (
        <ProductsSliderSkeleton />
      ) : (
        <>
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
                  onReachEnd={() => {
                    if (preventLoadMore) return;
                    loadMoreData(20);
                  }}
                  modules={[Pagination]}
                  onSwiper={setSwiper}
                  direction="horizontal"
                  spaceBetween={5}
                  slidesPerView={3.1}
                  slidesPerGroup={3}
                  breakpoints={{
                    0: { slidesPerView: 2.3 },
                    300: { slidesPerView: 3.2 },

                    // 500: { slidesPerView: 4.5 },
                    // 600: { slidesPerView: 5 },
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
                      <ProductCard small item={item} key={item?.id} inSimilar />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default SimilarProducts;
