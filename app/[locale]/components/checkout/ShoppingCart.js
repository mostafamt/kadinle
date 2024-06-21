"use client";

import { getFormatPrice } from "@/app/api/lib/functions";
import { applyCoupon } from "@/app/api/supabase/products";
import {
  getStockCount,
  listUserOrders,
  updateUser_cart,
} from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartSendGift } from "./CartSendGift";
import CloseIcon from "../Icons/CloseIcon";
import Link from "next/link";

const cancel = "https://kadinle.com/media/images/cancel.svg";
const send = "https://kadinle.com/media/images/send.svg";

const CACHE_STOCK = {};

const ShoppingCart = ({
  points,
  setPoints,
  setSelectedPoint,
  updateCart,
  setUpdateCart,
  setRefresh,
  removeItemFromCart,
  cart,
  total,
  setTotal,
  setStage,
  setCouponId,
  setDiscount,
  CACHE_CART_STOCKS,
}) => {
  const t = useTranslations();
  const { language, currency } = useGlobalOptions();
  const [point, setPoint] = useState(0);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [userOrder, setUserOrder] = useState(0);

  const regionId = currency?.region_id;

  useEffect(() => {
    listUserOrders().then((res) => {
      setUserOrder(res?.data);
    });
  }, []);

  const checkStock = (variant_id) => {
    if (!Object.keys(CACHE_STOCK).includes(variant_id)) {
      getStockCount(variant_id).then((res) => {
        let stock = res?.data?.[0];
        CACHE_STOCK[stock?.variant_id] = stock?.stock;
      });
    }
    return CACHE_STOCK[variant_id];
  };

  const increaseQuantity = (variant_id, quantity) => {
    let stock = checkStock(variant_id);
    if (quantity < stock) {
      setUpdateCart(true);
      updateUser_cart(variant_id, quantity + 1).then((res) => {
        setRefresh((p) => !p);
        setUpdateCart(false);
      });
    }
  };
  const decreaseQuantity = (variant_id, quantity) => {
    if (quantity > 1) {
      setUpdateCart(true);
      updateUser_cart(variant_id, quantity - 1).then((res) => {
        setRefresh((p) => !p);
        setUpdateCart(false);
      });
    }
  };
  const handlePoint = () => {
    if (points < 1000) {
      setError(t("points_error_msg_1"));
      return;
    }
    if (point > points) {
      setError(t("points_error_msg_2"));
      return;
    }

    if (!userOrder?.length) {
      setError(t("points_error_msg_3"));
      return;
    }

    let calcPoint = point / 100;
    if (calcPoint > total / 3) {
      setError(t("points_error_msg_4"));
      return;
    }

    setSelectedPoint((prev) => prev + point);
    setPoints((prev) => prev - point);

    setMsg(
      `${t("You_use")} ${point} ${t("to_got_discount")} ${getFormatPrice(
        calcPoint,
        currency
      )}`
    );

    setTotal((prev) => {
      return prev - calcPoint;
    });
  };
  const handleCode = () => {
    applyCoupon(code).then((res) => {
      if (res?.error) {
        setError(res?.error);
        setMsg("");
      } else {
        setError("");
        setMsg(
          `${t("points_success_msg_1")} ${res?.value} ${
            res?.percentage ? "%" : ""
          } ${t("discount")}`
        );
        setCouponId(code);
        setDiscount(res?.value);
        if (res?.percentage) {
          let calcTotal = total - (res?.value / 100) * total;
          setTotal(calcTotal);
        } else {
          setTotal((prev) => {
            return prev - res?.value;
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col rounded-b-[20px] rounded-t-[20px] Shadow ">
      <div className="flex bg-opink text-owhite rounded-t-[20px] py-4 text-[14px] 2xl:text-[16px] px-[20px]">
        <div className="w-[85px] invisible"></div>
        <div className="w-[calc(30%-85px)]">
          <h3>{t("Product")}</h3>
        </div>
        <div className="w-[17%] flex justify-center">
          <h3>{t("Color")}</h3>
        </div>
        <div className="w-[17%] flex justify-center">
          <h3>{t("Size")}</h3>
        </div>
        <div className="w-[17%] flex justify-center">
          <h3>{t("Amount")}</h3>
        </div>
        <div className="w-[17%] flex justify-center">
          <h3>{t("Price")}</h3>
        </div>
      </div>

      <div className="flex flex-col  px-[20px] ">
        {cart?.map((item, index) => {
          let content = item?.content?.find(
            (c) => c.language_id === language?.id
          );

          let color = item?.color_content?.find(
            (c) => c.language_id === language?.id
          );

          let size = item?.size_content?.find((c) => c.region_id === regionId);

          const maxCount = CACHE_CART_STOCKS?.[item?.id] === item?.quantity;

          return (
            <div
              key={index}
              className="flex items-center py-4 text-[14px] 2xl:text-[17px] border-b"
            >
              <div className="w-[85px] h-[60px]">
                <Image
                  className="w-[60px] h-[60px] object-cover rounded-full"
                  src={item?.image}
                  alt="img"
                  height={60}
                  width={60}
                />
              </div>
              <div className="w-[calc(30%-85px)]">
                <div className="flex flex-col space-y-[1px]">
                  <h4 className="text-[13px] 2xl:text-[16px]">
                    {content.name}
                  </h4>
                  <p className="text-[11px] text-sm text-[#C4C4C4] ">
                    {item?.product_details?.product_sku}
                  </p>
                </div>
              </div>
              <div className="w-[17%] flex justify-center">
                <h4>{color?.name}</h4>
              </div>
              <div className="w-[17%] flex justify-center">
                <h4>{size?.name}</h4>
              </div>
              <div className="w-[17%] flex justify-center">
                {CACHE_CART_STOCKS?.[item?.id] < 1 ? (
                  <p className="text-red-500 text-xs bg-red-100 py-[2px] rounded-md px-4 mb-[8px]">
                    {t("out_stock")}
                  </p>
                ) : (
                  <div className="flex flex-col gap-1">
                    {maxCount ? (
                      <p className="text-red-500 text-xs bg-red-100 py-[2px] rounded-md px-4 mb-[8px]">
                        {t("reach_max_count")}
                      </p>
                    ) : null}
                    <div className="rounded-full w-[100px] py-2 border border-[#D8D8D8] flex justify-center gap-4 ">
                      <button
                        disabled={updateCart || item?.quantity === 1}
                        onClick={() =>
                          decreaseQuantity(item?.id, item?.quantity)
                        }
                        className={`cursor-pointer disabled:text-[#D8D8D8] text-[#00ADC9] `}
                      >
                        -
                      </button>
                      <h4>{item?.quantity}</h4>
                      <button
                        disabled={updateCart || maxCount}
                        onClick={() =>
                          increaseQuantity(item?.id, item?.quantity)
                        }
                        className="cursor-pointer disabled:text-[#D8D8D8] text-[#00ADC9]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-[17%] flex justify-center">
                <p className="flex whitespace-nowrap">
                  {getFormatPrice(item?.price * item?.quantity, currency)}
                </p>
              </div>

              <div className="cursor-pointer">
                <button onClick={() => removeItemFromCart(item?.id)}>
                  <Image
                    className="w-[10px] 2xl:text-[13px]"
                    src={cancel}
                    alt="cancel"
                    height={10}
                    width={10}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <CartSendGift />

      {error ? (
        <p className=" bg-red-100 text-red-500 p-1 rounded-md text-center flex justify-center items-center w-full mx-auto max-w-[500px] px-2 my-4 ">
          {error}{" "}
          <button onClick={() => setError("")} className="ml-auto ">
            <CloseIcon />
          </button>{" "}
        </p>
      ) : null}
      {msg ? (
        <p className=" bg-green-100 text-green-500 p-1 rounded-md text-center flex justify-between items-center w-full mx-auto max-w-[500px] px-2 my-4 ">
          {msg}{" "}
          <button onClick={() => setMsg("")} className="ltr:ml-auto rtl:mr-auto ">
            <CloseIcon className="w-4 h-4" />
          </button>{" "}
        </p>
      ) : null}
      <div className="flex justify-between flex-wrap gap-4 items-end mt-4 mb-10 px-[20px]">
        <div className="flex gap-4 items-end flex-1">
          <div className="flex flex-col">
            <span className="flex gap-1 text-sm px-1 items-center whitespace-nowrap mb-2">
              {t("available_points")}{" "}
              <span className="bg-primary text-xs p-[2px] px-1 text-white rounded-md ">
                {points}
              </span>
            </span>
            <div className="flex justify-between relative px-2 md:px-6 py-[10px] border  overflow-hidden border-[#E264AD] rounded-full w-full max-w-[300px]">
              <input
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                className="capitalize text-[11px] outline-none bg-owhite"
                placeholder={t("use_your_points")}
              />
              <button
                type="button"
                className=" absolute top-1 ltr:right-1 rtl:left-1 h-7 w-7 flex items-center justify-center hover:bg-gray-200 border-gray-200 border rounded-full"
              >
                <Image
                  onClick={handlePoint}
                  className="cursor-pointer w-[13px] 2xl:w-[16px] object-contain rtl:-rotate-90"
                  src={send}
                  alt="send"
                  height={14}
                  width={16}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between relative ltr:pl-3 ltr:pr-6 rtl:pr-3 rtl:pl-6 px-6 py-[10px] border border-[#E264AD] w-full rounded-full max-w-[250px]">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-[11px] outline-none bg-owhite"
              placeholder={t("Promo_Code")}
            />
            <button
              type="button"
              className=" absolute top-1 ltr:right-1 rtl:left-1 h-7 w-7 flex items-center justify-center hover:bg-gray-200 border-gray-200 border rounded-full"
            >
              <Image
                onClick={handleCode}
                className="cursor-pointer w-[13px] 2xl:w-[16px] object-contain rtl:-rotate-90"
                src={send}
                alt="send"
                height={13}
                width={16}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between flex-1 gap-4">
          <div className="flex text-base items-center gap-1 px-2">
            <h4 className="whitespace-nowrap">{t("Total_cost")}</h4>
            <p className="text-opink text-[15px]">
              <span className="whitespace-nowrap">
                {getFormatPrice(total, currency)}
              </span>
            </p>
          </div>
          <div className="flex gap-2 md:gap-5 items-center">
            <Link
              href="/"
              className="whitespace-nowrap px-4 text-sm rounded-full border p-2 border-opink  flex items-center justify-center cursor-pointer hover:bg-opink hover:text-owhite"
            >
              {t("CONTINUE_SHOPPING")}
            </Link>

            <button
              onClick={(e) => setStage("Address Data")}
              className="p-2 rounded-full text-owhite w-fit whitespace-nowrap px-4 text-sm bg-opink flex items-center justify-center hover:bg-owhite hover:text-[#000000] hover:border cursor-pointer hover:border-opink"
            >
              {t("NEXT_STEP")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
