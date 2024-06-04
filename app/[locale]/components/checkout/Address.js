"use client";
import { getUserAddresses } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutBar } from "./CheckoutBar";
import AddNewAddress from "../my-profile/AddNewAddress";
import { ShippingType } from "./ShippingType";
import Image from "next/image";

const Address = ({
  shipping_adress,
  setShipping_adress,
  setStage,
  warehouseInformation,
  shipping_type,
  setShipping_type,
  shippingsCosts,
  shipping_cost,
  loadingShipping,
  total,
}) => {
  const t = useTranslations();
  const [addresses, setAddresses] = useState([]);
  const [openFormAddress, setOpenFormAddress] = useState(false);

  const getAddresses = () => {
    getUserAddresses().then((res) => {
      setAddresses(res);
      setShipping_adress(res?.[0]);
    });
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const onClickCancel = () => {
    setOpenFormAddress(false);
    getAddresses();
  };

  return (
    <div className="flex flex-col w-full">
      <CheckoutBar stage={2} />

      <p className="font-[700] text-[15px] mt-2 mb-1">{t("addressData")}</p>

      <div className="flex flex-col text-[12px] mt-[6px] space-y-3 border-b pb-4">
        {openFormAddress ? (
          <AddNewAddress
            onClickCancel={onClickCancel}
            containerClassName="!w-full"
            formClassName="!p-0 !my-4"
          />
        ) : (
          <div className="flex flex-col text-xs gap-4">
            {addresses?.map((address) => {
              return (
                <label
                  key={address?.id}
                  className={`flex items-center gap-1 border rounded-xl p-2 px-4 capitalize ${
                    shipping_adress?.id === address?.id
                      ? "bg-opink text-white"
                      : ""
                  }`}
                >
                  <span>{address?.name}</span>
                  <input
                    checked={shipping_adress?.id === address?.id}
                    className="accent-opink"
                    type="radio"
                    name="Address"
                    value={address?.id}
                    onChange={(e) => setShipping_adress(address)}
                  />
                  {address?.line_one} , {address?.city}
                </label>
              );
            })}
            <button
              onClick={() => setOpenFormAddress(true)}
              className="border-opink border text-opink rounded-xl p-2"
            >
              {t("Add_new_address")}
            </button>
          </div>
        )}
      </div>
      <ShippingType
        setShipping_adress={setShipping_adress}
        warehouseInformation={warehouseInformation}
        setShipping_type={setShipping_type}
        shipping_type={shipping_type}
        shipping_cost={shipping_cost}
        shippingsCosts={shippingsCosts}
        total={total}
        loadingShipping={loadingShipping}
      />
      <p className="font-[700] text-[15px] mt-4 capitalize mb-2">
        {t("availablePaymentMethod")}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-center space-y-[3px]">
          <Image
            className="w-[42px] h-[15px] object-cover"
            src={"https://kadinle.com/media/images/visa.png"}
            height={50}
            width={70}
            alt="visa"
          />
        </div>

        <div className="flex flex-col justify-center items-center space-y-[3px]">
          <Image
            className="w-[38px] h-[15px] object-cover"
            src={"https://kadinle.com/media/images/applePay.png"}
            height={50}
            width={70}
            alt="applePay"
          />
        </div>

        <div className="flex flex-col justify-center items-center space-y-[3px]">
          <Image
            className="w-[22px] h-[15px] object-cover"
            src={"https://kadinle.com/media/images/googlePay.png"}
            height={50}
            width={70}
            alt="googlePay"
          />
        </div>

        <div className="flex flex-col justify-center items-center space-y-[3px]">
          <Image
            className="w-[28px] h-[15px] object-cover"
            src={"https://kadinle.com/media/images/americanExpress.png"}
            height={50}
            width={70}
            alt="American Express"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
