"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getFormatPrice } from "@/app/api/lib/functions";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import HeartIcon from "../Icons/HeartIcon";
import Image from "next/image";
import { unlikeProduct, likeProduct } from "./../../../api/supabase/user";
import { useRouter } from "next/navigation";
import FlashIcon from "../Icons/FlashIcon";
import { StarIcon } from "../Icons/StarIcon";

const discount = "https://kadinle.com/media/images/discount.svg";

const cutText = (string, small) =>
  string?.length > 30
    ? small
      ? string.slice(0, 20) + "..."
      : string.slice(0, 40) + "..."
    : string;

const ProductCard = ({
  item,
  isTwo,
  small,
  isOneView,
  inFavoriteLayout,
  layout,
  index,
  inSimilar,
}) => {
  const t = useTranslations();
  const { flashProducts } = useGlobalOptions();
  const router = useRouter();
  const { language, currency, user, favoritesList, setRefreshFavorite } =
    useGlobalOptions();
  const [inFavorite, setInFavorite] = useState(false);

  let price = useMemo(() => {
    return item?.discount
      ? item?.price - (item?.discount / 100) * item?.price
      : item?.price;
  }, [item?.discount, item?.price]);

  const content = item?.content?.find((i) => i?.language_id === language?.id);

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

  return (
    <div
      className={`relative flex flex-col border min-h-[200px] border-[#E264AD] ${
        small ? "px-[5px] py-[5px]" : "p-[5px]"
      }  rounded-[10px] w-full max-w-full overflow-hidden ${
        small
          ? "max-w-[115px] h-[195px] min-h-[auto]"
          : inFavoriteLayout
          ? ""
          : ""
      } ${isOneView ? "" : ""}`}
    >
      {flashProducts?.[item?.id] ? (
        <div className="bg-primary absolute z-[10] top-0 flex items-center flex-col rounded-b w-6 pb-[2px] ltr:left-[6px] rtl:right-[6px]">
          <FlashIcon className="scale-75" />
          <span className="text-white text-[9px]">{item?.discount}</span>
        </div>
      ) : item?.discount ? (
        <div className="absolute top-[2%] w-[32px] ltr:left-[1%] rtl:right-[1%] z-40">
          <Image
            className="w-full "
            src={discount}
            alt="discount"
            height={70}
            width={40}
          />
          <div className="absolute montserrat flex flex-col items-center top-[60%] ltr:left-[53%] rtl:right-1 rotate-[340deg] -translate-x-1/2  -translate-y-[50%] text-[6px] text-white">
            <p className="m-0 leading-[3px]">{item?.discount}%</p>
            <p>{t("off")}</p>
          </div>
        </div>
      ) : null}

      <div className="relative w-full">
        <div
          className={`  ${isOneView ? "" : ""} ${
            inFavoriteLayout ? "" : ""
          } overflow-hidden`}
          onClick={handelLink}
        >
          <Image
            className={`!w-full !h-auto cursor-pointer ${
              small ? "min-h-[150px] object-cover" : "min-h-[200px]"
            }  rounded-t-[5px] max-h-full ${inFavoriteLayout ? "" : ""}`}
            src={item?.image}
            alt={content?.image_alt}
            height={150}
            width={200}
          />
          {layout === "rated" ? (
            <div className="absolute bottom-2 left-2">
              <StarIcon className="h-10 w-10 text-primary fill-primary" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-white font-medium">
                {index ? index : null}
              </span>
            </div>
          ) : null}
        </div>
        <div className="absolute top-[4%] w-[20px] h-[20px] ltr:right-[5%] rtl:left-[5%]">
          {inFavorite || inFavoriteLayout ? (
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
                } else router?.push("/login");
              }}
            >
              <HeartIcon className={`h-4 w-4 text-primary`} />
            </button>
          )}
        </div>
      </div>

      <div
        className="flex justify-between items-center  gap-2
      "
      >
        <div className={`gap-[1px] w-full ${small ? "h-[25px]" : "h-[50px]"}`}>
          <h3
            className={`${
              small || inSimilar ? "!mt-[2px] text-xs" : "text-md"
            } text-black overflow-hidden cursor-pointer whitespace-nowrap text-ellipsis w-full ${
              inSimilar ? "rtl:right-dir" : ""
            }`}
            onClick={handelLink}
          >
            {cutText(content?.name, small)}
          </h3>
          <div
            className={`flex justify-between w-full gap-1 ${
              small ? "rtl:flex-row-reverse" : ""
            }`}
          >
            <div className="flex gap-1 items-center">
              <span
                className={`${
                  small ? "text-[9px]" : "text-sm"
                } px-1 font-medium flex whitespace-nowrap`}
              >
                {getFormatPrice(price, currency)}
              </span>
              {item?.discount ? (
                <del
                  className={`text-tgray ${
                    small ? "text-[7px]" : "text-[9px]"
                  }  lg:text-[12px] decoration-[#E264AD]`}
                >
                  {getFormatPrice(item?.price, currency)}
                </del>
              ) : null}
            </div>
            <div
              className={`flex px-2 gap-[2px] items-center scale-90 text-white !justify-center ${
                isTwo ? "px-2 gap-[1px]" : "px-1"
              } ${
                !inSimilar ? "py-1 px-1" : "!px-[3px]"
              } bg-primary rounded-[3px] justify-between`}
            >
              <StarIcon className={"h-4 w-4 text-pink-100 fill-pink-100"} />
              <span
                className={`${
                  small || inSimilar ? "text-[8px]" : "text-xs"
                } font-semibold text-center`}
              >
                {item?.rating?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
