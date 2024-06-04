"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import React from "react";
import UserIcon from "../../Icons/UserIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/api/supabase/supabase.config";

export const UserBarFull = () => {
  const router = useRouter();
  const { showAuthPopup, setShowAuthPopup, user } = useGlobalOptions();

  const handleLink = () => {
    if (!user?.id) setShowAuthPopup(true);
    else router?.push("/profile");
  };

  return (
    <button
      onClick={handleLink}
      href="/profile"
      className={
        router?.pathname === "/profile/favorites"
          ? "text-primary"
          : "text-secondary"
      }
    >
      <UserIcon />
    </button>
  );
};
