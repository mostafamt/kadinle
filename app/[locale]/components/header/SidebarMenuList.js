import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Image from "next/image";
import React from "react";
import { ChevronIcon } from "../Icons/ChevronIcon";

export const SidebarMenuList = ({
  containerClassName,
  categories,
  extraItems,
  onClick,
}) => {
  const { language } = useGlobalOptions();

  return (
    <ul className={`flex flex-col py-4 overflow-auto ${containerClassName}`}>
      {extraItems ? extraItems : null}
      {categories
        ?.sort((a, b) => b?.numeric - a?.numeric)
        ?.map((category) => {
          const content = category?.content?.find(
            (c) => c?.language_id === language?.id
          );
          return (
            <li
              className="flex gap-4 items-center px-4 py-2 hover:bg-gray-100 hover:shadow"
              key={category?.id}
              onClick={() => onClick(category)}
            >
              {content?.web_image ? (
                <Image
                  src={content?.web_image ? content?.web_image : ""}
                  alt={content?.title}
                  height={10}
                  width={10}
                  className="h-10 w-10 rounded-full shrink-0 shadow object-cover bg-gray-100"
                />
              ) : (
                <span className="h-12 w-12 rounded-full shrink-0 bg-gray-100 shadow flex items-center justify-center">
                  {content?.title?.[0]}
                </span>
              )}
              {content?.title}
              <ChevronIcon className="ltr:ml-auto rtl:mr-auto w-7 h-7 ltr:-rotate-90 rtl:rotate-90 border border-transparent text-gray-600 hover:bg-white hover:border-gray-500 p-1 rounded-full" />
            </li>
          );
        })}
    </ul>
  );
};
