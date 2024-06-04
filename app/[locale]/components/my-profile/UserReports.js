"use client";

import { getBillReports, getOrderReports } from "@/app/api/supabase/orders";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../global/Loading";
import { BillReports } from "./BillReports";
import { OrderReports } from "./OrderReports";

export const UserReports = () => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState("order");
  const [orderReports, setOrderReports] = useState([]);
  const [billReports, setBillsReports] = useState([]);

  const getBills = async () => {
    setIsLoading(true);
    const response = await getBillReports(user?.id);
    setBillsReports(response?.data);
    setIsLoading(false);
  };
  const getOrders = async () => {
    const response = await getOrderReports(user?.id);
    setOrderReports(response?.data);
  };
  useEffect(() => {
    getBills();
    getOrders();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center my-6 bg-gray-300 text-xs  rounded-xl overflow-hidden">
        <button
          onClick={() => setStage("order")}
          className={`px-4 flex-1 capitalize p-2 ${
            stage === "order" ? "bg-opink text-white font-medium" : ""
          }`}
        >
          {t("order_reports")}
        </button>
        <button
          onClick={() => setStage("bill")}
          className={`px-4 flex-1 capitalize p-2 ${
            stage === "bill" ? "bg-opink text-white font-medium" : ""
          }`}
        >
          {t("bill_reports")}
        </button>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {stage === "bill" ? (
              <BillReports billReports={billReports} />
            ) : (
              <OrderReports orderReports={orderReports} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
