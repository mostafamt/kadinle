"use client";

import Image from "next/image";
import React from "react";
import CardIcon from "../Icons/CardIcon";
import { CheckCompletedIcon } from "../Icons/CheckCompletedIcon copy";

const ActiveShipping = "https://kadinle.com/media/images/activeShipping.svg";
const ActiveCart = "https://kadinle.com/media/images/activeCart.svg";
const ActiveTruck = "https://kadinle.com/media/images/activeTruck.svg";
const Card = "https://kadinle.com/media/images/card.svg";
const DoneCart = "https://kadinle.com/media/images/doneCart.svg";
const Shipping = "https://kadinle.com/media/images/shipping.svg";
const TruckDone = "https://kadinle.com/media/images/truckDone.svg";

export const CheckoutBar = ({ stage }) => {
  return (
    <div className="w-[270px] mx-auto mt-4 mb-2">
      <div className="flex justify-between mb-3 items-end">
        <Image
          src={stage > 1 ? DoneCart : ActiveCart}
          alt="Cart"
          className="object-contain w-[28px] h-[28px]"
          height={28}
          width={28}
        />
        <Image
          src={stage === 1 ? Shipping : stage > 2 ? TruckDone : ActiveTruck}
          alt="Cart"
          className={`object-contain w-[28px] h-[28px] ${
            stage === 1 ? "!w-5" : ""
          }`}
          height={28}
          width={28}
        />
        <CardIcon
          className={`w-8 h-8 ltr:ml-1 rtl:mr-1 p-1 rounded-full border ${
            stage > 3
              ? "!w-7 !h-7 border-opink text-opink"
              : stage === 3
              ? "bg-opink text-white"
              : "text-secondary"
          }`}
        />
        <CheckCompletedIcon
          className={`w-6 h-6 rounded-full ${
            stage > 3 ? "bg-opink text-white" : "text-secondary"
          }`}
        />
      </div>
      <div className="flex items-center max-w-[250px] mx-auto">
        <span
          className={`${
            stage > 0 ? "before:border-opink" : " before:border-secondary"
          } ${
            stage > 0 ? "bg-opink" : "bg-secondary"
          } h-2 w-2 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-4 before:h-4 before:rounded-full before:border`}
        />
        <div
          className={`flex-1 h-[2px] ${
            stage > 1 ? "bg-opink" : "bg-secondary"
          }`}
        />
        <span
          className={`${
            stage > 1 ? "before:border-opink" : " before:border-secondary"
          } ${
            stage > 1 ? "bg-opink" : "bg-secondary"
          } h-2 w-2 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-4 before:h-4 before:rounded-full before:border`}
        />
        <div
          className={`flex-1 h-[2px] ${
            stage > 2 ? "bg-opink" : "bg-secondary"
          }`}
        />
        <span
          className={`${
            stage > 2 ? "before:border-opink" : " before:border-secondary"
          } ${
            stage > 2 ? "bg-opink" : "bg-secondary"
          } h-2 w-2 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-4 before:h-4 before:rounded-full before:border`}
        />
        <div
          className={`flex-1 h-[2px] ${
            stage > 3 ? "bg-opink" : "bg-secondary"
          }`}
        />
        <span
          className={`${
            stage > 3 ? "before:border-opink" : " before:border-secondary"
          } ${
            stage > 3 ? "bg-opink" : "bg-secondary"
          } h-2 w-2 rounded-full relative z-10 before:-top-1 before:-left-1 before:absolute before:w-4 before:h-4 before:rounded-full before:border`}
        />
      </div>
    </div>
  );
};
