"use client";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import FlashIcon from "../Icons/FlashIcon";
import Image from "next/image";
import HeartIcon from "../Icons/HeartIcon";
import { likeProduct, unlikeProduct } from "@/app/api/supabase/user";
import { StarIcon } from "../Icons/StarIcon";
import { getFormatPrice } from "@/app/api/lib/functions";
import ProductCardSwiper from "../products/ProductCardSwiper";
import ProductSize from "../products/ProductSize";
import ProductCardSize from "../products/ProductCardSize";
const discount = "https://kadinle.com/media/images/discount.svg";
const like = "https://kadinle.com/media/images/like.svg";
const liked = "https://kadinle.com/media/images/liked.svg";
const star = "https://kadinle.com/media/images/star.svg";

function ProductCard({
  item,
  layout,
  index,
  inSimilar,
  regions,
  selectedRegion,
  setSelectedRegion,
  availableSizes,
  setSize,
  size,
  modelSize,
  setOpenSizeInfo,
  productChart,
  CACHE_SIZES,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const {
    flashProducts,
    language,
    currency,
    setShowAuthPopup,
    user,
    favoritesList,
    setRefreshFavorite,
  } = useGlobalOptions();
  const t = useTranslations();
  const [inFavorite, setInFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (favoritesList?.[item?.product_id ? item?.product_id : item?.id]) {
      setInFavorite(true);
    } else {
      setInFavorite(false);
    }
  }, [favoritesList, item?.id, item?.product_id]);

  const handelLink = () => {
    router?.push(
      `/product/${item?.product_sku ? item?.product_sku : item?.sku}`
    );
  };

  const content = item?.content?.find((i) => i?.language_id === language?.id);

  let price = useMemo(() => {
    return item?.discount
      ? item?.price - (item?.discount / 100) * item?.price
      : item?.price;
  }, [item?.discount, item?.price]);

  return (
    <div className="relative flex flex-col border min-h-[200px] bg-owhite border-opink p-2 md:p-2 rounded-lg">
      {flashProducts?.[item?.id] ? (
        <div className="bg-opink absolute z-[10] top-0 flex items-center flex-col rounded-b w-10 py-1 ltr:left-2 rtl:right-2">
          <FlashIcon />
          <span className="text-white text-[13px]">{item?.discount}</span>
        </div>
      ) : item?.discount ? (
        <div className="absolute top-[10px] w-[50px] ltr:left-2 rtl:right-2 z-[500]">
          <Image
            className="w-full object-contain"
            src={discount}
            alt="discount"
            height={50}
            width={50}
          />
          <div className="absolute font-semibold leading-3 montserrat flex flex-col items-center top-[60%] ltr:left-[55%] rtl:right-4 rotate-[340deg] -translate-x-1/2  -translate-y-[50%] text-[8px] text-white">
            <p className="m-0 leading-[3px]">{item?.discount}%</p>
            <p>{t("off")}</p>
          </div>
        </div>
      ) : null}
      <div
        className={`relative overflow-hidden h-full ${
          layout === "category" ? "md:min-h-[300px] min-h-[400px]" : ""
        }`}
      >
        <Image
          onClick={handelLink}
          src={item?.image ? item?.image : ""}
          alt={content?.image_alt || content?.name}
          priority
          height={300}
          width={200}
          className="object-cover cursor-pointer rounded-t-lg w-full min-h-[80%]"
        />
        {/* <ProductCardSwiper item={item}/> */}
        <div className="absolute top-[4%] w-[25px]  h-[25px] rtl:left-[5%] ltr:right-[5%] lg:m-3">
          {inFavorite ? (
            <button
              className="h-6 w-6 bg-white pt-[2px] rounded-full flex items-center justify-center"
              onClick={(e) => {
                let itemId = item?.product_id ? item?.product_id : item?.id;
                setInFavorite(false);
                unlikeProduct(itemId).then(() => setRefreshFavorite((p) => !p));
              }}
            >
              <HeartIcon className={`h-4 w-4 text-primary fill-primary`} />
            </button>
          ) : (
            <button
              className="h-6 w-6 bg-white pt-[2px] rounded-full flex items-center justify-center"
              onClick={(e) => {
                if (user?.id) {
                  let itemId = item?.product_id ? item?.product_id : item?.id;
                  setInFavorite(true);
                  likeProduct(itemId).then(() => setRefreshFavorite((p) => !p));
                } else setShowAuthPopup(true);
              }}
            >
              <HeartIcon className={`h-4 w-4 text-primary`} />
            </button>
          )}
        </div>
        {layout === "rated" ? (
          <div className="absolute bottom-2 left-2">
            <StarIcon className="h-10 w-10 text-opink fill-opink" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white font-medium">
              {index ? index : null}
            </span>
          </div>
        ) : null}
      </div>
      <div
        className={`flex justify-between items-center  gap-2 mt-2 ${
          inSimilar ? "rtl:right-dir" : ""
        }`}
      >
        <div className="flex flex-col w-full gap-1">
          <h3
            className="text-[12px] lg:text-[14px] capitalize text-black overflow-hidden  whitespace-nowrap text-ellipsis w-full cursor-pointer hover:text-opink"
            title={content?.seo_title}
            onClick={handelLink}
          >
            {content?.name}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-[12px] lg:text-[14px] font-medium">
                {getFormatPrice(price, currency)}
              </p>
              {item?.discount ? (
                <del className="text-tgray text-[10px] lg:text-[12px] decoration-[#E264AD]">
                  {getFormatPrice(item?.price, currency)}
                </del>
              ) : null}
            </div>
            <div className="flex gap-1 text-white items-center px-1 lg:px-2 py-1 bg-opink rounded-md justify-center">
              <StarIcon
                className={"h-4 w-4 shrink-0 fill-white text-pink-100"}
              />
              <span className="text-xs font-semibold">
                {item?.rating?.toFixed(1)}
              </span>
            </div>
          </div>
          {/* <button
            className="flex item-center justify-start"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Image
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/E264AD/shopping-cart--v1.png"
              alt="shopping-cart--v1"
            />
            <span className="text-[10px] pt-1">{t("ADD_TO_CART")}</span>
          </button> */}
          {/* {showDetails && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col justify-center items-center p-4">
              <ProductCardSize
                regions={regions}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                availableSizes={availableSizes}
                setSize={setSize}
                size={size}
                modelSize={modelSize}
                setOpenSizeInfo={setOpenSizeInfo}
                productChart={productChart}
                CACHE_SIZES={CACHE_SIZES}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
