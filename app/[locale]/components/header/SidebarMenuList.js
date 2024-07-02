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
  // console.log("categories", categories);
  const { language } = useGlobalOptions();

  return (
    <ul className={`flex flex-col py-4 overflow-auto ${containerClassName}`}>
      {extraItems ? extraItems : null}
      {categories
        ?.sort((a, b) => a?.numeric.charAt(0) - b?.numeric.charAt(0))
        ?.map((category) => {
          const content = category?.content?.find(
            (c) => c?.language_id === language?.id
          );
          return (
            <li
              role="link"
              className="flex cursor-pointer gap-4 items-center px-4 py-2 hover:bg-gray-100 hover:shadow border-b"
              key={category?.id}
              onClick={() => onClick(category)}
            >
              {category?.image ? (
                <Image
                  src={category?.image ? category?.image : ""}
                  alt={content?.title}
                  height={90}
                  width={90}
                  className="h-16 w-16 rounded-full shrink-0 shadow object-cover bg-gray-100"
                />
              ) : (
                <span className="h-12 w-12 rounded-full shrink-0 bg-gray-100 shadow flex items-center justify-center">
                  {content?.title?.[0]}
                </span>
              )}
              {content?.title}
              <ChevronIcon className="ltr:ml-auto cursor-poninter rtl:mr-auto w-7 h-7 ltr:-rotate-90 rtl:rotate-90 border border-transparent text-gray-600 hover:bg-white hover:border-gray-500 p-1 rounded-full" />
            </li>
          );
        })}
    </ul>
  );
};
