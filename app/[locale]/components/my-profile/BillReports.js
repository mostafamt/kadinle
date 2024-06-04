"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { OrderBill } from "./OrderBill";
import { CustomModal } from "../modal/CustomModal";
import { getFormatPrice } from "@/app/api/lib/functions";

export const BillReports = ({ billReports }) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();
  const [orderId, setOrderId] = useState("");

  return (
    <>
      {orderId ? (
        <OrderBill
          order_id={orderId}
          open={orderId}
          onClose={() => setOrderId("")}
        />
      ) : null}
      {billReports?.length ? (
        <>
          {billReports?.map((report) => (
            <div className="shadow bg-white mb-4" key={report?.id}>
              <ul className="flex overflow-auto scroll-hide  border-gray-200 items-end justify-between text-xs bg-gray-100 rounded-t-md border">
                <li className="flex-1 capitalize p-2 gap-1 flex-col flex items-center justify-center">
                  <span className=" whitespace-nowrap">{t("Order_Date")} </span>
                  <span className="bg-opink text-white px-1 rounded">
                    {new Date(report?.created_at).toLocaleDateString("en-US")}
                  </span>
                </li>
                <li className="flex-1 capitalize p-2 gap-1 flex-col flex items-center justify-center ltr:border-l rtl:border-r">
                  <span className=" whitespace-nowrap">
                    {t("shipping_cost")}
                  </span>
                  <span className="bg-opink whitespace-nowrap text-white px-1 rounded">
                    {getFormatPrice(report?.bill?.shipping_cost, currency)}
                  </span>
                </li>
                <li className="capitalize p-2 gap-1 flex-col flex items-center justify-center px-2 border-x">
                  <span className=" whitespace-nowrap">{t("total")} </span>
                  <span className="bg-opink whitespace-nowrap text-white px-1 rounded">
                    {getFormatPrice(report?.bill?.total, currency)}
                  </span>
                </li>
                <li className="p-2 items-center">
                  <button
                    onClick={() => setOrderId(report?.bill?.order_id)}
                    className="bg-blue-500 whitespace-nowrap capitalize text-white  text-[10px] p-1 rounded-md "
                  >
                    {t("view_bill")}
                  </button>
                </li>
              </ul>
              <p className="p-4 text-sm text-gray-500">{report?.report}</p>
            </div>
          ))}
        </>
      ) : (
        <p>{t("no_results")}</p>
      )}
    </>
  );
};
