"use client";

import { getAllShippingInformation } from "@/app/api/supabase/products";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";
import Image from "next/image";
import { getFormatPrice } from "@/app/api/lib/functions";
import ChevronIcon from "../chat/ChevronIcon";

const ARAMeX_LOGO = "https://kadinle.com/media/images/aramex_logo.png";
const DHL_LOGO = "https://kadinle.com/media/images/dhl.png";
// const down = "https://kadinle.com/media/images/down.png";

const ShippingInformationPage = ({ warehouses }) => {
  const t = useTranslations();
  const { currency } = useGlobalOptions();
  const [selectedInfo, setSelectedInfo] = useState({});
  const [country, setCountry] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!country) return;
    setSelectedInfo(
      warehouses?.find((warehouse) => warehouse.country_id === country)
    );
    setIndex(0);
  }, [country, warehouses]);

  return (
    <>
      <ScrollUpComponent />
      <StaticPageTitle title={t("Shipping_Information")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3">
              <p className="text-black font-[500] leading-[23px]">
                {t("shippingInfoSection1")}
              </p>
            </div>

            <p className="mt-3 leading-[23px]">{t("shippingInfoSection2")}</p>

            <div className="flex flex-col mt-5">
              <div className="flex flex-col gap-1">
                <label>{t("choose_country")}</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="flex-1 rounded-md border border-[#707070] py-[6px] ltr:pl-4 rtl:pr-4 outline-none h-full bg-owhite"
                >
                  <option value="">{t("country")}</option>
                  {warehouses
                    ?.sort((a, b) =>
                      a?.country?.name?.localeCompare(b?.country?.name)
                    )
                    ?.map((warehouse) => (
                      <option
                        key={warehouse?.country?.id}
                        value={warehouse?.country?.id}
                      >
                        {warehouse?.country?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col border border-opink rounded-[10px] w-full mt-3 ">
                <div className="flex border-b border-opink ">
                  <div className="py-2 ltr:pl-3 rtl:pr-3 border-r w-1/4">
                    <p className=" text-[11px]">{t("shippingMethod")}</p>
                  </div>
                  <div className="py-2 ltr:pl-3 rtl:pr-3 border-r w-1/4 ">
                    <p className=" text-[11px] text-center">
                      {t("deliveryTime")}
                    </p>
                  </div>
                  <div className="py-2 ltr:pl-3 rtl:pr-3 border-r w-1/4 ">
                    <p className=" text-[11px] text-center">
                      {t("The_Weight")}
                    </p>
                  </div>
                  <div className="py-2 ltr:pl-3 rtl:pr-3 border-r w-1/4 ">
                    <p className=" text-[11px] text-center">
                      {t("shippingCost")}
                    </p>
                  </div>
                </div>
                {selectedInfo?.shipping ? (
                  <div className="flex w-full min-h-[40px]">
                    <div className="text-center py-2 w-1/4">
                      {selectedInfo?.shipping?.min_fast_duration === 2 ? (
                        "---"
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-2">
                          <Image
                            className=" w-16 object-contain"
                            src={DHL_LOGO}
                            alt={"DHL_LOGO"}
                            height={40}
                            width={64}
                          />
                          <Image
                            className=" w-16 object-contain"
                            src={ARAMeX_LOGO}
                            alt={"ARAMeX_LOGO"}
                            height={40}
                            width={64}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-center flex items-center justify-center py-2 w-1/4">
                      {selectedInfo?.shipping?.min_fast_duration} -{" "}
                      {selectedInfo?.shipping?.max_fast_duration} {t("days")}
                    </div>
                    <div className="w-1/4 py-2 text-center flex items-center justify-center">
                      <div className="rounded-md mx-auto w-[80%] text-center border border-gray-200 relative">
                        <select
                          className="px-4 py-1 w-full rounded-md font-medium"
                          value={index}
                          onChange={(e) => setIndex(e.target.value)}
                        >
                          {Object.keys(selectedInfo?.shipping?.fast_price)?.map(
                            (weight, index) => (
                              <option key={weight} value={index}>
                                {weight}
                              </option>
                            )
                          )}
                        </select>
                        <span className="absolute top-3 ltr:right-2 rtl:left-2">
                          <ChevronIcon className="h-4 w-4 -rotate-90 text-primary" />
                        </span>
                      </div>
                    </div>
                    <div className="w-1/4 py-2 text-center flex items-center justify-center">
                      <span>
                        {getFormatPrice(
                          Object.values(selectedInfo?.shipping?.fast_price)?.[
                            index
                          ],
                          currency
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center w-full min-h-[40px]">
                    <div className="h-[1px] w-[80%] mx-auto bg-gray-300" />
                  </div>
                )}
              </div>
              {selectedInfo?.shipping?.min_fast_duration === 2 ? (
                <p></p>
              ) : (
                <p className="mt-4 text-yellow-500 bg-yellow-100 font-medium p-2 rounded-md text-center">
                  {t("shipping_information_note")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInformationPage;
