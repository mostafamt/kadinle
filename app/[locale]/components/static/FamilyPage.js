"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { useTranslations } from "next-intl";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";
import Image from "next/image";

SwiperCore.use([Pagination, Navigation]);
const PinkLeft = "https://kadinle.com/media/images/PinkLeft.svg";
const PinkRight = "https://kadinle.com/media/images/PinkRight.svg";

// const list = [
//   {
//     title: "Exclusive_Agent",
//     description: "family_msg12",
//     image: "https://kadinle.com/media/images/Family6.svg",
//   },
//   {
//     title: "Commercial_dealer",
//     description: "family_msg13",
//     image: "https://kadinle.com/media/images/Family7.svg",
//   },
//   {
//     title: "Franchise",
//     description: "family_msg14",
//     image: "https://kadinle.com/media/images/Family8.svg",
//   },
//   {
//     title: "Authorized_distributor",
//     description: "family_msg15",
//     image: "https://kadinle.com/media/images/Family9.svg",
//   },
//   {
//     title: "Wholesaler",
//     description: "family_msg16",
//     image: "https://kadinle.com/media/images/Family10.svg",
//   },
// ];
const list = [
  {
    title: "agents",
    description: "family_msg12",
    image: "https://kadinle.com/media/images/Family6.svg",
  },
  {
    title: "our_ambassadors",
    description: "family_msg13",
    image: "https://kadinle.com/media/images/Family7.svg",
  },
  {
    title: "brokers",
    description: "family_msg14",
    image: "https://kadinle.com/media/images/Family8.svg",
  },
  {
    title: "influencers",
    description: "family_msg15",
    image: "https://kadinle.com/media/images/Family9.svg",
  },
  {
    title: "suppliers",
    description: "family_msg16",
    image: "https://kadinle.com/media/images/Family10.svg",
  },
];

const FamilyPage = () => {
  const t = useTranslations();
  const [target, setTarget] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  const swiperRef = useRef(null);
  return (
    <>
      <ScrollUpComponent />
      <StaticPageTitle title={t("kadinleFamily")} />
      <div className="flex flex-col poppins md:max-w-[575px] md:mx-auto w-full pb-10">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center ">
              <Image
                src="https://kadinle.com/media/images/Family1.svg"
                alt="family"
                className="object-contain w-full h-auto"
                height={200}
                width={400}
              />
            </div>

            <p className="self-center text-opink font-[500] mt-4">
              {t("family_msg")}
            </p>
            <p className="self-center mt-1 text-center px-4 leading-[24px]">
              {t("family_msg1")}
            </p>

            <div className="self-center mt-6">
              <Image
                src="https://kadinle.com/media/images/Family2.svg"
                alt="family 2"
                className="object-contain w-full h-auto"
                height={200}
                width={400}
              />
            </div>

            <div className="flex gap-2 mt-3 self-center">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-opink rounded-full"></div>
              </div>
              <h2 className="leading-[24px] text-black font-[500]">
                {t("Our_Vision")}
              </h2>
            </div>

            <p className="self-center mt-1 text-center px-4 leading-[24px]">
              {t("family_msg2")}
            </p>

            <div className="self-center mt-6">
              <Image
                src="https://kadinle.com/media/images/Family3.svg"
                alt="family 3"
                className="object-contain w-full h-auto"
                height={200}
                width={400}
              />
            </div>

            <div className="flex gap-2 mt-3 self-center">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-opink rounded-full"></div>
              </div>
              <h2 className="leading-[24px] text-black font-[500]">
                {t("Our_Message")}
              </h2>
            </div>

            <p className="self-center mt-1 text-center px-4 leading-[24px]">
              {t("family_msg3")}
            </p>
          </div>
        </div>

        <div className="flex justify-center bg-[#F8F8F8] mt-3 pb-4 text-[12px] text-[#707070]">
          <div className="flex flex-col w-[95%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src="https://kadinle.com/media/images/Family4.svg"
                alt="family 4"
                className="object-contain w-full h-auto"
                height={200}
                width={400}
              />
            </div>

            <div className="flex gap-2 mt-3 self-center">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-opink rounded-full"></div>
              </div>
              <h2 className="leading-[24px] text-black font-[500]">
                {t("Our_Values")}
              </h2>
            </div>

            <p className="px-2 mt-1">- {t("family_msg4")}</p>
            <p className="px-2">- {t("family_msg5")}</p>
            <p className="px-2">- {t("family_msg6")}</p>
            <p className="px-2">- {t("family_msg7")}</p>
            <p className="px-2">- {t("family_msg8")}</p>
            <p className="px-2">- {t("family_msg9")}</p>
          </div>
        </div>

        <div className="flex justify-center mt-3  text-[12px] text-[#707070]">
          <div className="flex flex-col w-[95%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src="https://kadinle.com/media/images/Family5.svg"
                alt="family 5"
                className="object-contain w-full h-auto"
                height={200}
                width={400}
              />
            </div>

            <div className="flex gap-2 mt-3 self-center">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-opink rounded-full"></div>
              </div>
              <h2 className="leading-[24px] text-black font-[500]">
                {t("who_family")}
              </h2>
            </div>

            <p className="self-center mt-1 text-center px-2 leading-[24px]">
              {t("family_msg10")}
            </p>
            <p className="self-center mt-1 text-center px-2 leading-[24px]">
              {t("family_msg11")}
            </p>
            <div className="flex gap-2 mt-10 self-center mb-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-opink rounded-full"></div>
              </div>
              <h2 className="leading-[24px] text-black font-[500]">
                {t("Our_Partners")}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-[12px] text-[#707070] relative">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="z-[1000] top-[48px] -translate-y-1/2 ltr:left-[10%] rtl:right-[10%] ltr:md:-left-2 rtl:md:-right-2  absolute"
          >
            <Image
              src={PinkLeft}
              alt="prev"
              className="object-contain h-6 w-6 rtl:rotate-180"
              height={25}
              width={25}
            />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="z-[1000] top-[48px] -translate-y-1/2 ltr:right-[10%] rtl:left-[10%] ltr:md:-right-2 rtl:md:-left-2 absolute"
          >
            <Image
              src={PinkRight}
              alt="next"
              className="object-contain h-6 w-6 rtl:rotate-180"
              height={25}
              width={25}
            />
          </button>

          <div className="w-[95%] max-w-[500px]">
            <Swiper
              dir="ltr"
              onSwiper={setSwiper}
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
              spaceBetween={25}
              // slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
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
              {list?.map((item) => (
                <SwiperSlide key={item?.title}>
                  <div className="flex flex-col items-center">
                    <Image
                      src="https://kadinle.com/media/images/Family6.svg"
                      alt={t(item?.title)}
                      className="w-[80px] h-auto object-contain"
                      height={80}
                      width={80}
                    />
                    <h3 className="text-black font-[500] mt-3">
                      {t(item?.title)}
                    </h3>
                    <p className="text-center mt-3 max-w-[250px]">{t(item?.description)}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyPage;
