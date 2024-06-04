"use client";
import { generateMail } from "@/app/api/emails/sender";
import { submitTicket } from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { InputField } from "../forms/InputField";

export const SupportBox = ({ locale }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [ticket, setTicket] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submitMsg = () => {
    if (ticket) {
      submitTicket(ticket).then((res) => {
        if (!res.error) {
          setMsg(t("Customer_Support_msg"));
          setError("");
          generateMail("received_problem_msg", {
            customer_name:
              user?.user_metadata?.first_name +
              " " +
              user?.user_metadata?.last_name,
            lang: locale,
          });
        } else {
          setMsg("");
          setError(t("Customer_Support_error"));
        }
        setTicket("");
      });
    }
  };

  return (
    <div className="shadow my-2 bg-white p-4">
      <h4 className="self-center text-[12px] font-semibold mt-1">
        {t("Customer_Support_msg1")}
      </h4>
      {error ? (
        <p className="p-2 text-sm bg-red-100 text-red-600 text-center my-4">
          {error}
        </p>
      ) : null}
      {msg ? (
        <p className="p-2 text-sm bg-green-100 text-green-600 text-center my-4">
          {msg}
        </p>
      ) : null}

      <p className="text-[12px] text-[#6C8394] mt-4">
        {t("Customer_Support_msg2")}
      </p>

      <div className="relative mt-2">
        <InputField
          long
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          fieldClassName="focus:outline-none flex-1 w-full bg-owhite text-[11px]"
          placeholder={t("Contact_live_chat")}
        />
        <button
          onClick={submitMsg}
          className="flex items-center justify-between bg-primary text-white p-2 rounded-md mt-4"
        >
          <span>{t("send")}</span>
        </button>
      </div>
    </div>
  );
};
