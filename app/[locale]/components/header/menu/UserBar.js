"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import React from "react";
import UserIcon from "../../Icons/UserIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const UserBar = () => {
  const router = useRouter();
  const { showAuthPopup, setShowAuthPopup, user } = useGlobalOptions();

  const handleLink = () => {
    if (!user) setShowAuthPopup(true);
    else router?.push("/my-account");
  };

  return (
    <button
      onClick={handleLink}
      href="/my-account"
      className={
        router?.pathname === "/my-account/favorites"
          ? "text-primary"
          : "text-secondary"
      }
    >
      <UserIcon />
    </button>
  );
};
