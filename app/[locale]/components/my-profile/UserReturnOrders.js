"use client";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import {
  cancelReturnRequest,
  getReturnRequests,
} from "@/app/api/supabase/user";
import CloseIcon from "../Icons/CloseIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import { ReturnOrderForm } from "./ReturnOrderForm";
import Image from "next/image";
import { Loading } from "../global/Loading";

const UserReturnOrders = ({ setActiveTab }) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const [loading, setLoading] = useState(false);
  const [openFormReturn, setOpenFormReturn] = useState(false);
  const [returnRequests, setReturnRequests] = useState([]);
  const [preventLoading, setPreventLoading] = useState(false);

  const getReturns = async () => {
    setLoading(true);
    getReturnRequests().then((res) => {
      setReturnRequests(res?.data);
      setLoading(false);
      setPreventLoading(true);
    });
  };

  useEffect(() => {
    if (!openFormReturn) getReturns();
  }, [openFormReturn]);

  const cancelReturn = async (id) => {
    const response = await cancelReturnRequest(id);
    if (response?.error) toast?.error(t("failed_to_cancel"));
    else {
      toast.success(t("success_to_cancel"));
      getReturns();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 text-xs">
        <h3 className="text-opink capitalize font-medium text-sm">
          {t("return_order_msg_title")}
        </h3>
        <button
          onClick={() => setOpenFormReturn((p) => !p)}
          className="bg-opink text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          {openFormReturn ? <CloseIcon className="w-3 h-3" /> : <PlusIcon />}
        </button>
      </div>
      {openFormReturn ? (
        <ReturnOrderForm setOpenFormReturn={setOpenFormReturn} />
      ) : (
        <>
          {loading && !preventLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {returnRequests?.length ? (
                <>
                  {returnRequests?.map((request) => (
                    <div
                      key={request?.id}
                      className="border border-gray-200 bg-white rounded-md p-4  flex flex-col gap-1"
                    >
                      <div className="flex gap-2 items-center justify-between w-full">
                        <p className="flex gap-2 font-medium">
                          {t("Order")}:
                          <span className="font-normal">
                            {request?.order?.order_number}
                          </span>
                        </p>
                        {!request?.other_reason ? (
                          <p className="text-xs bg-yellow-200 my-2 p-1 w-fit rounded-md text-yellow-600">
                            <strong>{t("reason")}</strong>:{" "}
                            {
                              request?.return_reason?.return_reason_content?.find(
                                (r) => r?.language_id === language?.id
                              )?.reason
                            }
                          </p>
                        ) : null}
                      </div>
                      {request?.other_reason ? (
                        <p className="text-xs bg-yellow-200 my-2 p-1 gap-1 rounded-md text-yellow-600">
                          <strong>{t("reason")}</strong>:{" "}
                          {request?.other_reason}
                        </p>
                      ) : null}
                      <p className="flex gap-2 font-medium">
                        {t("Product")}:
                        <Link
                          href={`/product/${request?.product_variant?.product?.product_sku}`}
                          className="font-normal hover:underline text-opink"
                        >
                          {
                            request?.product_variant?.product?.product_content?.find(
                              (p) => p?.language_id === language?.id
                            )?.name
                          }
                        </Link>
                      </p>
                      {request?.images?.length ? (
                        <div className="flex flex-wrap mb-2 items-start gap-2">
                          {request?.images?.map((img) => (
                            <Image
                              src={img}
                              key={img}
                              alt="returns"
                              className="w-12 object-contain border rounded-md"
                              height={48}
                              width={48}
                            />
                          ))}
                        </div>
                      ) : null}
                      <div className="flex justify-between items-end gap-4">
                        <p className="flex flex-wrap items-center gap-1 text-sm font-medium">
                          {t("Status")}:
                          <span className="font-normal bg-gray-200 p-1 text-xs px-1 rounded-md">
                            {
                              request?.return_status?.return_status_content?.find(
                                (r) => r?.language_id === language?.id
                              )?.status
                            }
                          </span>
                        </p>
                        <p className="flex flex-wrap items-center gap-1 text-sm font-medium">
                          {t("Date")}:
                          <span className="font-normal bg-gray-200 p-1 text-xs px-1 rounded-md">
                            {new Date(request?.created_at)?.toLocaleDateString(
                              "en-UK"
                            )}
                          </span>
                        </p>
                        {request?.return_status?.numerical > 1 ? null : (
                          <button
                            className="flex gap-1 px-2 hover:bg-red-500 hover:text-white items-center border rounded-md border-red-500 text-red-500 p-1 text-xs"
                            onClick={() => cancelReturn(request?.id)}
                          >
                            <CloseIcon className="w-3 h-3" />
                            {t("cancel")}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>{t("empty_requests")}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserReturnOrders;
