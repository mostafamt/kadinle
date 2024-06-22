"use client";
import React, { useContext, useEffect, useState } from "react";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { ProfileList } from "./ProfileList";
import { useRouter } from "next/navigation";
import {
  getOrderStatus,
  getUserData,
  listUserOrders,
} from "@/app/api/supabase/user";
import { UserOrders } from "./UserOrders";
import { UserReturnOrders } from "./UserReturnOrders";
import { UserReports } from "./UserReports";
import { UserFavorites } from "./UserFavorites";
import { UserPoints } from "./UserPoints";
import { UserWallet } from "./UserWallet";
import { UserCountry } from "./UserCountry";
import { UserAddresses } from "./Address";
import { UserInvitedFriends } from "./UserInvitedFriends";
import { UserSuggestion } from "./UserSuggestion";
import { CustomerSupport } from "./CustomerSupport";
import { UserView } from "./UserView";
import ProfileInfo from "./ProfileInfo";
import { MySizeInfo } from "../global/MySizeInfo";
import { ProfileListDT } from "./ProfileListDT";
import UserOrdersDT from "./UserOrdersDT";
import { UserReturnOrdersDT } from "./UserReturnOrdersDT";

export const MyAccountDT = ({ locale }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(13);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    setLoading(true);
    getUserData().then((res) => {
      if (!res?.error) setUserData(res?.data?.[0]);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (location?.state?.target) setActiveTab(location?.state?.target);
  }, []);

  const getStatus = async () => {
    const allStatus = await getOrderStatus();
    let hastStatus = {};
    for (const status of allStatus?.data) {
      hastStatus[status?.numerical] = status;
      hastStatus[status?.id] = status;
    }
    setOrderStatus(hastStatus);
  };

  const getOrders = async () => {
    setLoading(true);
    await listUserOrders().then((res) => {
      setOrders(res?.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrders();
    getStatus();
  }, []);

  return (
    <div className="flex flex-col poppins">
      <div className="flex justify-center mt-6 ">
        <div className="flex flex-col items-center container max-w-[1500px] bg-[#F5F6F8] px-2 md:px-6 pt-2 pb-4">
          <div className=" flex flex-col self-start w-full mb-2">
            <h3 className="text-[#727C8E] text-[19px] 2xl:text-[22px] ">
              {t("My_Profile")}
            </h3>
          </div>

          <div className="flex justify-between w-full gap-10">
            <ProfileListDT activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="bg-white flex-1 p-3">
              {activeTab === 1 ? (
                <UserOrdersDT
                  setActiveTab={setActiveTab}
                  locale={locale}
                  orderStatus={orderStatus}
                  orders={orders}
                />
              ) : null}
              {activeTab === 2 ? (
                <UserReturnOrdersDT setActiveTab={setActiveTab} />
              ) : null}
              {activeTab === 3 ? <UserReports /> : null}
              {activeTab === 4 ? <UserFavorites /> : null}
              {activeTab === 5 ? <UserPoints /> : null}
              {activeTab === 6 ? (
                <UserWallet setActiveTab={setActiveTab} activeTab={activeTab} />
              ) : null}
              {activeTab === 7 ? <UserCountry /> : null}
              {activeTab === 8 ? <UserAddresses /> : null}
              {activeTab === 9 ? <UserInvitedFriends /> : null}
              {activeTab === 10 ? (
                <UserSuggestion
                  setActiveTab={setActiveTab}
                  user={null}
                  locale={locale}
                />
              ) : null}
              {activeTab === 11 ? <CustomerSupport /> : null}
              {activeTab === 12 ? <UserView /> : null}
              {activeTab === 13 ? <ProfileInfo /> : null}
              {activeTab === 14 ? (
                <MySizeInfo containerClassName="flex flex-col bg-owhite w-[73%] md:w-[70%] min-w-[calc(100%-320px)] px-4 md:px-8 py-5 text-[14px] md:text-[16px] 2xl:text-[16px]" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
