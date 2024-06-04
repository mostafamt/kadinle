import React, { useEffect, useState } from "react";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getOrderBill } from "@/app/api/supabase/orders";
import { getFormatPrice } from "@/app/api/lib/functions";
import { BillForm } from "./BillForm";
import { CustomModal } from "../modal/CustomModal";

export const OrderBill = ({ order_id, open, onClose }) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();
  const [loading, setLoading] = useState(false);
  const [openFormBill, setOpenFormBill] = useState(false);
  const [orderBillInformation, setOrderBillInformation] = useState({});

  const getBill = async () => {
    setLoading(true);
    const response = await getOrderBill(order_id);
    setLoading(false);
    setOrderBillInformation(response?.data?.at(0));
  };

  useEffect(() => {
    getBill();
  }, [order_id]);

  return (
    <>
      {openFormBill ? (
        <BillForm
          billInfo={{
            user_id: orderBillInformation?.user_id,
            bill_id: orderBillInformation?.id,
          }}
          onClose={() => setOpenFormBill(false)}
          open={openFormBill}
        />
      ) : null}
      <CustomModal open={open} onClose={onClose} containerClassName="z-[6005]">
        {loading ? (
          t("loading")
        ) : (
          <>
            {orderBillInformation?.total ? (
              <div className="flex flex-col text-sm">
                <h2 className="font-semibold mb-4 text-center capitalize text-opink">
                  {t("order_bill")}
                </h2>
                {orderBillInformation?.bill?.map((item) => (
                  <div className="flex items-start gap-2 mb-2" key={item?.id}>
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-10 h-14 border rounded-md shadow"
                      height={56}
                      width={40}
                    />
                    <div className="flex-1">
                    <h3 className="text-sm">{item?.name}</h3>
                    <div className="mt-2 flex justify-center gap-2 items-center w-full">
                      <span className="text-xs text-gray-500">
                        {t("Quantity")}:
                        <span className="text-sm"> {item?.quantity}</span>
                      </span>
                      <h4 className="ltr:ml-auto whitespace-nowrap rtl:mr-auto">
                        {getFormatPrice(item?.price, currency)}
                      </h4>
                    </div>
                    </div>
                  </div>
                ))}
                <div className="my-2 border-t border-gray-200" />
                <p className="flex gap-2 items-center justify-between capitalize text-sm text-gray-500">
                  <span>{t("subtotal")}</span>
                  {getFormatPrice(
                    orderBillInformation?.total -
                      orderBillInformation?.shipping_cost,
                    currency
                  )}
                </p>
                <p className="flex gap-2 items-center justify-between capitalize text-sm text-gray-500">
                  <span>{t("shipping_cost")}</span>
                  {getFormatPrice(
                    orderBillInformation?.shipping_cost,
                    currency
                  )}
                </p>
                <div className="my-2 border-t border-gray-200" />
                <h3 className="flex gap-2 items-center justify-between capitalize">
                  <span>{t("total")}</span>
                  {getFormatPrice(orderBillInformation?.total, currency)}
                </h3>
                <div className="my-2 border-t border-gray-200" />
                <button
                  className="bg-primary block w-full rounded-md text-white text-center"
                  onClick={() => setOpenFormBill(true)}
                >
                  {t("report")}
                </button>
              </div>
            ) : (
              <p className="text-red-500 min-h-[inherit] items-center flex justify-center text-center ">
                {t("no_results")}
              </p>
            )}
          </>
        )}
      </CustomModal>
    </>
  );
};
