"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  FacebookMessengerShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import { Loading } from "../global/Loading";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ListInvited, inviteFriend } from "@/app/api/supabase/user";

export const UserInvitedFriends = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [invitedList, setInvitedList] = useState([]);

  const getInvited = async () => {
    setIsLoading(true);
    const response = await ListInvited();
    setInvitedList(response?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getInvited();
  }, []);

  const submitMsg = () => {
    if (email && email?.indexOf("@") !== 0 - 1) {
      inviteFriend(email).then((res) => {
        if (!res.error) {
          setMsg(t("invite_success"));
          setError("");
          getInvited();
        } else {
          setMsg("");
          setError(t("invite_error"));
        }
        setEmail("");
      });
    } else {
      setError(t("valid_email"));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full pb-1">
        <div className="self-center flex justify-center mt-2 ">
          <Image
            className="w-[85%] max-w-[270px] max-h-[270px] h-auto object-contain"
            src={"https://kadinle.com/media/images/invite.svg"}
            alt="invite friend"
            height={270}
            width={270}
          />
        </div>
      </div>

      <div className="self-center flex flex-col justify-center items-center">
        <p className="text-[12px]  mt-4 mb-2">{t("invite_msg1")}</p>
        <p className="text-[12px] text-[#6C8394]  mb-2">{t("invite_msg2")}</p>
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

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        className="text-[11px] border bg-owhite rounded-md py-2 ltr:pl-4 rtl:pr-4 border-gray-400 mt-2"
        placeholder={t("Email_address")}
      />

      <button
        onClick={submitMsg}
        className="w-[120px] bg-opink self-center py-2 rounded-full text-owhite text-[12px] mt-4"
      >
        {t("Send_Invite")}
      </button>

      <p className="text-[14px] text-[#6C8394]  mb-2 self-center my-2">
        {t("OR")}
      </p>

      <div className="self-center flex gap-4 items-center">
        <WhatsappShareButton
          title="kadinle"
          separator=""
          url={typeof window === "object" ? window.location?.origin : null}
        >
          <Image
            className="w-[25px] 2xl:w-[30px] object-contain cursor-pointer"
            src={"https://kadinle.com/media/images/whatsapp.svg"}
            alt="whatsapp"
            height={25}
            width={30}
          />
        </WhatsappShareButton>
        <TelegramShareButton
          title="kadinle"
          url={typeof window === "object" ? window.location?.origin : null}
        >
          <Image
            className="w-[25px] 2xl:w-[30px] object-contain cursor-pointer"
            src={"https://kadinle.com/media/images/telegram.svg"}
            alt="telegram"
            height={25}
            width={30}
          />
        </TelegramShareButton>
        <FacebookMessengerShareButton
          title="kadinle"
          url={typeof window === "object" ? window.location?.origin : null}
        >
          <Image
            className="w-[25px] 2xl:w-[30px] object-contain cursor-pointer"
            src={"https://kadinle.com/media/images/messenger.svg"}
            alt="messenger"
            height={25}
            width={30}
          />
        </FacebookMessengerShareButton>
        <InstapaperShareButton
          title="kadinle"
          url={typeof window === "object" ? window.location?.origin : null}
        >
          <Image
            className="w-[25px] 2xl:w-[30px] object-contain cursor-pointer"
            src={"https://kadinle.com/media/images/instagram.svg"}
            alt="instagram"
            height={25}
            width={30}
          />
        </InstapaperShareButton>
      </div>

      <div className="flex flex-col text-[12px] mt-12">
        <p className="text-[12px] mb-2">{t("Invited")}</p>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {invitedList?.length ? (
              <div className="flex flex-col">
                {invitedList?.map((invite) => (
                  <div
                    className="flex justify-between items-center mb-4"
                    key={invite?.id}
                  >
                    <div className="flex gap-3 items-center">
                      <span className="p-2 h-10 w-10 rounded-full flex items-center justify-center capitalize text-white bg-purple-300">
                        {invite?.email?.[0]}
                      </span>
                      <p className="w-[100px]">{invite?.email}</p>
                    </div>
                    <p className="text-[11px] 2xl:text-[15px] w-[120px] text-opink">
                      {invite?.status ? t("signed_up") : t("PENDING")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>{t("no_results")}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
