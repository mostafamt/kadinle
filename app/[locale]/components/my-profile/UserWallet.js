"use client";

import React, { useContext, useEffect, useState } from "react";

import { Loading } from "../global/Loading";
import { WalletCard } from "./WalletCard";
import WalletForm from "./WalletForm";
import { WalletSendForm } from "./WalletSendForm";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { getUserData, getUserWalletHistory } from "@/app/api/supabase/user";
import { getFormatPrice } from "@/app/api/lib/functions";

export const UserWallet = () => {
  const t = useTranslations();
  const { user, currency } = useGlobalOptions();
  const [openForm, setOpenForm] = useState("");
  const [userData, setUserData] = useState({});
  const [walletHistory, setWalletHistory] = useState([]);
  const [refreshWallet, setRefreshWallet] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getUserData().then((res) => {
      setUserData(res?.data?.[0]);
    });

    getUserWalletHistory(user?.id).then((res) => {
      setWalletHistory(res?.data);
      setLoading(false);
    });
  }, [refreshWallet, user?.id]);

  return (
    <>
      <div className=" mt-12">
        <div className="bg-yellow-50 overflow-auto scroll-hide rounded-md py-3 p-2 gap-2 justify-between flex items-center mb-4">
          <h2 className="text-lg xs:text-xl whitespace-nowrap text-yellow-600 font-semibold">
            {userData?.wallet ? getFormatPrice(userData?.wallet, currency) : 0}
          </h2>
          <div className="flex items-center gap-2">
            {openForm !== "ADD" ? (
              <button
                onClick={() => setOpenForm("ADD")}
                className="bg-green-400 text-white p-1 xs:p-2 rounded-md text-[10] xs:text-xs capitalize"
              >
                {t("add_money")}
              </button>
            ) : null}
            {openForm !== "SEND" ? (
              <button
                onClick={() => setOpenForm("SEND")}
                className="bg-opink text-white p-1 xs:p-2 rounded-md text-[10] xs:text-xs capitalize"
              >
                {t("send_money")}
              </button>
            ) : null}
          </div>
        </div>

        {openForm === "SEND" ? (
          <div className="mt-6">
            <h4 className="text-black text-center text-lg font-semibold  capitalize">
              {t("send_money")}
            </h4>
            <WalletSendForm
              setOpenForm={setOpenForm}
              setRefreshWallet={setRefreshWallet}
            />
          </div>
        ) : (
          <>
            {openForm === "ADD" ? (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-gray-500 ">{t("add_money")}</label>
                  <button
                    onClick={() => setOpenForm("")}
                    className="bg-red-500 text-white p-2 text-xs rounded-md"
                  >
                    {t("cancel")}
                  </button>
                </div>
                <WalletForm />
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-4 text-red-500 border-b border-gray-200">
                  {t("Wallet_History")}
                </h3>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {walletHistory?.length ? (
                      <div className="flex flex-col gap-4">
                        {walletHistory?.map((item, idx) => (
                          <div key={item?.id} className="flex flex-col gap-4">
                            {walletHistory?.map((item, idx) => (
                              <WalletCard key={item?.id} wallet={item} />
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="bg-white text-grey-500 p-2 rounded-md text-sm">
                        {t("wallet_empty")}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
