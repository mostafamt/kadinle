"use client";

import { addMoney } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { InputField } from "../forms/InputField";

const WalletForm = ({ setRefreshWallet }) => {
  const t = useTranslations();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);

  const handleCardTokenization = async (token, buyer) => {
    setIsLoading(true);
    setAmount();
    try {
      const response = await fetch("https://kadinle.com/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          amount: parseFloat(amount), // replace with your actual order amount
          // locationId: "LB74FF0HEHXM3",
          locationId: "LWCKN62YQH68E",
          sourceId: token?.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      await addMoney(amount);
      setRefreshWallet((p) => !p);
      setIsLoading(false);
      setErrorMessage("");
      setPaymentResult(t("Payment_processed_successfully"));
    } catch (error) {
      setIsLoading(false);
      setPaymentResult("");
      setErrorMessage(t("Payment_failed"));
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="fixed bg-[#00000090] z-[9999] w-full h-full flex top-0 left-0 bottom-0 ring-0">
          <div className="text-white m-auto flex flex-col items-center justify-center">
            <div className="animate-ping h-10 w-10 rounded-full mb-4 bg-white " />
            {t("loading")}
          </div>
        </div>
      ) : null}
      {errorMessage && (
        <div className="p-1 rounded-md text-red-500 bg-red-100 text-center my-4">
          {errorMessage}
        </div>
      )}
      {paymentResult && (
        <div className="p-1 rounded-md text-green-500 bg-green-100 text-center my-4">
          {paymentResult}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <InputField
          label={t("Amount")}
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.targe.value)}
        />
        <PaymentForm
          cardTokenizeResponseReceived={handleCardTokenization}
          // applicationId="sq0idp-1IrXyUmxoUgY-Ral_oGUSg"
          // locationId="LB74FF0HEHXM3"
          applicationId="sandbox-sq0idb-d8ebP8j_TMCDQNFLqwd2hg"
          locationId="LWCKN62YQH68E"
        >
          <CreditCard />
        </PaymentForm>
      </div>
    </>
  );
};

export default WalletForm;
