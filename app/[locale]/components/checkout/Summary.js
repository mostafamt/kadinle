"use client";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import React, { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getCountry } from "@/app/api/supabase/products";
import { getUserData } from "@/app/api/supabase/user";
import Image from "next/image";
import { getFormatPrice } from "@/app/api/lib/functions";
import Link from "next/link";

const applePay = "https://kadinle.com/media/images/applePay.png";
const americanExpress = "https://kadinle.com/media/images/americanExpress.png";
const left = "https://kadinle.com/media/images/left.svg";
const maestro = "https://kadinle.com/media/images/maestro.png";
const mastercard = "https://kadinle.com/media/images/mastercard.png";
const googlePay = "https://kadinle.com/media/images/pay.png";
const roundImage = "https://kadinle.com/media/images/roundImage.png";
const smallTruck = "https://kadinle.com/media/images/smallTruck.svg";
const visa = "https://kadinle.com/media/images/visa.png";

const Summary = ({
  setStage,
  cart,
  total,
  shipping_adress,
  warehouseInformation,
  shipping_cost,
}) => {
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
    <div className="flex flex-col mt-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-[12px] 2xl:text-[15px] mb-6">
            {t("Payment_method")}
          </h3>
          <div className="flex flex-col ">
            <div className="flex gap-1 mb-2">
              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[35px] 2xl:text-[55px] object-cover opacity-[0.5]"
                    src={americanExpress}
                    alt="americanExpress"
                    width={55}
                    height={50}
                  />
                </div>
              </div>

              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[60px] 2xl:w-[80px] object-cover opacity-[0.5]"
                    src={visa}
                    alt="visa"
                    width={60}
                    height={60}
                  />
                </div>
              </div>

              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[32px] 2xl:w-[52px] object-cover opacity-[0.5]"
                    src={mastercard}
                    alt="mastercard"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[30px] 2xl:w-[50px] object-cover"
                    src={maestro}
                    alt="maestro"
                    width={60}
                    height={60}
                  />
                </div>
              </div>

              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[45px] 2xl:w-[65px] object-cover opacity-[0.5]"
                    src={applePay}
                    alt="applePay"
                    width={60}
                    height={60}
                  />
                </div>
              </div>

              <div className=" flex flex-col cursor-pointer justify-center items-center">
                <div className="border w-[100px] 2xl:w-[130px] rounded-[15px] min-h-[45px] 2xl:min-h-[60px] flex items-center justify-center">
                  <Image
                    className="w-[40px] 2xl:w-[60px] object-cover opacity-[0.5]"
                    src={googlePay}
                    alt="googlePay"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-[11px] 2xl:text-[15px] w-[35%] max-w-[371px]">
          <p className="mb-5">{t("Address_delivery")}</p>
          <div className="flex flex-col space-y-[3px]">
            <h4>{country?.name}</h4>
            <p>
              {shipping_adress?.line_one} {shipping_adress?.city}
            </p>
            <p>{country?.["alph-3"]}</p>
            <p>
              {country?.code} {userData?.phone}
            </p>
            <p>{userData?.email}</p>
          </div>

          <button
            onClick={() => setStage("Address Data")}
            className="mt-7 text-[11px] 2xl:text-[15px] text-[#808080] w-[150px] py-[12px] border border-[#808080] rounded-full flex items-center justify-center hover:bg-opink hover:text-owhite"
          >
            {t("CHANGE_ADDRESS")}
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <h4 className="text-[11px] 2xl:text-[15px] mb-2">{t("Your_Cart")}</h4>

        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[65%] max-w-[900px] ">
            {cart?.map((item, index) => {
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
                <div
                  key={index}
                  className="flex items-center py-2 text-[12px] 2xl:text-[15px] gap-6 md:gap-12 lg:gap-20 2xl:justify-between "
                >
                  <div className="flex space-10 items-center w-[220px] 2xl:w-[250px]">
                    <div className="w-[85px] h-[60px]">
                      <Image
                        className="w-[50px] h-[50px] object-cover rounded-full"
                        src={item?.image}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="">
                      <div className="flex flex-col space-y-[1px]">
                        <h4 className="text-[12px] 2xl:text-[15px]">
                          {content?.name}
                        </h4>
                        <p className="text-[10px] 2xl:text-[13px] text-[#C4C4C4]">
                          {item?.product_details?.product_sku}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-[30px]">
                    <span>{color?.name}</span>
                  </div>
                  <div className="flex justify-center w-[30px]">
                    <span>{size?.name}</span>
                  </div>
                  <div className="flex justify-center w-[30px]">
                    <span className="flex whitespace-nowrap">
                      {getFormatPrice(item?.price * item?.quantity, currency)}
                    </span>
                  </div>

                  <div className="cursor-pointer w-[30px]">
                    <span>x{item?.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="md:min-w-[35%]">
            <div className="bg-[#F1F1F1] capitalize  flex flex-col gap-2 py-[12px] px-2 text-[12px] 2xl:text-[15px] rounded-lg min-w-[200px]  max-w-[300px]">
              <div className=" flex justify-between gap-10">
                {t("subtotal")}
                <span className="whitespace-nowrap">
                  {getFormatPrice(total, currency)}
                </span>{" "}
              </div>
              <div className=" flex justify-between gap-10">
                {t("shipping_cost")}
                <span className="whitespace-nowrap">
                  {shipping_cost && getFormatPrice(shipping_cost, currency)}
                </span>
              </div>
              <div className=" flex justify-between gap-10">
                {t("Total_Cost")}
                <span className="whitespace-nowrap">
                  {shipping_cost &&
                    getFormatPrice(total + shipping_cost, currency)}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={(e) => setStage("Address Data")}
          className="cursor-pointer flex gap-4 items-center"
        >
          <Image
            className="w-[10px] rtl:rotate-180 block object-contain"
            src={left}
            width={15}
            height={10}
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
            onClick={(e) => setStage("Card Info")}
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

export default Summary;
