"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Link from "next/link";
import React from "react";
import CartIcon from "../../Icons/CartIcon";
import { useRouter } from "next/navigation";

export const CartBar = () => {
  const router = useRouter();
  const { cartLength } = useGlobalOptions();

  return (
    <Link href="/cart" className="relative">
      <span className="h-[18px] min-w-[16px] flex items-center justify-center text-xs rounded-[50%] bg-primary absolute -top-2 -right-1 text-white px-[2px] py-0 leading-[0px]">
        {cartLength ? cartLength : 0}
      </span>
      <CartIcon
        className={`h-6 w-6 ${
          router?.pathname === "/cart" ? "text-primary" : "text-secondary"
        }`}
      />
    </Link>
  );
};
