"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ShareProduct from "./ShareProduct";

import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeartIcon from "../Icons/HeartIcon";
import { unlikeProduct, likeProduct } from "./../../../api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";

SwiperCore.use([Pagination, Navigation]);

const discount = "https://kadinle.com/media/images/discount.svg";
// const Heart = "https://kadinle.com/media/images/like.svg";
// const Heart2 = "https://kadinle.com/media/images/liked.svg";
// const likeLine = "https://kadinle.com/media/images/likeLine.png";
const shareIcon = "https://kadinle.com/media/images/shareIcon.png";

const ProductSlider = ({
  product,
  productId,
  filterImages,
  productImagesPatternSku,
  selectedPatternSku,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const [swiper, setSwiper] = useState(null);
  const [target, setTarget] = useState(0);
  const [isFavoriteProduct, setIsFavoriteProduct] = useState();
  const { favoritesList, setRefreshFavorite, setShowShare, user } =
    useGlobalOptions();
  const swiperRef = useRef(null);

  const filteredImagesWithPatternSku =
    productImagesPatternSku?.[selectedPatternSku] || filterImages || [];

  const sortedImages =
    filteredImagesWithPatternSku?.sort((a, b) => {
      const aDotIndex = a?.image?.lastIndexOf(".");
      const bDotIndex = b?.image?.lastIndexOf(".");

      const aNumber = a?.image?.[aDotIndex - 1];
      const bNumber = b?.image?.[bDotIndex - 1];

      return aNumber - bNumber;
    }) || [];

  useEffect(() => {
    setTarget(0);
  }, [filterImages]);

  useEffect(() => {
    if (favoritesList?.[productId]) {
      setIsFavoriteProduct(true);
    } else {
      setIsFavoriteProduct(false);
    }
  }, [favoritesList, productId]);

  const toggleFavorite = () => {
    if (!user?.id) router?.push("/login");
    if (isFavoriteProduct) {
      unlikeProduct(productId).then(() => {
        setRefreshFavorite((p) => !p);
      });
    } else {
      likeProduct(productId).then(() => {
        setRefreshFavorite((p) => !p);
      });
    }
  };

  useEffect(() => {
    if (swiper !== null) {
      swiper.slideTo(target);
    }
  }, [target]);

  return (
    <div className=" overflow-hidden relative ">
      <ShareProduct />
      <div className="min-h-[450px]">
        <Swiper
          dir="ltr"
          onSwiper={setSwiper}
          modules={[Pagination, Navigation]}
          direction="horizontal"
          // spaceBetween={10}
          slidesPerView={1}
          onSlideChange={() => {
            setTarget(swiperRef?.current?.realIndex);
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          showsPagination={true}
          pagination={{
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
            clickable: true,
            bulletClass: "swiper-bullet",
            bulletActiveClass: "swiper-bullet-active",
          }}
          className="mySwiper single-product-swiper min-h-[inherit]"
        >
          {sortedImages?.map((img) => (
            <SwiperSlide key={img?.image}>
              <Image
                key={img.image}
                className=" w-full productImage object-cover !h-full  min-h-[inherit] bg-gray-100"
                src={img?.image}
                alt="product img"
                height={600}
                width={400}
              />{" "}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {product?.discount ? (
        <div className="absolute top-4 ltr:left-6 rtl:right-6 w-[42px]  z-[500]">
          <Image
            className="w-full"
            src={discount}
            alt="discount"
            width={40}
            height={50}
          />
          <div className="absolute montserrat flex flex-col items-center top-[60%] left-[53%] rotate-[340deg] -translate-x-1/2  -translate-y-[50%] text-[8px] text-white">
            <p className="m-0 leading-[3px]">{product?.discount}</p>
            <p>{t("off")}</p>
          </div>
        </div>
      ) : null}

      <div className="absolute top-4 ltr:right-6 rtl:left-6 z-30">
        <div className="flex justify-center items-center flex-col gap-4">
          <button
            className="flex gap-2 items-center h-8 w-8  bg-white rounded-full  justify-center"
            onClick={() => {
              toggleFavorite();
              isFavoriteProduct
                ? setIsFavoriteProduct(false)
                : setIsFavoriteProduct(true);
            }}
          >
            {isFavoriteProduct ? (
              <HeartIcon className="w-6 h-6 text-primary fill-primary" />
            ) : (
              <HeartIcon className="w-6 h-6 text-primary" />
            )}
          </button>
          <button className="" onClick={(e) => setShowShare(true)}>
            <Image
              className="w-[20px]"
              src={shareIcon}
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
