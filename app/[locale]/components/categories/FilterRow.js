"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";

const choose = "https://kadinle.com/media/images/choose.svg";

export const FilterRow = ({
  list,
  title,
  onChange,
  keySearch,
  keyValue,
  name = "name",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4 justify-between flex text-[12px] border-t first:border-0">
      <label
        htmlFor="category"
        className="pointer-events-none capitalize absolute ltr:left-4 rtl:right-4"
      >
        {title}
      </label>
      <select
        onClick={() => setOpen((p) => !p)}
        id="category"
        onChange={(e) => onChange(e.target.value)}
        className="ltr:!text-right rtl:!text-left outline-none px-2 text-[#25252D] font-[200] w-full justify-end flex"
      >
        <option value={""}>{title}</option>
        {list.map((item) => (
          <option
            key={item?.id}
            className="flex items-center gap-2"
            value={item?.id}
          >
            {item?.content
              ? item?.content?.find((c) => c?.[keySearch] === keyValue)?.[name]
              : item?.[name]}
          </option>
        ))}
      </select>
      <div className="flex">
        <Image
          className={`w-[14px]  rtl:rotate-180 ${
            open ? "rotate-90 rtl:rotate-90" : ""
          }`}
          alt="choose"
          src={choose}
          height={14}
          width={14}
        />
      </div>
    </div>
  );
};
