"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";
import { submitSuggestion } from "@/app/api/supabase/user";
import { generateMail } from "@/app/api/emails/sender";
import Image from "next/image";

export const UserSuggestion = ({ setActiveTab, user, locale }) => {
  const t = useTranslations();
  const [ticket, setTicket] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const submitMsg = () => {
    if (ticket) {
      submitSuggestion(ticket).then((res) => {
        if (!res.error) {
          setMsg(t("suggestion_msg"));
          setError("");
          generateMail("suggestions_msg", {
            customer_name:
              user?.user_metadata?.first_name +
              " " +
              user?.user_metadata?.last_name,
            lang: locale,
          });
        } else {
          setMsg("");
          setError(t("suggestion_error"));
        }
        setTicket("");
      });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="w-full pb-1">
        <div className="self-center flex justify-center mt-8 ">
          <Image
            className="w-[75%] max-w-[250px] h-auto"
            src={"https://kadinle.com/media/images/suggestion.svg"}
            alt="suggest"
            height={200}
            width={220}
          />
        </div>
      </div>
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

      <p className="text-[12px] text-[#6C8394] mt-4 mb-2">
        {t("What_are_you_thinking")}
      </p>

      <textarea
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        className="outline-none text-[11px] ltr:pl-4 rtl:pr-4 py-3 resize-none bg-owhite w-full border rounded-[7px] h-[200px] border-opink"
        placeholder={t("write_here_your_suggestion")}
      />

      <button
        onClick={submitMsg}
        className="w-full bg-opink py-2 rounded-full text-owhite text-[12px] mt-4"
      >
        {t("Send_Suggestion")}
      </button>
    </div>
  );
};
