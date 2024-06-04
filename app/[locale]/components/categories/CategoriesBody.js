"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CategoriesHead } from "./CategoriesHead";

export const CategoriesBody = ({ categories, languageId }) => {
  const [format, setFormat] = useState(2);

  return (
    <div className="pb-28">
      <CategoriesHead
        categories={categories}
        setFormat={setFormat}
        format={format}
      />
      <div
        className={`w-full grid mt-4 px-2 container mx-auto ${
          format === 2 ? "grid-cols-2 gap-2" : "gap-3"
        } `}
      >
        {categories?.map((category) => {
          let content = category?.content?.find(
            (category) => category?.language_id === languageId
          );
          if (!category?.content?.length) return null;
          return (
            <Link
              key={category?.id}
              href={category?.id ? `/categories/${category?.id}` : "/"}
              className="p-1 border-opink border rounded-md flex flex-col items-center justify-end"
            >
              {content?.mobile_image ? (
                <Image
                  className="bg-gray-100 w-full h-full object-cover"
                  src={content?.mobile_image}
                  alt={category?.title}
                  height={80}
                  width={180}
                />
              ) : null}
              <h4 className="text-center text-opink">{content?.title}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
