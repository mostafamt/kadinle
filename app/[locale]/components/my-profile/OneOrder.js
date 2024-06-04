"use client";
import React from "react";

import { OrderStatusBar } from "./OrderStatusBar";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getFormatPrice } from "@/app/api/lib/functions";
import { addToUser_cart } from "@/app/api/supabase/user";
const pic1 = "https://kadinle.com/media/images/pic1.png";

const OneOrder = ({
  order,
  language,
  setDetails,
  regionId,
  setActiveTab,
  orderStatus,
}) => {
  const t = useTranslations();
  const { currency, setRefresh } = useGlobalOptions();

  const handleReorder = async () => {
    const products = order?.orderProducts;
    let hash = {};
    for (const item of products) {
      hash[item?.id] = item?.id;
    }
    for (let variantId of Object.keys(hash)) {
      await addToUser_cart(variantId, 1);
    }
    setRefresh((p) => !p);
  };

  return (
    <div className="flex flex-col pb-12">
      {/* progress */}
      <OrderStatusBar
        orderStatus={orderStatus}
        statusNumber={
          orderStatus?.[order?.orderDetails?.order_status]?.numerical
        }
      />

      {order?.orderProducts?.map((product) => {
        let size = product?.sizeContent?.find((c) => {
          return c?.region_id === regionId;
        });
        let content = product?.content?.find((c) => {
          return c?.language_id === language?.id;
        });
        let color = product?.colorContent?.find((c) => {
          return c?.language_id === language?.id;
        });
        return (
          <div
            key={content?.id}
            className="flex flex-col text-xs bg-owhite py-3 px-3 rounded-[8px] mt-2"
          >
            <div className="flex gap-3 items-center">
              <div className="flex gap-2">
                <Image
                  src={product?.image}
                  alt={content?.name}
                  height={60}
                  width={60}
                  className="h-14 w-14 object-cover object-top rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">{content?.name}</p>
                <p className="text-secondary text-xs">{product?.product_sku}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs mt-4">
              <div className="flex flex-col space-y-[1px] w-[28%]">
                <p className="text-secondary font-semibold">{t("Color")}</p>
                <p className="text-opink">{color?.name}</p>
              </div>
              <div className="flex flex-col space-y-[1px] w-[28%]">
                <p className="text-secondary font-semibold">{t("Size")}</p>
                <p className="text-opink">{size?.name}</p>
              </div>
              <div className="flex flex-col space-y-[1px] w-[28%]">
                <p className="text-secondary font-semibold">{t("Amount")}</p>
                <p className="text-opink">{product?.quantity}</p>
              </div>
              <div className="flex flex-col space-y-[1px] w-[28%]">
                <p className="text-secondary font-semibold">{t("Price")}</p>
                <p className="text-opink">
                  {getFormatPrice(
                    product?.product_details?.[0]?.price,
                    currency
                  )}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-xs mt-2">
              <div className="flex flex-col space-y-[1px] w-[31%]">
                <p className="text-secondary font-semibold">
                  {t("Order_Number")}
                </p>
                <p className="text-opink">
                  {order?.orderDetails?.order_number}
                </p>
              </div>
              <div className="flex flex-col space-y-[1px] w-[31%]">
                <p className="text-secondary font-semibold">
                  {t("Order_Date")}
                </p>
                <p className="text-opink">
                  {new Date(order?.orderDetails?.created_at).toLocaleDateString(
                    "en-UK"
                  )}
                </p>
              </div>
              <div className=" w-[31%]"></div>
            </div>
          </div>
        );
      })}

      <button
        onClick={handleReorder}
        className="mt-4 block mx-auto justify-center items-center w-[135px] py-1 ltr:pr-2 rtl:pl-2 rounded-full bg-opink text-[12px] text-owhite"
      >
        {t("REODER")}
      </button>
    </div>
  );
};

export default OneOrder;
