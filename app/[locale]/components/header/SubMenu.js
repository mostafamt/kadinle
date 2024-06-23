"use client";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { upperMenu } from "@/app/api/static/links";

import { DrawerDow } from "./DrawerDow";
import { links } from "@/app/api/static/links";

export const SubMenu = ({ categories, language }) => {
  const t = useTranslations();
  const router = useRouter();
  const { showOptions, setShowOptions } = useGlobalOptions();
  const [sticky, setSticky] = useState(false);
  const [originalTop, setOriginalTop] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    setOriginalTop(myRef?.current?.offsetTop);
  }, [router?.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentTop = myRef?.current?.getBoundingClientRect().top;
      if (sticky && document.documentElement.scrollTop <= 127) {
        setSticky(false);
      } else if (currentTop <= 0) {
        setSticky(true);
      }
    };

    typeof window === "object" &&
      window.addEventListener("scroll", handleScroll);

    return () => {
      typeof window === "object" &&
        window.removeEventListener("scroll", handleScroll);
    };
  }, [originalTop, sticky, myRef?.current]);

  return (
    <nav className="flex flex-col relative menu bg-[#E1E1E1] text-[10px] text-[#767C89] py-1">
      <div className="relative container mx-auto">
        <div
          ref={myRef}
          className={`${
            sticky === true ? "fixed " : "relative"
          } bg-[#E1E1E1] top-0 ltr:left-0 rtl:right-0 z-20 w-full`}
        >
          <div className="relative container mx-auto">
            <div className={` top-0 ltr:left-0 rtl:right-0 z-20 w-full`}>
              <ul className="flex items-center w-full justify-between scroll-hide gap-5 py-3 overflow-auto">
                {upperMenu?.map((link) => (
                  <Link
                    key={link?.path}
                    href={link?.path}
                    className="text-[15px] font-normal"
                  >
                    <span className="text-gray-500 whitespace-nowrap min-w-fit flex-1 capitalize cursor-pointer text-center hover:text-[#111] hover:font-medium ">
                      {link?.name}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
