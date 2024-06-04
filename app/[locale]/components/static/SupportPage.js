"use client";

import { generateMail } from "@/app/api/emails/sender";
import { submitSuggestion } from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { MainTitle } from "../global/MainTitle";

const SupportPage = ({ locale }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [suggestion, setSuggestion] = useState("");
  const [ticket, setTicket] = useState("");

  const submitMsg = () => {
    if (!suggestion) {
      toast.error(t("suggestion_required"));
      return;
    }
    if (!user) {
      toast.error(t("logged_msg"));
      return;
    }
    submitSuggestion(suggestion).then((res) => {
      if (!res.error) {
        toast.success(t("suggestion_msg"));
        generateMail("suggestions_msg", {
          customer_name:
            user?.user_metadata?.first_name +
            " " +
            user?.user_metadata?.last_name,
          lang: locale,
        });
      } else {
        toast.error(t("suggestion_error"));
      }
      setSuggestion("");
    });
  };
  const submitTicket = () => {
    if (!ticket) {
      toast.error(t("ticket_required"));
      return;
    }
    if (!user) {
      toast.error(t("logged_msg"));
      return;
    }
    submitTicket(ticket).then((res) => {
      if (!res.error) {
        toast.success(t("support_msg"));
        generateMail("received_problem_msg", {
          customer_name:
            user?.user_metadata?.first_name +
            " " +
            user?.user_metadata?.last_name,
          lang: locale,
        });
      } else {
        toast.error(t("support_error"));
      }
      setSuggestion("");
    });
  };
  return (
    <>
      <ScrollUpComponent />
      <div className="flex flex-col poppins mb-10">
        <MainTitle title={t("Talk_to_support")} />
        <div className="container mt-8 mx-auto">
          <h2 className="text-gray-500 mb-4 max-w-[700px] mx-auto">
            {t("support_msg_1")}
          </h2>
          <ul className="px-4 list-disc justify-center mx-auto max-w-[500px] flex flex-col gap-4">
            <li>
              <label className="mb-4">{t("support_msg_2")}</label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="p-2  text-xs px-4 border rounded-md resize-none w-full min-h-[100px]"
              />
              <button
                onClick={submitMsg}
                className="bg-opink text-white text-xs px-8 p-1 rounded-md "
              >
                {t("send")}
              </button>
            </li>
            <li>
              <label className="mb-4">{t("support_msg_3")}</label>
              <textarea
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                className="p-2  text-xs px-4 border rounded-md resize-none w-full min-h-[100px]"
              />
              <button
                onClick={submitTicket}
                className="bg-opink text-white text-xs px-8 p-1 rounded-md "
              >
                {t("send")}
              </button>
            </li>
            {/* <li>
              <p className="mb-4">{t("support_msg_4")}</p>
            </li> */}
            {/* <Link href="" className="!text-opink">
              {t("support_msg_5")}
            </Link> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
