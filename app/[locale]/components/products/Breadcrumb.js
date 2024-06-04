"use client";
import { LANGUAGES } from "@/app/api/static/constants";
import React, { useMemo } from "react";
import { ChevronIcon } from "../Icons/ChevronIcon";
import Link from "next/link";
import { MobileNav } from "../header/MobileNav";

export const Breadcrumb = async ({
  categoryName,
  productName,
  category_id,
}) => {
  return (
    <MobileNav
      title={
        <div className="flex gap-2 items-center text-xs">
          <Link
            href={`/categories/${category_id}?parent_id=${category_id}` || ""}
            className="text-primary underline"
          >
            {categoryName}
          </Link>
          <span className="rtl:rotate-180">
            <ChevronIcon className="h-4 w-4  text-primary" />
          </span>
          {productName}
        </div>
      }
    />
  );
};
