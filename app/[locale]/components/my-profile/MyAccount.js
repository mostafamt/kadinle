"use client";
import Cookies from "js-cookie";

import {
  getOrderStatus,
  getUserAddresses,
  getUserData,
  listUserOrders,
} from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { MobileNav } from "../header/MobileNav";
import { UserHead } from "./UserHead";
import { ProfileList } from "./ProfileList";
import UserReturnOrders from "./UserReturnOrders";
import UserOrders from "./UserOrders";
import { UserReports } from "./UserReports";
import { UserFavorites } from "./UserFavorites";
import { UserPoints } from "./UserPoints";
import { UserWallet } from "./UserWallet";
import { UserInvitedFriends } from "./UserInvitedFriends";
import { UserAddresses } from "./UserAddresses";
import { UserCountry } from "./UserCountry";
import { UserSuggestion } from "./UserSuggestion";
import { CustomerSupport } from "./CustomerSupport";
import { UserView } from "./UserView";
import ProfileInfo from "./ProfileInfo";
import { MySizeInfo } from "../global/MySizeInfo";

const TITLES = [
  "All_my_Orders",
  "return_orders",
  "reports",
  "My_Favourites",
  "My_Points",
  "My_Wallet",
  "Country",
  "My_Addresses",
  "Invite_friend",
  "Suggestion",
  "Customer_Support",
  "control_view",
];
let Stack = [];
export const MyAccount = ({ layout, locale }) => {
  const router = useRouter();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("");
  const [userData, setUserData] = useState([]);
  const [refreshUser, setRefreshUser] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [orders, setOrders] = useState();
  const [orderStatus, setOrderStatus] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [refreshAddresses, setRefreshAddresses] = useState(false);

  const getUser = async () => {
    const { data } = await getUserData();
    setUserData(data?.at(0));
  };

  useEffect(() => {
    if (activeTab === "") Stack = [];
    else Stack.push(activeTab);
  }, [activeTab]);

  useEffect(() => {
    getUser();
  }, [refreshUser]);

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
    let orderList = await listUserOrders();
    setOrders(orderList?.data);
  };

  useEffect(() => {
    getStatus();
    getOrders();
  }, []);

  useEffect(() => {
    getUserAddresses().then((data) => {
      setAddresses(data);
    });
    getUser();
  }, [refreshAddresses]);

  const handleBack = () => {
    if (currentPath) {
      setActiveTab(currentPath);
      setCurrentPath("");
    } else {
      if (activeTab) setActiveTab("");
      else router.back();
    }
  };

  return (
    <div className="mb-16">
      <ScrollUpComponent />
      <MobileNav
        title={t(TITLES?.[activeTab - 1] || "My_Profile")}
        handleBack={() => handleBack()}
      />
      <div className="px-4">
        {!activeTab ? (
          <>
            <UserHead
              userData={userData}
              setRefresh={setRefreshUser}
              setActiveTab={setActiveTab}
              setUserData={setUserData}
            />
            <ProfileList setActiveTab={setActiveTab} activeTab={activeTab} />
          </>
        ) : null}
        {activeTab === 1 ? (
          <UserOrders
            setActiveTab={setActiveTab}
            setCurrentPath={setCurrentPath}
            orders={orders}
            orderStatus={orderStatus}
            locale={locale}
          />
        ) : null}
        {activeTab === 2 ? (
          <UserReturnOrders setActiveTab={setActiveTab} />
        ) : null}
        {activeTab === 3 ? <UserReports /> : null}
        {activeTab === 4 ? <UserFavorites /> : null}
        {activeTab === 5 ? <UserPoints /> : null}
        {activeTab === 6 ? (
          <UserWallet setActiveTab={setActiveTab} activeTab={activeTab} />
        ) : null}
        {activeTab === 7 ? <UserCountry /> : null}
        {activeTab === 8 ? (
          <UserAddresses
            setRefreshAddresses={setRefreshAddresses}
            userData={userData}
            addresses={addresses}
          />
        ) : null}
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
        {activeTab === 14 ? <MySizeInfo /> : null}
      </div>
    </div>
  );
};
