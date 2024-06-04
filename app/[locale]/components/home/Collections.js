"use client";
// import SliderNavigationBtn from "./SliderNavigationBtn";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";
import { CollectionCard } from "./CollectionCard";
import { useTranslations } from "next-intl";
import { SectionTitle } from "../global/SectionTitle";
import { CollectionsSkeleton } from "../skeletons/CollectionsSkeleton";

SwiperCore.use([Pagination, Navigation]);

const Collections = ({ collections: collectionsData, locale, languageId }) => {
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swipeNum, setSwipeNum] = useState("");

  const t = useTranslations();
  const swiperRef = useRef(null);

  useEffect(() => {
    setCollections(collectionsData);
    const updateDataBasedOnWidth = () => {
      if (window.innerWidth <= 991) {
        setSwipeNum(1.1);
      } else {
        setSwipeNum(3.5);
      }
    };

    updateDataBasedOnWidth();

    window.addEventListener('resize', updateDataBasedOnWidth);

  }, []);

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

  if (!collections) {
    return <CollectionsSkeleton />;
  }


  return (
    <>
      {collections?.length ? (
        <div className="mb-3 container mx-auto">
          <div className="flex items-center relative w-[100%]">
            <div className=" w-[100%] overflow-hidden">
              <Swiper
                dir="ltr"
                modules={[Pagination]}
                pagination={{
                  renderBullet: function (index, className) {
                    return `<span class="${className}"></span>`;
                  },
                  clickable: true,
                  bulletClass: "swiper-bullet",
                  bulletActiveClass: "swiper-bullet-active",
                  paginationClass: "flex gap-2 -bottom-8",
                }}
                direction="horizontal"
                spaceBetween={10}
                slidesPerView={swipeNum}
                className="mySwiper"
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                showsPagination={true}
              >
                {collections?.map((collection) => {
                  let collectionContent = collection?.collection_content?.find(
                    (content) => content?.language_id === languageId
                  );
                  if (collectionContent) {
                    return (
                      <SwiperSlide key={collection?.id}>
                        <CollectionCard t={t} collection={collectionContent} />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Collections;
