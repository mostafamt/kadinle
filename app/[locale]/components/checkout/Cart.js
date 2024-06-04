"use client";
import React, { useContext, useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { getFormatPrice } from "@/app/api/lib/functions";
import { applyCoupon } from "@/app/api/supabase/products";
import { CheckoutBar } from "./CheckoutBar";
import Image from "next/image";
import { CartSendGift } from "./CartSendGift";
import {
  getStockCount,
  listUserOrders,
  updateUser_cart,
} from "@/app/api/supabase/user";

const CACHE_STOCK = {};

const Cart = ({
  points,
  setPoints,
  setSelectedPoint,
  updateCart,
  setUpdateCart,
  removeItemFromCart,
  cart,
  total,
  setTotal,
  setCouponId,
  setRefresh,
  setDiscount,
  sendGiftMessage,
  setSendGiftMessage,
  CACHE_CART_STOCKS,
}) => {
  const t = useTranslations();
  const { language, currency } = useGlobalOptions();
  const [point, setPoint] = useState(0);
  const [userOrder, setUserOrder] = useState(0);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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
          setTotal((prev) => {
            return prev - (res?.value / 100) * prev;
          });
        } else {
          setTotal((prev) => {
            return prev - res?.value;
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col">
      {/* <NavIcons /> */}
      <CheckoutBar stage={1} />

      <div className="flex flex-col ">
        <p className="font-[700] text-[#25252D] text-[25px] mb-2 capitalize">
          {t("cart")}
        </p>

        <div className="flex flex-col w-full justify-center items-center space-y-4">
          {cart?.map((item) => {
            let content = item?.content?.find(
              (c) => c.language_id === language?.id
            );
            let color = item?.color_content?.find(
              (c) => c.language_id === language?.id
            );
            let size = item?.size_content?.find(
              (c) => c.region_id === regionId
            );

            const maxCount = CACHE_CART_STOCKS?.[item?.id] === item?.quantity;

            return (
              <div
                className="flex p-2 gap-6 w-[95%] border border-opink rounded-[10px] bg-owhite"
                key={item?.id}
              >
                <div>
                  <Image
                    className="ratio6 w-[70px] object-cover shadow rounded-md"
                    src={item?.image}
                    akt={content?.name}
                    height={70}
                    width={60}
                  />
                </div>

                <div className="flex flex-col justify-between text-[12px] flex-1">
                  <div className="flex flex-col space-y-[3px]">
                    <h3 className="">{content?.name}</h3>
                    <p className="font-[300] text-secondary">
                      {size?.name}, {color?.name}
                    </p>
                    <p className="text-opink text-[12px]">
                      {getFormatPrice(item?.price * item?.quantity, currency)}
                    </p>
                  </div>
                  <div className="flex gap-3 items-end justify-between w-full">
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
                        <div className="flex gap-2 w-fit bg-gray-100 rounded-full overflow-hidden border border-gray-300 items-center">
                          <button
                            disabled={updateCart || item?.quantity === 1}
                            className="disabled:text-[#D8D8D8] disabled:cursor-not-allowed flex-1 flex items-center justify-center border h-5 w-5 rounded-full bg-gray-200"
                            onClick={() =>
                              decreaseQuantity(item?.id, item?.quantity)
                            }
                          >
                            -
                          </button>
                          <span className="px-2 font-semibold">
                            {item?.quantity}
                          </span>
                          <button
                            disabled={updateCart || maxCount}
                            className="disabled:text-[#D8D8D8] disabled:cursor-not-allowed flex-1 flex items-center justify-center border h-5 w-5 rounded-full bg-gray-200"
                            onClick={() =>
                              increaseQuantity(item?.id, item?.quantity)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      className="text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded-md text-xs capitalize"
                      onClick={() => removeItemFromCart(item?.id)}
                    >
                      {t("remove")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col my-4">
          <span className="flex text-sm px-1  items-center whitespace-nowrap mb-1">
            {t("available_points").replace(/{points}/, points)}
          </span>
          <div className="flex justify-between  border relative overflow-hidden border-[#E264AD] rounded-full w-full">
            <input
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="flex-1 px-4 capitalize text-[11px] 2xl:text-[12px] outline-none bg-owhite"
              placeholder={t("use_your_points")}
            />
            <button
              onClick={handlePoint}
              className="bg-opink text-white p-1 w-[90px] px-4 capitalize"
            >
              {t("apply")}
            </button>
          </div>
        </div>
        <div className="rounded-full mb-4 border border-opink overflow-hidden w-full bg-owhite text-[12px] mt-4 flex justify-between">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className=" flex-1 px-4 capitalize text-[11px] 2xl:text-[13px] outline-none bg-owhite"
            placeholder={t("promoCode")}
          />
          <button
            onClick={handleCode}
            className="bg-opink text-white p-2  text-sm w-[90px] px-4 capitalize"
          >
            {t("apply")}
          </button>
        </div>
        <CartSendGift
          sendGiftMessage={sendGiftMessage}
          setSendGiftMessage={setSendGiftMessage}
        />
      </div>
      {error ? (
        <p className="mx-4 bg-red-100 text-red-500 p-1 rounded-md text-center">
          {error}
        </p>
      ) : null}
      {msg ? (
        <p className="mx-4 bg-green-100 text-green-500 p-1 rounded-md text-center">
          {msg}
        </p>
      ) : null}
    </div>
  );
};

export default Cart;
