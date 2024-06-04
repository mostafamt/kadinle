"use client";
import { generateMail } from "@/app/api/emails/sender";
import {
  getOrderStatus,
  listUserOrders,
  sendOrderReport,
} from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CustomModal } from "../modal/CustomModal";
import { OrderBill } from "./OrderBill";
import { InputField } from "../forms/InputField";
import OneOrder from "./OneOrder";
import { Loading } from "../global/Loading";
import { getFormatPrice } from "@/app/api/lib/functions";
import AlertMessage from "../global/AlertMessage";
import Image from "next/image";

const UserOrders = ({ setActiveTab, user, locale, orderStatus, orders }) => {
  const t = useTranslations();
  const [details, setDetails] = useState(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const { language, currency } = useGlobalOptions();
  const [openForm, setOpenForm] = useState(false);
  const [ordersFilter, setOrdersFilter] = useState(orders);
  const [orderReport, setOrderReport] = useState({});
  const [selectedOrder, setSelectedOrder] = useState({});

  const openOrderPopup = (order, action) => {
    setSelectedOrder(order);
    setOpenForm(action);
    if (action === "bill") return;
    setOrderReport({ order_id: order?.orderDetails?.id, user_id: user?.id });
  };

  const onChangeField = (e) => {
    setOrderReport((prev) => {
      return {
        ...prev,
        report: e.target.value,
      };
    });
  };

  const onSubmitReport = async (e) => {
    e.preventDefault();
    if (!orderReport?.report) return;
    const response = await sendOrderReport(orderReport);
    if (response?.error) {
      toast.error(t("order_report_failed"));
    } else {
      generateMail("order_daily_msg", user?.email, {
        customer_name: `${user?.user_metadata?.first_name} ${
          user?.user_metadata?.last_name ? user?.user_metadata?.last_name : ""
        }`,
        link: `https://kadinle.com/profile`,
        carrier: "",
        status:
          orderStatus?.[selectedOrder?.orderDetails?.order_status]?.status,
        timeframe: "",
        lang: locale,
      });
      toast.success(t("order_report_success"));
      setOrderReport({});
    }
    setOpenForm(false);
  };

  const getItemsLength = (items) => {
    return items?.reduce((result, cur) => {
      return (result += cur?.content?.length);
    }, 0);
  };

  const filterOrders = (status) => {
    setStatus(status);
    if (status === 0) {
      setOrdersFilter(orders);
    } else {
      let newOrders = orders?.filter((order) => {
        return (
          orderStatus?.[order?.orderDetails?.order_status]?.numerical === status
        );
      });
      setOrdersFilter(newOrders);
    }
  };

  return (
    <>
      {openForm === "bill" ? (
        <OrderBill
          open={openForm}
          onClose={() => setOpenForm(false)}
          order_id={selectedOrder?.orderDetails?.id}
        />
      ) : (
        <CustomModal open={openForm} onClose={() => setOpenForm(false)}>
          <form
            onSubmit={onSubmitReport}
            className="flex flex-col text-xs gap-4 py-4"
          >
            <h3 className="mb-2 text-center text-opink text-sm font-semibold capitalize">
              {t("send_order_report")}
            </h3>
            <p className="bg-gray-200 capitalize w-fit px-4 p-1 rounded-md">
              {t("order_number")}: {selectedOrder?.orderDetails?.order_number}
            </p>
            <InputField
              long
              onChange={onChangeField}
              value={orderReport?.report}
              fieldClassName="min-h-[100px] min-w-[300px] md:min-w-[500px] p-4"
            />
            <button
              disabled={!orderReport?.report}
              className="mt-6 text-white disabled:bg-slate-400 bg-opink p-2 rounded-md px-4 capitalize"
            >
              {t("send")}
            </button>
          </form>
        </CustomModal>
      )}
      <div>
        {details && (
          <OneOrder
            orderStatus={orderStatus}
            setActiveTab={setActiveTab}
            regionId={currency?.region_id}
            setDetails={setDetails}
            order={details}
            language={language}
          />
        )}

        {!details && (
          <div className="flex flex-col">
            <div className="flex justify-between text-[11px]">
              <div className=" cursor-pointer flex flex-col justify-center items-center">
                <button onClick={() => filterOrders(0)} className="font-[700]">
                  {t("ALL")}
                </button>
                <div
                  className={`h-[2px] w-[31px] ${
                    status === 0 ? "visible" : "invisible"
                  } bg-opink`}
                ></div>
              </div>

              <div className=" cursor-pointer flex flex-col justify-center items-center">
                <button
                  onClick={() => filterOrders(5)}
                  className="text-[#00C922]"
                >
                  {t("DELIVERED")}
                </button>
                <div
                  className={`h-[2px] w-[65px] ${
                    status === 5 ? "visible" : "invisible"
                  } bg-opink`}
                ></div>
              </div>

              <div className=" cursor-pointer flex flex-col justify-center items-center">
                <button
                  onClick={() => filterOrders(1)}
                  className="text-[#00ADC9]"
                >
                  {t("PENDING")}
                </button>
                <div
                  className={`h-[2px] w-[55px] ${
                    status === 1 ? "visible" : "invisible"
                  } bg-opink`}
                ></div>
              </div>

              <div className=" cursor-pointer flex flex-col justify-center items-center">
                <button
                  onClick={() => filterOrders(6)}
                  className="text-[#F23468]"
                >
                  {t("CANCELLED")}
                </button>
                <div
                  className={`h-[2px] w-[65px] ${
                    status === 6 ? "visible" : "invisible"
                  } bg-opink`}
                ></div>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                {!!ordersFilter?.length ? (
                  <div className="flex flex-col  text-sm  mt-4">
                    {ordersFilter?.map((order) => {
                      let content = order?.orderProducts?.[0]?.content?.find(
                        (c) => {
                          return c?.language_id === language?.id;
                        }
                      );
                      return (
                        <div
                          key={order?.orderDetails?.order_number}
                          onClick={(e) => setDetails(order)}
                          className="flex flex-col mb-2 text-[12px] bg-owhite py-3 px-3 rounded-[8px]"
                        >
                          <div className="flex gap-3 items-center">
                            <div className="flex gap-2">
                              <Image
                                src={order?.orderProducts?.[0]?.image}
                                alt={content?.name}
                                className="rounded-[50%] w-12 h-12 object-contain"
                                height={48}
                                width={48}
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-[500]">{content?.name}</p>
                              <p className="text-[#C4C4C4] text-sm">
                                {order?.orderProducts?.[0]?.product_sku}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between mt-4">
                            <div className="flex flex-col space-y-[1px] w-[31%]">
                              <p className="text-secondary">{t("Reference")}</p>
                              <p className="text-opink">
                                {order?.orderDetails?.order_number}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-[1px] w-[31%]">
                              <p className="text-secondary">
                                {t("Order_Date")}
                              </p>
                              <p className="text-opink">
                                {new Date(
                                  order?.orderDetails?.created_at
                                ).toLocaleDateString("en-UK")}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-[1px] w-[31%]">
                              <p className="text-secondary">{t("Shipping")}</p>
                              <p className="text-opink">
                                {order?.orderDetails?.shipping_date
                                  ? `${order?.orderDetails?.shipping_date} ${t(
                                      "days"
                                    )} `
                                  : t("soon")}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between text-[11px] mt-2">
                            <div className="flex flex-col space-y-[1px] w-[31%]">
                              <p className="text-secondary">{t("Quantity")}</p>
                              <p className="text-opink">
                                {getItemsLength(order?.orderProducts)}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-[1px] w-[31%]">
                              <p className="text-secondary">
                                {t("Amount_Total")}
                              </p>
                              <p className="text-opink">
                                {getFormatPrice(
                                  order?.orderDetails?.price,
                                  currency
                                )}
                              </p>
                            </div>
                            <div className=" w-[31%] gap-2 flex flex-wrap items-center">
                              <button
                                className="bg-red-500 text-white px-2 py-[2px] rounded-md text-[10px]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openOrderPopup(order, "report");
                                }}
                              >
                                {t("report")}
                              </button>{" "}
                              <button
                                className="bg-blue-500 text-white px-1 whitespcae-nowrap py-1 rounded-md text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openOrderPopup(order, "bill");
                                }}
                              >
                                {t("view_bill")}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <AlertMessage msg={t("empty_msg")} />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrders;
