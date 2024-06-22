"use client";

import React, { useContext, useEffect, useState } from "react";
import AddNewAddress from "./AddNewAddress";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import {
  getUserAddresses,
  getUserData,
  setDefaultAddress,
} from "@/app/api/supabase/user";
import Image from "next/image";
import { EditIcon } from "../Icons/EditIcon";

const add = "https://kadinle.com/media/images/add.png";
const addPink = "https://kadinle.com/media/images/addPink.png";
const edit = "https://kadinle.com/media/images/edit.png";
const tick = "https://kadinle.com/media/images/tick.png";
const tickNo = "https://kadinle.com/media/images/tickNo.png";

export const UserAddresses = () => {
  const t = useTranslations();
  const [addresses, setAddresses] = useState([]);
  const [updatedAddress, setUpdatedAddress] = useState(false);
  const [stage, setStage] = useState("display");
  const [userData, setUserData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { user } = useGlobalOptions();

  useEffect(() => {
    getUserData().then((u) => {
      setUserData(u?.data?.[0]);
    });
    getUserAddresses().then((a) => {
      setAddresses(a);
    });
  }, [refresh]);

  return (
    <>
      {stage === "display" ? (
        <div className="w-[73%] md:w-[70%] min-w-[calc(100%-320px)]">
          <div className="flex flex-col h-full">
            <h3 className="text-[17px] md:text-[19px] 2xl:text-[22px]">
              {t("My_Address")}
            </h3>
            <p className="mb-2 mt-3  text-[#7C7C7C]  text-[14px] md:text-[16px] 2xl:text-[18px]">
              {t("My_Saved_Address")}
            </p>

            {addresses?.length ? (
              <div className="flex flex-col">
                {addresses?.map((address) => (
                  <div
                    key={address?.title}
                    className="flex flex-col bg-owhite w-[90%] ltr:pl-7 rtl:pr-7 ltr:pr-2 rtl:pl-2 rounded-[8px] py-2"
                  >
                    <div className="flex justify-between border-b pb-1">
                      <h4 className="text-[16px] 2xl:text-[18px]">
                        {address?.title}
                      </h4>
                      <button
                        onClick={() => {
                          setStage("create");
                          setUpdatedAddress(address);
                        }}
                        className="cursor-pointer flex gap-1 items-center"
                      >
                        <EditIcon />
                        <span className="text-opink text-[14px]">
                          {t("Edit")}
                        </span>
                      </button>
                    </div>
                    <p className="text-[13px] 2xl:text-[15px] mt-3">
                      {address?.line_one} {address?.country?.name}{" "}
                      {address?.city}
                    </p>

                    <button
                      onClick={() =>
                        setDefaultAddress(address?.user_address_id).then(
                          (res) => {
                            setRefresh((p) => !p);
                          }
                        )
                      }
                      className="flex cursor-pointer gap-2 items-center mt-[50px]"
                    >
                      <Image
                        src={
                          userData?.default_address_id ===
                          address?.user_address_id
                            ? tick
                            : tickNo
                        }
                        className="object-contain"
                        alt="default"
                        height={20}
                        width={20}
                      />
                      {t("Use_as_the_shipping_address")}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="bg-yellow-50 font-semibold text-yellow-500 p-2 rounded-md my-4 text-center">
                {t("addresses_empty")}
              </p>
            )}
            <div className="h-full flex items-end">
              <button
                onClick={() => {
                  setStage("create");
                  setUpdatedAddress({});
                }}
                className="text-[11px] md:text-[12px] 2xl:text-[15px] h-fit mt-2 flex items-center justify-center gap-2 py-2 md:py-3 bg-opink text-owhite cursor-pointer border border-opink hover:bg-owhite hover:text-[#000000] rounded-full w-[160px] 2xl:w-[190px]"
              >
                {t("Add_new_address")}
                <Image
                  className="w-[15px]"
                  src={add}
                  alt={t("Add_new_address")}
                  height={15}
                  width={15}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddNewAddress
          setStage={setStage}
          operation={updatedAddress?.id ? "update" : "create"}
          address={updatedAddress || {}}
        />
      )}
    </>
  );
};
