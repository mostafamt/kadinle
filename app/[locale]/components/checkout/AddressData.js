"use client";

import { getUserAddresses } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import AddNewAddress from "../my-profile/AddNewAddress";
import { ShippingType } from "./ShippingType";
import Link from "next/link";
import Image from "next/image";

const americanExpress = "https://kadinle.com/media/images/americanExpress.png";
const applePay = "https://kadinle.com/media/images/applePay.png";
const left = "https://kadinle.com/media/images/left.svg";
const mastercard = "https://kadinle.com/media/images/mastercard.png";
const googlePay = "https://kadinle.com/media/images/pay.png";
const select = "https://kadinle.com/media/images/select.png";
const selected = "https://kadinle.com/media/images/selected.png";
const visa = "https://kadinle.com/media/images/visa.png";

const AddressData = ({
  setStage,
  shipping_adress,
  setShipping_adress,
  warehouseInformation,
  setShipping_type,
  shipping_type,
  shipping_cost,
  shippingsCosts,
  total,
}) => {
  const t = useTranslations();
  const [error, setError] = useState("");
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

  const checkStage = () => {
    if (!shipping_adress) {
      setError(t("select_address_msg"));
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!shipping_type) {
      setError("select_shipping_type");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setStage("Summary");
  };

  const onClickCancel = () => {
    setOpenFormAddress(false);
    getAddresses();
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between gap-8">
        <div className="flex-1 w-full">
          {/* all addresses */}
          {openFormAddress ? (
            <AddNewAddress
              onClickCancel={onClickCancel}
              containerClassName="!w-full"
              formClassName="!p-0 !my-4"
            />
          ) : (
            <div className="flex flex-col gap-4">
              {addresses?.map((address) => {
                return (
                  <label
                    key={address?.name}
                    className={`flex items-center gap-1 border rounded-xl p-2 px-4 text-lg capitalize ${
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
          {/* add new Address */}
        </div>
        <div className="flex flex-col w-[35%]">
          <ShippingType
            warehouseInformation={warehouseInformation}
            setShipping_type={setShipping_type}
            shipping_type={shipping_type}
            shipping_cost={shipping_cost}
            shippingsCosts={shippingsCosts}
            total={total}
          />
        </div>
      </div>

      {/* <div className="flex flex-col">
        <p className="text-[12px] 2xl:text-[15px] mb-3 2xl:mb-5">
          {t("payments")}
        </p>
        <div className="flex gap-4 ">
          <div
            onClick={(e) => setPay(0)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <img
                className="w-[32px] 2xl:w-[52px] object-cover"
                src={mastercard}
                alt="master card"
              />
            </div>
          </div>
          <div
            onClick={(e) => setPay(1)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <img
                className="w-[43px] 2xl:w-[63px] object-cover"
                src={googlePay}
                alt="google play"
              />
            </div>
          </div>

          <div
            onClick={(e) => setPay(2)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <img
                className="w-[45px] 2xl:w-[65px] object-cover"
                src={applePay}
                alt="apple pay"
              />
            </div>
          </div>

          <div
            onClick={(e) => setPay(3)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <img
                className="w-[30px] 2xl:w-[40px] object-cover"
                src={americanExpress}
                alt="American Express"
              />
            </div>
          </div>

          <div
            onClick={(e) => setPay(4)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <img
                className="w-[60px] 2xl:w-[80px] object-cover"
                src={visa}
                alt="visa"
              />
            </div>
          </div>

          {/* <div
            onClick={(e) => setPay(5)}
            className="w-fit min-w-[120px] px-4 flex flex-col cursor-pointer justify-center items-center"
          >
            <div className="border w-[100%] max-w-[140px] rounded-[15px] min-h-[45px] 2xl:min-h-[65px] flex items-center justify-center">
              <p className="text-[10px] 2xl:text-[13px] px-2 text-center">
                {t("cash_on_delivery")}
              </p>
            </div>
          </div> 
        </div>
      </div> */}
      {error ? (
        <p className="my-4 bg-red-200 text-red-500 p-1 rounded-md text-center">
          {error}
        </p>
      ) : null}
      <div className="flex justify-between mt-6">
        <button
          onClick={(e) => setStage("Shopping Cart")}
          className="cursor-pointer flex gap-4 items-center"
        >
          <Image
            className="w-[10px] object-contain"
            src={left}
            alt="left"
            height={10}
            width={15}
          />
          <span className="text-[11px] 2xl:text-[15px]">{t("back")}</span>
        </button>

        <div className="flex gap-2 md:gap-5 w-[40%] max-w-[320px] ">
          <div className="rounded-full py-3 border border-opink w-[65%] max-w-[165px] 2xl:min-w-[180px]  flex items-center justify-center cursor-pointer hover:bg-opink hover:text-owhite">
            <Link
              href="/"
              className="text-[10px] md:text-[12px] 2xl:text-[14px]"
            >
              {t("CONTINUE_SHOPPING")}
            </Link>
          </div>

          <button
            onClick={checkStage}
            className="py-3 rounded-full text-owhite w-[40%] max-w-[115px] 2xl:w-[150px] bg-opink flex items-center justify-center hover:bg-owhite hover:text-[#000000] hover:border cursor-pointer hover:border-opink"
          >
            <span className="text-[10px] md:text-[12px] 2xl:text-[14px]">
              {t("NEXT_STEP")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressData;
