"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SidebarMenuList } from "./SidebarMenuList";
import { useTranslations } from "next-intl";
import { ChevronIcon } from "../Icons/ChevronIcon";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getCategoriesById, getSingleCategory } from "@/app/api/supabase/home";

export const SidebarMenu = ({ categories }) => {
  const { language, setShowOptions, showOptions } = useGlobalOptions();
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    getSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    if (pathname?.indexOf("/categories/") !== -1) {
      getCategory();
    }
  }, [pathname]);

  const getCategory = async () => {
    const cate = await getSingleCategory(params?.id);
    if(!cate?.error) setSelectedCategory(cate?.data?.at(0));
  };

  const getSubCategories = async () => {
    const cateRes = await getCategoriesById(selectedCategory?.id);
    if (cateRes?.length) setSubCategories(cateRes);
    else {
      if (selectedCategory?.id) {
        router.push(`/categories/${selectedCategory?.id}`);
        setShowOptions(false);
      }
    }
  };

  if (!showOptions) return;

  return (
    <>
      <div
        className="fixed top-0 w-full h-full z-[11000] bg-[#000000c7]"
        onClick={() => setShowOptions(false)}
      />

      <div
        className={`fixed top-0 w-[70%] md:max-w-[350px]  duration-300 h-screen z-[12000] bg-white shadow`}
      >
        <button
          className="w-full flex justify-end my-2 ltr:mr-3 rtl:ml-3"
          onClick={() => setShowOptions(false)}
        >
          <Image
            src="https://img.icons8.com/?size=20&id=71200&format=png&color=727C8E"
            width={20}
            height={20}
          />
        </button>
        {!selectedCategory?.id ? (
          <SidebarMenuList
            categories={categories}
            onClick={(category) => setSelectedCategory(category)}
          />
        ) : (
          <div className="flex flex-col text-sm">
            <div className="flex items-center gap-2 p-2">
              <button className="ltr:rotate-90 rtl:-rotate-180">
                <ChevronIcon />
              </button>
              <h3 className="flex-1 text-center md:text-lg font-medium">
                {
                  selectedCategory?.content?.find(
                    (c) => c?.language_id === language?.id
                  )?.title
                }
              </h3>
            </div>
            {pathname?.indexOf(`/categories/`) !== -1 ? (
              <ul className="flex gap-2 items-center justify-between px-4 border-y py-2">
                <li className="flex flex-col gap-2 text-sm items-center hover:bg-gray-100 p-1 capitalize hover:shadow">
                  {false ? (
                    <Image
                      src={""}
                      alt={""}
                      height={10}
                      width={10}
                      className="h-10 w-10 rounded-full shrink-0 shadow object-cover bg-gray-100"
                    />
                  ) : (
                    <span className="h-12 w-12 rounded-full shrink-0 bg-gray-100 shadow flex items-center justify-center">
                      A
                    </span>
                  )}

                  {t("all")}
                </li>
                <li className="flex flex-col gap-2 text-sm items-center hover:bg-gray-100 p-1 capitalize hover:shadow">
                  {false ? (
                    <Image
                      src={""}
                      alt={""}
                      height={10}
                      width={10}
                      className="h-10 w-10 rounded-full shrink-0 shadow object-cover bg-gray-100"
                    />
                  ) : (
                    <span className="h-12 w-12 rounded-full shrink-0 bg-gray-100 shadow flex items-center justify-center">
                      L
                    </span>
                  )}

                  {t("Latest_Arrivals")}
                </li>
                <li className="flex flex-col gap-2 text-sm items-center hover:bg-gray-100 p-1 capitalize hover:shadow">
                  {false ? (
                    <Image
                      src={""}
                      alt={""}
                      height={10}
                      width={10}
                      className="h-10 w-10 rounded-full shrink-0 shadow object-cover bg-gray-100"
                    />
                  ) : (
                    <span className="h-12 w-12 rounded-full shrink-0 bg-gray-100 shadow flex items-center justify-center">
                      B
                    </span>
                  )}

                  {t("bestSeller")}
                </li>
              </ul>
            ) : null}
            <SidebarMenuList
              containerClassName="!py-0"
              categories={subCategories}
              onClick={(category) => setSelectedCategory(category)}
            />
          </div>
        )}
      </div>
    </>
  );
};
