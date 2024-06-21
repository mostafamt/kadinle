"use client";

import { generateMail } from "@/app/api/emails/sender";
import { getClosestWeight } from "@/app/api/lib/functions";
import { FREE_SHIPPING_COST, SHIPPING_TYPE } from "@/app/api/static/constants";
import {
  addNewOrder,
  getStocksByVariantIds,
  getWarehouseOfCartItems,
} from "@/app/api/supabase/orders";
import { increasePointsByType } from "@/app/api/supabase/points";
import { getShippingInformation } from "@/app/api/supabase/products";
import {
  deleteFromUser_cart,
  discountPoints,
  getUserCart,
  getUserData,
} from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutBar } from "./CheckoutBar";
import ShoppingCart from "./ShoppingCart";
import AddressData from "./AddressData";
import Summary from "./Summary";
import CardInfo from "./CardInfo";
import Done from "./Done";
import Image from "next/image";
import Link from "next/link";
import { ConfirmAction } from "../global/ConfirmAction";

const activeCart = "https://kadinle.com/media/images/activeCart.svg";

const STAGES = {
  "Shopping Cart": 1,
  "Address Data": 2,
  Summary: 3,
  "Card Info": 4,
  Done: 5,
};

let CACHE_SHIPPING_INFORMATION = {};

const CartPageDT = ({ locale }) => {
  const t = useTranslations();
  const {
    currency,
    language,
    user,
    setRefresh: setRefreshCart,
  } = useGlobalOptions();
  const [cart, setCart] = useState();
  const [points, setPoints] = useState();
  const [stage, setStage] = useState("Shopping Cart");
  const [total, setTotal] = useState();
  const [couponId, setCouponId] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [shipping_adress, setShipping_adress] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState();
  const [updateCart, setUpdateCart] = useState(false);
  const [warehouseInformation, setWarehouseInformation] = useState(null);
  const [shipping_type, setShipping_type] = useState("FAST");
  const [shipping_cost, setShipping_cost] = useState(0);
  const [order_number, setOrder_number] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [shippingsCosts, setShippingCosts] = useState({});
  const [CACHE_CART_STOCKS, setCACHE_CART_STOCKS] = useState(null);

  useEffect(() => {
    getUserCart().then((res) => {
      setCart(res?.data);
      let calcTotal = res?.data?.reduce((result, cur) => {
        return (result += cur?.price * cur?.quantity);
      }, 0);
      setTotal(calcTotal);
      if (calcTotal >= FREE_SHIPPING_COST) setShipping_type(SHIPPING_TYPE?.[1]);
      if (!CACHE_CART_STOCKS) getStocks(res?.data?.map((item) => item?.id));
      setLoading(false);
    });
  }, [refresh]);

  const getStocks = async (variantIds) => {
    const stocks = await getStocksByVariantIds(variantIds);
    let hash = {};
    for (const item of stocks?.data) {
      hash[item?.variant_id] = item?.stock;
    }
    setCACHE_CART_STOCKS(hash);
  };

  useEffect(() => {
    getShippingInformation({
      countryId: shipping_adress?.country?.id || currency?.id,
    }).then((res) => {
      if (res?.data?.length) {
        for (const row of res?.data) {
          let shipping = row?.shipping;
          CACHE_SHIPPING_INFORMATION.normal = shipping?.normal_price;
          CACHE_SHIPPING_INFORMATION.fast = shipping?.fast_price;
        }
        setWarehouseInformation(res?.data?.[0]);
      }
    });
  }, [currency?.id, shipping_adress]);

  useEffect(() => {
    getUserData().then((res) => {
      setPoints(res?.data?.[0]?.points);
    });
  }, []);

  useEffect(() => {
    if (!cart?.length || !CACHE_SHIPPING_INFORMATION?.fast) return;

    let availableWeightsNormal = Object.keys(
      CACHE_SHIPPING_INFORMATION?.normal
    );
    let availableWeightsFast = Object.keys(CACHE_SHIPPING_INFORMATION?.fast);
    let variantIds = cart?.map((item) => item?.id);
    let totalShippingPriceNormal = 0;
    let totalShippingPriceFast = 0;

    getWarehouseOfCartItems(variantIds).then((res) => {
      for (const item of cart) {
        const closestWeightNormal = getClosestWeight(
          item?.weight,
          availableWeightsNormal
        );
        const closestWeightFast = getClosestWeight(
          item?.weight,
          availableWeightsFast
        );

        let normalPrice =
          CACHE_SHIPPING_INFORMATION?.normal?.[closestWeightNormal];
        let fastPrice = CACHE_SHIPPING_INFORMATION?.fast?.[closestWeightFast];
        totalShippingPriceFast += +fastPrice;
        totalShippingPriceNormal += +normalPrice;
      }
      setShippingCosts((prev) => {
        return {
          ...prev,
          normal: +totalShippingPriceNormal,
          fast: +totalShippingPriceFast,
        };
      });
    });
  }, [cart, warehouseInformation, total]);

  useEffect(() => {
    if (!shipping_type) return;
    if (shipping_type === SHIPPING_TYPE?.[1]) {
      setShipping_cost(0);
    } else if (shipping_type === SHIPPING_TYPE?.[2]) {
      setShipping_cost(shippingsCosts?.fast);
    } else {
      setShipping_cost(shippingsCosts?.normal);
    }
  }, [shipping_type, shippingsCosts]);

  const removeItemFromCart = (variantId) => {
    setSelectedItemId(variantId);
  };

  const deleteItemFromCart = async (variantId) => {
    const res = await deleteFromUser_cart(variantId);
    if (!res.error) {
      setRefresh((p) => !p);
      setRefreshCart((p) => !p);
      setSelectedItemId("");
    }
  };

  const addToOrder = () => {
    let shipping_date_form =
      shipping_type === "FAST"
        ? warehouseInformation?.shipping?.min_fast_duration
        : warehouseInformation?.shipping?.min_normal_duration;
    let shipping_date_to =
      shipping_type === "FAST"
        ? warehouseInformation?.shipping?.max_fast_duration
        : warehouseInformation?.max_normal_duration;
    let shipping_date = shipping_date_form + "-" + shipping_date_to;
    let finalTotal = total + shipping_cost || 0;
    let bill = [];
    let extraContent = `<div>`;
    for (const item of cart) {
      let name = item?.content?.find(
        (c) => c?.language_id === language?.id
      )?.name;
      let price = item?.quantity * item?.price;
      bill.push({
        name,
        price,
        sku: item?.sku,
        image: item?.image,
        quantity: item?.quantity,
      });
      extraContent += `
        <div style="padding: 0 0 10px; border-bottom: 1px solid #4445; margin-top:10px">
          <img src="${item?.image}" alt="${name}" />
          <h3>${name}</h3>
          <div style="display:flex; gap:10px; align-items:center;">
            <span>${t("Quantity")}: ${item?.quantity}</span>
            <span>${t("Price")}: ${price}</span>
          </div>
        </div>
      `;
    }
    extraContent += `</div>`;

    addNewOrder(
      bill,
      finalTotal,
      discount,
      couponId,
      shipping_adress?.id,
      warehouseInformation?.warehouse_id,
      shipping_type,
      shipping_date,
      shipping_cost
    ).then((res) => {
      generateMail("order_product_information_msg", user?.email, {
        lang: locale,
        extraContent,
        customer_name: `${user?.user_metadata?.first_name} ${
          user?.user_metadata?.last_name ? user?.user_metadata?.last_name : ""
        } `,
      });

      if (res?.error) {
        toast.error(t("order_failed"));
      } else {
        if (selectedPoint > 0) {
          discountPoints(selectedPoint);
        }
        setRefreshCart((p) => !p);
        setOrderId(res?.order_id);
        setOrder_number(res?.order_number);
        setStage("Done");
        successOrder(finalTotal);
        generateMail("received_order_msg", user?.email, {
          lang: locale,
          customer_name: `${user?.user_metadata?.first_name} ${
            user?.user_metadata?.last_name ? user?.user_metadata?.last_name : ""
          } `,
          order_number: res?.order_number,
          order_link: "https://kadinle.com/profile",
          track_link: "https://kadinle.com/profile",
        });
      }
    });
  };
  async function successOrder(total) {
    let points = 0;
    if (currency?.currency?.rate) {
      points = parseInt((total / currency?.currency?.rate) * 5);
    } else {
      points = parseInt(total * currency?.currency?.rate * 5);
    }
    if (points) await increasePointsByType("SPENT_MONEY", user?.id, points);
  }

  return (
    <>
      <ConfirmAction
        open={selectedItemId}
        onCancel={() => setSelectedItemId("")}
        onConfirm={() => deleteItemFromCart(selectedItemId)}
        title={t("remove_item")}
        msg={t("confirm_remove_item_from_cart")}
        btnConfirmLabel={t("delete")}
      />

      <div className="flex flex-col poppins overflow-hidden">
        <div className="flex justify-center w-full mt-10 mb-8">
          {loading ? (
            <div className="">{t("loading")}</div>
          ) : (
            <>
              {!loading && cart?.length ? (
                <div className="flex flex-col gap-4 container max-w-[1500px] p-4">
                  <CheckoutBar stage={STAGES[stage]} />
                  {stage === "Shopping Cart" && (
                    <ShoppingCart
                      CACHE_CART_STOCKS={CACHE_CART_STOCKS}
                      selectedPoint={selectedPoint}
                      setSelectedPoint={setSelectedPoint}
                      updateCart={updateCart}
                      setUpdateCart={setUpdateCart}
                      setRefresh={setRefresh}
                      removeItemFromCart={removeItemFromCart}
                      setDiscount={setDiscount}
                      setCouponId={setCouponId}
                      setTotal={setTotal}
                      total={total}
                      cart={cart}
                      setStage={setStage}
                      points={points}
                      setPoints={setPoints}
                    />
                  )}
                  {stage === "Address Data" && (
                    <AddressData
                      shipping_adress={shipping_adress}
                      setShipping_adress={setShipping_adress}
                      setStage={setStage}
                      warehouseInformation={warehouseInformation}
                      shipping_type={shipping_type}
                      setShipping_type={setShipping_type}
                      shipping_cost={shipping_cost}
                      shippingsCosts={shippingsCosts}
                      total={total}
                    />
                  )}
                  {stage === "Summary" && (
                    <Summary
                      shipping_adress={shipping_adress}
                      total={total}
                      cart={cart}
                      setStage={setStage}
                      warehouseInformation={warehouseInformation}
                      shipping_cost={shipping_cost}
                    />
                  )}
                  {stage === "Card Info" && (
                    <CardInfo
                      cart={cart}
                      shipping_cost={shipping_cost}
                      setStage={setStage}
                      addToOrder={addToOrder}
                      total={total}
                      order_number={order_number}
                    />
                  )}
                  {stage === "Done" && (
                    <Done
                      order_number={order_number}
                      total={total}
                      orderId={orderId}
                    />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col gap-4">
                  <Image
                    src={activeCart}
                    alt="cart"
                    className="w-44 h-44 object-cover"
                    height={176}
                    width={176}
                  />
                  <p>{t("empty_cart")}</p>
                  <Link
                    href="/"
                    className="bg-opink text-white p-2 rounded-2xl text-[10px] md:text-[12px] 2xl:text-[14px]"
                  >
                    {t("CONTINUE_SHOPPING")}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPageDT;
