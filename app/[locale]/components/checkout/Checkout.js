"use client";

import { getCountry } from "@/app/api/supabase/products";
import { getUserData } from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutBar } from "./CheckoutBar";
import Image from "next/image";
import { getFormatPrice } from "@/app/api/lib/functions";

const add = "https://kadinle.com/media/images/add.png";
const addPay = "https://kadinle.com/media/images/addPay.png";
const americanExpress = "https://kadinle.com/media/images/americanExpress.png";
const applePay = "https://kadinle.com/media/images/applePay.png";
const choose = "https://kadinle.com/media/images/choose.svg";
const close = "https://kadinle.com/media/images/close.svg";
const googlePay = "https://kadinle.com/media/images/googlePay.png";
const mastercard = "https://kadinle.com/media/images/mastercard.png";
const pinkArrow = "https://kadinle.com/media/images/pinkArrow.png";
const remove = "https://kadinle.com/media/images/remove.png";
const scarf = "https://kadinle.com/media/images/scarf.png";
const tag = "https://kadinle.com/media/images/tag.svg";
const visa = "https://kadinle.com/media/images/visa.png";

const Checkout = ({ shipping_adress, cart, setStage }) => {
  const t = useTranslations();
  const { language, currency } = useGlobalOptions();
  const [country, setCountry] = useState("");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    getCountry(shipping_adress?.country?.id).then((res) => {
      setCountry(res?.data?.[0]);
    });
    getUserData().then((res) => {
      setUserData(res?.data?.[0]);
    });
  }, [shipping_adress?.country?.id]);
  return (
    <div className="flex flex-col w-full">
      <CheckoutBar stage={3} />

      <h2 className="font-[700] text-[24px] ">{t("checkout")}</h2>

      <h3 className="text-[#25252D] text-[11px] mt-2 mb-1 font-[300]">
        {t("shippingAddress")}
      </h3>

      <div className="flex justify-between items-center pb-4 border-b">
        <ul className="flex flex-col text-[12px] gap-[2px]">
          <li className="font-medium text-xs">
            {userData?.first_name} {userData?.last_name}
          </li>
          <li>{userData?.email}</li>
          <li>{country?.name}</li>
          <li>
            {shipping_adress?.line_one} {shipping_adress?.city}
          </li>
          <li>{country?.["alph-3"]}</li>
          <li>
            {country?.code} {userData?.phone}
          </li>
        </ul>

        {/* <img className="w-[18px]" src={choose} /> */}
      </div>

      {/* <div className="flex flex-col py-3 border-b ">
        <p className="text-[#25252D] text-[11px] font-[300] uppercase">
          {t("payment method")}
        </p>
        <div className="flex justify-between items-center mt-1">
          <div className="flex gap-4 items-center">
            <img   src={mastercard} />
            <p className="text-[13px] font-[700]">
              {t("masterCardEnding")}
            </p>
          </div>

          <img   className="w-[18px]" src={choose} />
        </div>
      </div> */}

      <div className="flex flex-col py-3 target">
        <p className="text-[#25252D] text-[11px] font-[300] mb-2 uppercase">
          {t("items")}
        </p>

        {cart?.map((item) => {
          let content = item?.content?.find(
            (c) => c.language_id === language?.id
          );
          let color = item?.color_content?.find(
            (c) => c.language_id === language?.id
          );
          let size = item?.size_content?.find(
            (c) => c.language_id === language?.id
          );

          return (
            <div className="mb-4" key={item?.id}>
              <div className="flex">
                <div className="bg-owhite w-[53px] h-[53px] flex items-center justify-center rounded-full">
                  <Image
                    className="w-[43px] h-[43px]"
                    src={item?.image}
                    alt={content?.name}
                    height={43}
                    width={43}
                  />
                </div>

                <div className="flex border-b items-end pb-3 flex-1">
                  <div className="flex flex-col text-[12px] ltr:ml-3 rtl:mr-3 ">
                    <h3 className="font-[700]">{content?.name}</h3>
                    <p className="font-[300]">
                      {size?.name}, {color?.name}
                    </p>
                    <div className="flex gap-4 items-center">
                      <p className="text-opink">
                        {getFormatPrice(item?.price * item?.quantity, currency)}
                      </p>
                      <p className="text-[12px] text-[#727C8E]">
                        X{item?.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <input className='bg-[#F5F6F8] outline-none text-[12px] self-center w-full text-center pt-2' placeholder='Message to seller (optional)' /> */}
            </div>
          );
        })}
      </div>

      {/* <div className='flex justify-between items-center py-3'>
        <div className='flex gap-3 items-center'>
          <img   className='w-[23px]' src={tag} />
          <p className='text-[12px] text-opink'>Add Promo Code</p>
        </div>

        <img   className='w-[18px]' src={choose} />


      </div> */}

      {/* <div className='flex items-center mt-2'>
        <div className='h-[1px] w-[46%] bg-[#EBEBEB] '></div>
        <p className='text-[12px] text-opink w-[15%] self-center text-center'>OR</p>
        <div className='h-[1px] w-[46%] bg-[#EBEBEB]'></div>
      </div> */}

      {/* <div className='flex justify-between items-center mt-4'>
        <div className='flex flex-col justify-center items-center space-y-[3px]'>
          <img   className='w-[42px] h-[15px] object-cover' src={visa} />
        </div>

        <div className='flex flex-col justify-center items-center space-y-[3px]'>
          <img   className='w-[38px] h-[15px] object-cover' src={applePay} />
        </div>

        <div className='flex flex-col justify-center items-center space-y-[3px]'>
          <img   className='w-[22px] h-[15px] object-cover' src={googlePay} />
        </div>

        <div className='flex flex-col justify-center items-center space-y-[3px]'>
          <img   className='w-[28px] h-[15px] object-cover' src={americanExpress} />
        </div>

        <div className='flex flex-col justify-center items-center space-y-[3px]'>
          <img   className='w-[25px] h-[25px] object-cover' src={addPay} />
        </div>
      </div> */}
    </div>
  );
};

export default Checkout;
