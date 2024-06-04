"use client";
import { ReviewCard } from "./ReviewCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionTitle } from "../global/SectionTitle";

SwiperCore.use([Pagination, Navigation]);

const Curve2 = "https://kadinle.com/media/images/Curve2.svg";

const ReviewsMob = ({ reviews, sectionSettings }) => {
  const t = useTranslations();
  return (
    <div
      id="reviews"
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
      className="relative w-full mb-8  flex flex-col items-center justify-center overflow-y-visible"
    >
      <SectionTitle
        title={t("customersReviews")}
        containerClassName="!justify-start !items-start !mb-8 !px-4"
      />

      <div className={`absolute block h-60 top-28  w-full overflow-hidden`}>
        <Image
          src={Curve2}
          alt="carve"
          height={300}
          width={500}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="w-[65%] xs:max-w-[400px]">
          <Swiper
            loop
            dir="ltr"
            autoplay={true}
            // onReachEnd={() => setForward((p) => !p)}
            modules={[Pagination, Navigation]}
            pagination={{
              renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
              },
              clickable: true,
              bulletClass: "swiper-bullet",
              bulletActiveClass: "swiper-bullet-active",
            }}
            direction="horizontal"
            spaceBetween={10}
            slidesPerView={1}
            className="testimonail"
            showsPagination={true}
          >
            {reviews?.map((review, index) => (
              <SwiperSlide key={index} className="w-full">
                <ReviewCard review={review} small={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewsMob;
