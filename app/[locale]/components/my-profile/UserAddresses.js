"use client";
import React, { useContext, useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { EditIcon } from "../Icons/EditIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import {
  getUserAddresses,
  getUserData,
  setDefaultAddress,
} from "@/app/api/supabase/user";
import AddNewAddress from "./AddNewAddress";
const add2 = "https://kadinle.com/media/images/add2.png";
const edit = "https://kadinle.com/media/images/edit.png";
const tick = "https://kadinle.com/media/images/tick.png";
const tickNo = "https://kadinle.com/media/images/tickNo.png";

export const UserAddresses = ({ setRefreshAddresses, userData, addresses }) => {
  const t = useTranslations();
  const [updatedAddress, setUpdatedAddress] = useState(false);
  const [stage, setStage] = useState("display");

  return (
    <>
      {stage === "display" ? (
        <div className="flex flex-col">
          <h2 className="text-[13px] text-[#6C8394] mt-4 self-center mb-2">
            {t("My_Saved_Address")}
          </h2>

          {addresses?.length ? (
            <div className="flex flex-col">
              {addresses?.map((address) => (
                <div
                  key={address?.id}
                  className=" mb-4 flex flex-col bg-owhite  ltr:pl-7 rtl:pr-7 ltr:pr-2 rtl:pl-2 rounded-[8px] py-2 "
                >
                  <div className="flex justify-between border-b pb-1">
                    <p className="">{address?.title}</p>
                    <div className="cursor-pointer flex gap-1 items-center">
                      <EditIcon className="h-5 w-5 text-primary" />
                      <button
                        className="text-opink text-[14px]"
                        onClick={() => {
                          setStage("create");
                          setUpdatedAddress(address);
                        }}
                      >
                        {t("Edit")}
                      </button>
                    </div>
                  </div>
                  <p className="text-[12px] mt-2">
                    {address?.line_one} {address?.country?.name} {address?.city}
                  </p>
                  <button
                    onClick={() =>
                      setDefaultAddress(address?.user_address_id).then(
                        (res) => {
                          setRefreshAddresses((p) => !p);
                        }
                      )
                    }
                    className="flex cursor-pointer gap-2 items-center mt-[20px]"
                  >
                    <span
                      className={`h-6 w-6 flex items-center justify-center ${
                        userData?.default_address_id ===
                        address?.user_address_id
                          ? "bg-primary"
                          : "border-primary border"
                      }
                    `}
                    >
                      <CheckIcon
                        className={`w-5 h-5 ${
                          userData?.default_address_id ===
                          address?.user_address_id
                            ? "text-white"
                            : "text-primary"
                        }`}
                      />
                    </span>
                    {t("use_address")}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="bg-yellow-50 font-semibold text-yellow-500 p-2 rounded-md my-4 text-center">
              {t("addresses_empty")}
            </p>
          )}

          <button
            onClick={() => {
              setStage("create");
              setUpdatedAddress({});
            }}
            className="text-[11px] md:text-[12px] 2xl:text-[14px] h-fit mt-4 flex items-center justify-center gap-2 py-3 w-full md:py-3 bg-opink text-owhite cursor-pointer border border-opink rounded-full 2xl:w-[190px]"
          >
            <span>{t("Add_new_address")}</span>
            <PlusIcon />
          </button>
        </div>
      ) : (
        <AddNewAddress
          setStage={setStage}
          operation={updatedAddress?.id ? "update" : "create"}
          address={updatedAddress || {}}
          setRefreshAddresses={setRefreshAddresses}
        />
      )}
    </>
  );
};
