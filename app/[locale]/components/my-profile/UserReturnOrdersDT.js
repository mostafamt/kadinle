"use client";
import {
  cancelReturnRequest,
  getReturnRequests,
} from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CloseIcon from "../Icons/CloseIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import { ReturnOrderForm } from "./ReturnOrderForm";
import Link from "next/link";
import Image from "next/image";
import { Loading } from "../global/Loading";

export const UserReturnOrdersDT = () => {
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
    <div className="w-[73%] md:w-[70%] min-w-[calc(100%-320px)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-opink capitalize font-medium md:text-lg">
          {t("return_order_msg")}
        </h3>
        <button
          onClick={() => setOpenFormReturn((p) => !p)}
          className="bg-opink text-white rounded-full p-1 text-xs"
        >
          {openFormReturn ? <CloseIcon className="w-4 h-4" /> : <PlusIcon />}
        </button>
      </div>
      {openFormReturn ? (
        <ReturnOrderForm setOpenFormReturn={setOpenFormReturn} />
      ) : (
        <>
          {loading && !preventLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-4">
              {returnRequests?.length ? (
                <>
                  {returnRequests?.map((request) => (
                    <div
                      key={request?.id}
                      className="border rounded-md p-4 mt-4 flex flex-col gap-1"
                    >
                      <div className="flex gap-2 items-center justify-between w-full">
                        <h3 className="flex gap-2 font-medium">
                          {t("Order")}:
                          <span className="font-normal">
                            {request?.order?.order_number}
                          </span>
                        </h3>
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
                      <h4 className="flex gap-2 font-medium">
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
                      </h4>
                      {request?.images?.length ? (
                        <div className="flex flex-wrap mb-2 items-start gap-2">
                          {request?.images?.map((img) => (
                            <Image
                              src={img}
                              key={img}
                              alt="returns"
                              className="w-12 object-contain border rounded-md"
                              height={64}
                              width={48}
                            />
                          ))}
                        </div>
                      ) : null}
                      <div className="flex justify-between items-center gap-4">
                        <p className="flex items-center gap-2 text-sm font-medium">
                          {t("Status")}:
                          <span className="font-normal bg-gray-200 p-1 text-xs px-4 rounded-md">
                            {
                              request?.return_status?.return_status_content?.find(
                                (r) => r?.language_id === language?.id
                              )?.status
                            }
                          </span>
                        </p>
                        <p className="flex items-center gap-2 text-sm font-medium">
                          {t("Date")}:
                          <span className="font-normal bg-gray-200 p-1 text-xs px-4 rounded-md">
                            {new Date(request?.created_at)?.toLocaleDateString(
                              "en-UK"
                            )}
                          </span>
                        </p>
                        {request?.return_status?.numerical > 1 ? null : (
                          <button
                            className="flex gap-1 px-4 hover:bg-red-500 hover:text-white items-center border rounded-md border-red-500 text-red-500 p-1 text-xs"
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
                <p>{t("no_results")}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
