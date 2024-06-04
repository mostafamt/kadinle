"use client";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { UserCard } from "./UserCard";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { getCurrencies } from "@/app/api/supabase/shared";
import {
  checkIfEmailExist,
  getUserData,
  sendMoney,
} from "@/app/api/supabase/user";
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";
import { getFormatPrice } from "@/app/api/lib/functions";
import { LoadingSpinier } from "../global/LoadingSpinier";

export const WalletSendForm = ({ setOpenForm, setRefreshWallet }) => {
  const t = useTranslations();
  const { user, currency } = useGlobalOptions();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});

  const onChangeCurrency = (currencyId) => {
    setSelectedCurrency(currencies?.find((c) => c?.id === currencyId));
  };

  useEffect(() => {
    getCurrencies().then((response) => {
      setCurrencies(response);
      setSelectedCurrency(
        response?.find((c) => c?.id === currency?.currency?.id)
      );
    });
  }, []);

  const onBlurEmail = async () => {
    setLoadingEmail(true);
    if (!email) {
      toast.error(t("email_is_required"));
      setLoadingEmail(false);
      return;
    }
    if (email?.indexOf("@") === -1) {
      setEmailNotFound(true);
      setLoadingEmail(false);
      return;
    }

    const response = await checkIfEmailExist(email);
    if (!response?.error) {
      setUserInformation(response?.data?.at(0));
      setEmailNotFound(false);
    } else {
      setUserInformation({});
      setEmailNotFound(true);
    }
    setLoadingEmail(false);
  };

  const onSubmitSend = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!email || email?.indexOf("@") === -1) {
      toast.error(t("valid_email"));
      setIsLoading(false);
      return;
    }

    if (!amount) {
      toast.error(t("wallet_required"));
      setIsLoading(false);
      return;
    }

    const userInfoResponse = await getUserData(user?.id);
    const wallet = userInfoResponse?.data?.[0]?.wallet;

    if (wallet < amount) {
      toast.error(t("less_amount"));
      setIsLoading(false);
      return;
    }

    let newAmount = amount;
    if (selectedCurrency?.rate) {
      // convert to USD amount
      newAmount = parseInt(amount / selectedCurrency.rate);
    } else {
      newAmount = parseInt(amount * selectedCurrency.rate);
    }

    const response = await sendMoney(newAmount, email);
    if (response?.error === "NO_EMAIL") {
      toast.error(t("email_not_found"));
      setIsLoading(false);
      return;
    }
    if (response?.error) {
      toast.error(t("wallet_send_error"));
      return;
    } else {
      toast.success(t("wallet_send_success") + email);
      setRefreshWallet((p) => !p);
      setAmount(0);
      setEmail("");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmitSend} className="flex flex-col text-sm gap-2">
      <InputField
        containerClassesName="flex-1"
        type="email"
        required
        value={email}
        label={t("email")}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={onBlurEmail}
        onFocus={() => setLoadingEmail(true)}
      />
      <SelectField
        containerClassesName="flex-1"
        list={currencies}
        label={t("currency")}
        onChange={(e) => onChangeCurrency(e.target.value)}
      />
      <InputField
        containerClassesName="flex-1"
        type="number"
        step="1"
        value={amount}
        label={t("Amount_Total")}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <div className="mt-4 border-t pt-2 border-gray-200">
        {emailNotFound && !loadingEmail && !userInformation?.id ? (
          <p>{t("email_not_found")}</p>
        ) : null}
        {loadingEmail && !userInformation?.id ? <LoadingSpinier /> : null}
        {userInformation?.id ? <UserCard user={userInformation} /> : null}
      </div>
      {amount ? (
        <p>
          {t("Amount_Total")}:{" "}
          <span className="font-medium bg-white px-4 py-[2px] mx-1 border-gray-300 border rounded-md">
            {getFormatPrice(amount, { currency: selectedCurrency }, true)}
          </span>
        </p>
      ) : null}
      <div className="flex gap-2 items-center mt-4">
        <button
          disabled={isLoading}
          className="w-full disabled:bg-gray-300 disabled:text-gray-700 max-w-[250px] hover:shadow-md p-2 rounded-md text-sm bg-opink text-white "
        >
          {t("send")}
        </button>
        <button
          disabled={isLoading}
          onClick={() => setOpenForm("")}
          className="border border-red-500 text-red-500 disabled:bg-gray-300 disabled:text-gray-700 disabled:border-0 hover:text-white hover:bg-red-500 p-2 text-sm rounded-md capitalize"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
};
