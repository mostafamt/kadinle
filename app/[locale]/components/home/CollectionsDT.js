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

SwiperCore.use([Pagination, Navigation]);

const CollectionsDT = ({
  collections: collectionsData,
  locale,
  languageId,
  seeMore,
}) => {
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();
  const swiperRef = useRef(null);

  useEffect(() => {
    setCollections(collectionsData);
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
    return (
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
          <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
          <div className="animate-pulse h-[150px] bg-gray-100 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <>
      {collections?.length ? (
        <div className="my-8">
          <div className="flex items-center relative container-lrg w-[100%]">
            {collections?.length > 3 ? (
              <button onClick={sliderNextHandler}>
                <PrimaryArrowIcon arrowClassName="rtl:!-rotate-90 ltr:!rotate-90" />
              </button>
            ) : null}
            <div className="container w-[100%] overflow-hidden">
              <Swiper
                dir="ltr"
                modules={[Pagination]}
                pagination={{
                  renderBullet: function (index, className) {
                    return `<span className="${className}"></span>`;
                  },
                  clickable: true,
                  bulletClass: "swiper-bullet",
                  bulletActiveClass: "swiper-bullet-active",
                  paginationClass: "flex gap-2 -bottom-8",
                }}
                direction="horizontal"
                spaceBetween={25}
                slidesPerGroup={3}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="mySwiper"
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                showsPagination={true}
              >
                {collections?.map((collection, index) => {
                  let collectionContent = collection?.collection_content?.find(
                    (content) => content?.language_id === languageId
                  );
                  return (
                    <SwiperSlide key={collection?.id || index}>
                      <CollectionCard
                        seeMore={seeMore}
                        collection={collectionContent}
                      />
                    </SwiperSlide>
                  );
                  // if (collectionContent) {
                  // }
                })}
              </Swiper>
            </div>
            {collections?.length > 3 ? (
              <button onClick={sliderPrevHandler} className="">
                <PrimaryArrowIcon />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CollectionsDT;
