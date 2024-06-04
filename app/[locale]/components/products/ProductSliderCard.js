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
const discount = "https://kadinle.com/media/images/discount.svg";

export function ProductSliderCard({ item, layout, index, inSimilar }) {
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
    <div className="h-[120px] min-w-[200px] bg-white rounded-md overflow-hidden border rtl:right-dir">
      <div className="flex">
        <div className="relative shrink-0 w-[80px]">
          <figure className="w-full h-full">
            <Image
              onClick={handelLink}
              src={item?.image}
              alt={content?.image_alt || content?.name}
              priority
              height={110}
              width={80}
              className="object-contain cursor-pointer shadow"
            />
          </figure>
        </div>
        <div className="flex-1 px-2 py-1">
          <div className="flex flex-col gap-1">
            <h3
              className="text-sm ltr:h-9 rtl:h-10 capitalize text-black overflow-hidden text-ellipsis w-full cursor-pointer hover:text-opink"
              title={content?.seo_title}
              onClick={handelLink}
            >
              {content?.name?.slice(0, 35)}
            </h3>
            <div className="flex justify-around my-1 gap-2 items-center">
              <div className="flex gap-2 items-center font-medium">
                <p className="text-sm">{getFormatPrice(price, currency)}</p>
                {item?.discount ? (
                  <del className="text-tgray text-[10px] lg:text-[12px] decoration-[#E264AD]">
                    {getFormatPrice(item?.price, currency)}
                  </del>
                ) : null}
              </div>
              <div className="flex gap-1 items-center">
                <span className="text-xs font-medium">{item?.rating?.toFixed(1)}</span>
                <StarIcon className={"h-4 w-4 fill-primary text-primary"} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <button className="text-[10px] flex-1 p-1 rounded-xl mx-auto block bg-primary text-white">
              {t("ADD_TO_CART")}
            </button>
            <div className="w-[25px] h-[25px] border-primary border rounded-full">
              {inFavorite ? (
                <button
                  className="h-6 w-6 flex items-center justify-center"
                  onClick={(e) => {
                    let itemId = item?.product_id ? item?.product_id : item?.id;
                    setInFavorite(false);
                    unlikeProduct(itemId).then(() =>
                      setRefreshFavorite((p) => !p)
                    );
                  }}
                >
                  <HeartIcon className={`h-4 w-4 text-primary fill-primary`} />
                </button>
              ) : (
                <button
                  className="h-6 w-6 flex items-center justify-center"
                  onClick={(e) => {
                    if (user?.id) {
                      let itemId = item?.product_id
                        ? item?.product_id
                        : item?.id;
                      setInFavorite(true);
                      likeProduct(itemId).then(() =>
                        setRefreshFavorite((p) => !p)
                      );
                    } else setShowAuthPopup(true);
                  }}
                >
                  <HeartIcon className={`h-4 w-4 text-primary`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
