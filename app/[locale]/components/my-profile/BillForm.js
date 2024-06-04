"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { InputField } from "../forms/InputField";
import { CustomModal } from "../modal/CustomModal";
import { addBillReport } from "@/app/api/supabase/orders";

export const BillForm = ({ billInfo, open, onClose }) => {
  const t = useTranslations();
  const [reportText, setReportText] = useState("");
  // add bill report
  const onClickAdd = async (e) => {
    e.preventDefault();

    if (reportText) {
      const res = await addBillReport({
        report: reportText,
        ...billInfo,
      });
      if (res?.error) {
        toast.error(t("bill_report_error"));
        setReportText("");
        onClose();
      } else {
        toast.success(t("bill_report_success"));
      }
    } else {
      toast.error(t("bill_report_empty_field"));
    }
  };

  return (
    <CustomModal containerClassName="!z-[6010]" open={open} onClose={onClose}>
      <form onSubmit={onClickAdd} className="flex flex-col gap-4 py-4">
        <h3 className="mb-2 text-center text-opink text-xl font-semibold capitalize">
          {t("add_bill_report")}
        </h3>
        <p className="bg-gray-200 capitalize w-fit px-4 p-1 rounded-md">
          {t("bill_number")}: {billInfo?.bill_id}
        </p>
        <InputField
          long
          onChange={(e) => setReportText(e.target.value)}
          value={reportText}
          fieldClassName="min-h-[100px] min-w-[300px] md:min-w-[500px] p-4"
        />
        <button
          disabled={!reportText}
          className="mt-6 text-white disabled:bg-slate-400 bg-opink p-2 rounded-md px-4 capitalize"
        >
          {t("send")}
        </button>
      </form>
    </CustomModal>
  );
};
