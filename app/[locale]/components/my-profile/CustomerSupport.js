"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { submitTicket } from "@/app/api/supabase/user";
import { generateMail } from "@/app/api/emails/sender";

export const CustomerSupport = ({ locale }) => {
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
    <div className="flex flex-col">
      <div className="w-full pb-4 border-b">
        <div className="self-center flex justify-center mt-8 ">
          <Image
            className="w-[75%] max-w-[250px] object-contain"
            src={"https://kadinle.com/media/images/customer.svg"}
            height={180}
            width={200}
            alt="customer support"
          />
        </div>
      </div>

      <p className="self-center text-[12px] font-semibold mt-1">
        {t("Customer_Support_msg1")}
      </p>
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
        <div className="h-[34px] bg-owhite max-w-[95%] mx-auto border border-opink flex items-center ltr:pl-3 rtl:pr-3 !rounded-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center flex-1">
              <Image
                className="w-5 h-5 object-contain"
                src={"https://kadinle.com/media/images/user-comment.svg"}
                height={20}
                width={20}
                alt="message"
              />
              <input
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                className="focus:outline-none flex-1 w-full bg-owhite text-[11px]"
                placeholder={t("Contact_live_chat")}
              />
            </div>

            <button
              onClick={submitMsg}
              className="w-6 h-6 rounded-full bg-opink flex items-center justify-center"
            >
              <Image
                className="w-[10px] rtl:rotate-180"
                src={"https://kadinle.com/media/images/doubleArrow.png"}
                alt="send"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="self-center flex flex-col ">
        <figure className="bg-white rounded-full flex items-center justify-center h-[50] w-[50px]">
          <Image
            className="w-[35px] h-[20px] mt-6 self-center object-contain"
            src={"https://kadinle.com/media/images/pink-mail.svg"}
            height={50}
            width={50}
            alt="mail"
          />
        </figure>
        <div className="flex flex-col">
          <p className="text-[12px] text-[#6C8394] mt-2 mb-[2px]">
            {t("Customer_Support_msg3")}
          </p>
          <p className="text-opink text-[11px] ">Kadinle@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
