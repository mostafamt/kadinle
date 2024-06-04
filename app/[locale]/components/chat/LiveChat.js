"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "../Icons/ArrowBackIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChatIcon } from "../Icons/ChatIcon";
import { ChevronIcon } from "../Icons/ChevronIcon";
import {
  createRoom,
  getChatMessages,
  getChatSettings,
  getRoomByUserId,
  insertMessage,
} from "@/app/api/supabase/chat";
import { ChatSingleMessage } from "./ChatSingleMessage";
import { BellOff } from "../Icons/BellOff";
import { _supabase } from "@/app/api/supabase/supabase.config";
import ChatDotIcon from "../Icons/ChatDotIcon";

export const LiveChat = () => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const lastMessageRef = useRef();
  const [text, setText] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [unReadingCount, setUnReadingCount] = useState(0);
  const [chatSettings, setChatSettings] = useState({});
  const chatMessagesRef = useRef();

  const getSettings = async () => {
    const res = await getChatSettings();
    setChatSettings(res?.data?.at(0));
  };

  useEffect(() => {
    if (!roomId) return;

    const channel = _supabase
      .channel("realtime chat")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat",
          filter: "room_id=eq." + roomId,
        },
        (payload) => {
          if (payload?.new) {
            setMessages((prev) => [...prev, payload?.new]);
            if (openChat) return;
            setUnReadingCount((p) => p + 1);
            const audio = new Audio("/notification.mp3");
            audio.play();
          }
        }
      )
      .subscribe();
    console.log(channel, "channel");
    return () => {
      _supabase.removeChannel(channel);
    };
  }, [roomId]);

  // scroll to the bottom of the chat-messages container on messages update
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo(0, chatMessagesRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    if (!roomId) return;
    const fetchMessages = async () => {
      const res = await getChatMessages(roomId);
      setMessages(res?.data);
    };
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (openChat) setUnReadingCount(0);
  }, [openChat]);

  const openChatRoom = async () => {
    setOpenChat(true);

    if (!user?.id) return;

    let chatData = {
      user_id: user?.id,
      room_id: roomId,
      isClient: true,
    };

    if (!roomId) {
      let response = await getRoomByUserId(user?.id);

      if (!response?.data?.length) {
        response = await createRoom(user?.id);
      }
      let roomId = response?.data?.at(0)?.id;
      chatData.room_id = roomId;
      setRoomId(roomId);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (text === "" || !roomId) return;

    const msg = {
      text,
      user_id: user?.id,
      room_id: roomId,
      sender: "CLIENT",
    };

    await insertMessage(msg);
    setText("");
  };

  if (!chatSettings?.display) return;

  return (
    <>
      {openChat ? (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[10001] bg-[#0003]"
            onClick={() => setOpenChat(false)}
          />
          <div className="fixed top-0 left-0 z-[10002] text-xs h-screen w-screen chat-parent">
            <div className="shadow-md border-gray-200 w-full h-full overflow-hidden">
              <div className="flex items-center justify-between gap-4 p-2 py-4 bg-[#129b9b] text-white">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://kadinle.com/media/images/logo-icon.png"
                    alt="kadinle logo"
                    height={40}
                    width={40}
                    className="w-[40px] object-contain bg-white rounded-full p-1 shadow"
                  />
                  <div className="flex flex-col">
                    <h3 className="capitalize font-medium">
                      {t("live_chat_with_kadinle")}
                    </h3>
                    <p className="flex items-center gap-2 text-xs">
                      <span
                        className={`h-3 w-3 rounded-full border-2 border-white ${
                          chatSettings?.status ? "bg-green-500" : "bg-red-700"
                        }`}
                      />
                      <span className={`capitalize`}>
                        {t(chatSettings?.status ? "online" : "offline")}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenChat(false)}
                  className="flex items-center justify-center h-8 w-8 bg-white shadow rounded-full p-2"
                >
                  <ChevronIcon className="h-6 w-6 text-gray-500 " />
                </button>
              </div>
              <div
                className="bg-white h-full overflow-auto flex flex-col gap-4 pt-4 pb-[80px] px-4"
                ref={lastMessageRef}
              >
                {messages?.map((item, index) => (
                  <ChatSingleMessage item={item} user={user} key={item?.id} />
                ))}
              </div>

              {chatSettings?.status ? (
                <>
                  {user?.id ? (
                    <>
                      {roomId ? (
                        <form
                          onSubmit={handleSendMessage}
                          className="flex p-1 border-t-2 bg-white gap-2  shadow absolute bottom-0 left-0 w-full"
                        >
                          <input
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            className="flex-1 px-4 rounded-md focus:ring-1"
                            placeholder={t("chat_placeholder")}
                          />
                          <button className="ltr:rotate-180 h-9 w-9 group flex items-center justify-center rounded-full bg-[#129b9b] border border-[#129b9b] hover:bg-transparent hover:bg-white">
                            <ArrowBackIcon className="h-5 w-5 group-hover:!text-[#129b9b] text-white" />
                          </button>
                        </form>
                      ) : (
                        <button
                          className="bg-primary text-white rounded-lg px-4 py-2 absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2"
                          onClick={openChatRoom}
                        >
                          {t("start_chat")}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="flex flex-1 p-1 py-4 border-t-2 text-red-500 justify-center bg-gray-200 gap-2 shadow absolute bottom-0 left-0 w-full">
                      {t("you_must_logged")}
                    </p>
                  )}
                </>
              ) : (
                <p className="flex flex-1 p-1 py-4 border-t-2 text-red-500 justify-center bg-gray-100 gap-2 shadow absolute bottom-0 left-0 w-full">
                  <BellOff />
                  {t("chat_closed_time")}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={() => setOpenChat(true)}
          className="fixed bottom-20 right-10 z-[10000] bg-primary h-12 w-12 flex items-center justify-center rounded-full"
        >
          <ChatDotIcon className="w-8 h-8 text-white" />
        </button>
      )}
    </>
  );
};
