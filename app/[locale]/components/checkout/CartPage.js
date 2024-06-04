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
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScrollUpComponent from "../global/ScrollUpComponent";
import BottomNav from "../footer/BottomNav";
import { Loading } from "../global/Loading";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart";
import Address from "./Address";
import Checkout from "./Checkout";
import CardInfo from "./CardInfo";
import Done from "./Done";
import { TotalBottomBar } from "./TotalBottomBar";
import { MobileNav } from "../header/MobileNav";
import { useRouter } from "next/navigation";
import { ConfirmAction } from "../global/ConfirmAction";

const ActiveCart = "https://kadinle.com/media/images/activeCart.svg";

let CACHE_SHIPPING_INFORMATION = {};

const STAGES = ["cart", "address", "checkout", "cardInfo", "done"];

const CartPage = ({ locale }) => {
  const t = useTranslations();
  const {
    currency,
    language,
    setRefresh: setRefreshCart,
    user,
  } = useGlobalOptions();
  const router = useRouter();
  const [stage, setStage] = useState("cart");
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState();
  const [couponId, setCouponId] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [shipping_adress, setShipping_adress] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState();
  const [updateCart, setUpdateCart] = useState(false);
  const [points, setPoints] = useState();
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [warehouseInformation, setWarehouseInformation] = useState(null);
  const [shipping_type, setShipping_type] = useState("");
  const [shipping_cost, setShipping_cost] = useState(0);
  const [order_number, setOrder_number] = useState(0);
  const [shippingsCosts, setShippingCosts] = useState({});
  const [sendGiftMessage, setSendGiftMessage] = useState("");
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [CACHE_CART_STOCKS, setCACHE_CART_STOCKS] = useState(null);

  useEffect(() => {
    getUserCart().then((res) => {
      setCart(res?.data);
      setLoading(false);
      let calcTotal = res?.data?.reduce((result, cur) => {
        return (result += cur?.price * cur?.quantity);
      }, 0);
      setTotal(calcTotal);
      if (calcTotal >= FREE_SHIPPING_COST) setShipping_type(SHIPPING_TYPE?.[1]);
      if (!CACHE_CART_STOCKS) getStocks(res?.data?.map((item) => item?.id));
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
    getUserData().then((res) => {
      // setUserData(res?.data?.[0]);
      setPoints(res?.data?.[0]?.points);
    });
  }, []);

  useEffect(() => {
    getShippingInformation({
      countryId: shipping_adress?.country?.id || currency?.id,
    }).then((res) => {
      if (res?.data?.length) {
        for (const row of res?.data) {
          let shipping = row?.shipping;
          CACHE_SHIPPING_INFORMATION.fast = shipping?.fast_price;
          CACHE_SHIPPING_INFORMATION.normal = shipping?.normal_price;
        }
        setWarehouseInformation(res?.data?.[0]);
      }
    });
  }, [currency?.id, shipping_adress]);

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
      setLoadingShipping(false);
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
  }, [shipping_type]);

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
          <img src="${
            item?.image
          }" alt="${name}" style="height: 120px; width: 90px" />
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
      if (res?.error) {
        toast.error(t("order_failed"));
      } else {
        generateMail("order_product_information_msg", user?.email, {
          lang: locale,
          extraContent,
          customer_name: `${user?.user_metadata?.first_name} ${
            user?.user_metadata?.last_name ? user?.user_metadata?.last_name : ""
          } `,
        });

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

  const handleBack = () => {
    let index = STAGES.indexOf(stage);
    if (index === 0) router?.back();
    setStage(STAGES[index - 1]);
  };

  return (
    <>
      <ScrollUpComponent />
      <ConfirmAction
        open={selectedItemId}
        onCancel={() => setSelectedItemId("")}
        onConfirm={() => deleteItemFromCart(selectedItemId)}
        title={t("remove_item")}
        msg={t("confirm_remove_item_from_cart")}
        btnConfirmLabel={t("delete")}
      />
      <BottomNav />
      <div className="w-full flex flex-col justify-center bg-[#F5F6F8] poppins pb-[140px] mx-auto container">
        <MobileNav title={t(stage)} handleBack={handleBack} showIcons />
        <div className=" flex flex-col w-[90%] max-w-[500px] mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              {!cart?.length ? (
                <div className="h-screen flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col gap-4">
                    <Image
                      src={ActiveCart}
                      alt="empty cart"
                      className="h-auto w-[120px] object-contain"
                      height={120}
                      width={120}
                    />
                    <p>{t("cartIsEmpty")}</p>
                    <Link
                      href="/"
                      className="bg-opink text-white p-2 rounded-2xl text-[10px] md:text-[12px] 2xl:text-[14px]"
                    >
                      {t("continueShopping")}
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {stage === "cart" && (
                    <Cart
                      CACHE_CART_STOCKS={CACHE_CART_STOCKS}
                      selectedPoint={selectedPoint}
                      setSelectedPoint={setSelectedPoint}
                      setRefresh={setRefresh}
                      updateCart={updateCart}
                      setUpdateCart={setUpdateCart}
                      removeItemFromCart={removeItemFromCart}
                      setDiscount={setDiscount}
                      setCouponId={setCouponId}
                      setTotal={setTotal}
                      total={total}
                      cart={cart}
                      setStage={setStage}
                      points={points}
                      shipping_cost={shipping_cost}
                      sendGiftMessage={sendGiftMessage}
                      setSendGiftMessage={setSendGiftMessage}
                    />
                  )}
                  {stage === "address" && (
                    <Address
                      shipping_adress={shipping_adress}
                      setShipping_adress={setShipping_adress}
                      setStage={setStage}
                      warehouseInformation={warehouseInformation}
                      shipping_type={shipping_type}
                      setShipping_type={setShipping_type}
                      total={total}
                      selectedPoint={selectedPoint}
                      setShipping_cost={setShipping_cost}
                      shipping_cost={shipping_cost}
                      shippingsCosts={shippingsCosts}
                      loadingShipping={loadingShipping}
                    />
                  )}
                  {stage === "checkout" && (
                    <Checkout
                      shipping_adress={shipping_adress}
                      cart={cart}
                      setStage={setStage}
                    />
                  )}
                  {stage === "cardInfo" && (
                    <CardInfo
                      addToOrder={addToOrder}
                      setStage={setStage}
                      total={total}
                      orderId={orderId}
                      shipping_cost={shipping_cost}
                    />
                  )}
                  {stage === "done" && (
                    <Done
                      order_number={order_number}
                      orderId={orderId}
                      total={total}
                    />
                  )}
                  {stage !== "done" && (
                    <TotalBottomBar
                      shipping_type={shipping_type}
                      shipping_adress={shipping_adress}
                      stage={stage}
                      setStage={setStage}
                      shipping_cost={shipping_cost}
                      total={total}
                      STAGES={STAGES}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
