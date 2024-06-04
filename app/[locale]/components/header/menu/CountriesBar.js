"use client";
import React, { useEffect, useState, useTransition } from "react";
import Flag from "react-world-flags";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { ChevronIcon } from "../../Icons/ChevronIcon";

export const CountriesBar = ({ countries }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const { currency, changeCurrency } = useGlobalOptions();
  const [searchValue, setSearchValue] = useState("");
  const searchChangeHandler = ({ target: { value } }) => setSearchValue(value);

  const regex = new RegExp(searchValue, "i");
  const filteredCurrencies = countries?.filter((country) =>
    regex.test(country?.name)
  );

  return (
    <div className="relative">
      <button
        className={`text-[#727C8E] text-xs flex items-center h-8 gap-1 border p-1 rounded-md ${
          open ? "bg-primary text-white" : ""
        }`}
        onClick={() => setOpen((p) => !p)}
      >
        <Flag
          className="w-7 h-5 object-contain"
          code={currency?.["alph-2"]}
          width="30"
          height="20"
          fallback={<span className="w-7 h-5 inline-block border"></span>}
        />
        {/* {currency?.name} */}
        <ChevronIcon className="w-4 h-4 text-primary" />
      </button>
      {open ? (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bg-white shadow w-[200px] h-[300px] rounded-md z-30 top-full ltr:right-0 rtl:left-0">
            <div className="w-[90%] mx-auto mb-2 border border-primary mt-2 rounded">
              <input
                value={searchValue}
                onChange={searchChangeHandler}
                placeholder={t("search")}
                className="w-full outline-none text-sm px-2"
              />
            </div>
            <div className="overflow-y-scroll scrollbar-hidden w-full h-[calc(100%-42px)]">
              {filteredCurrencies
                ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                ?.map((curr) => (
                  <button
                    key={curr?.id}
                    onClick={() => {
                      if (curr?.id !== currency?.id) changeCurrency(curr);
                      setOpen(false);
                    }}
                    className="p-2 border-b px-4 flex items-center justify-between w-full"
                  >
                    <p className="text-start">{curr?.name}</p>
                    <Flag
                      className="w-9 h-[32px] object-contain"
                      code={curr?.["alph-2"]}
                      width="36"
                      height="32"
                      fallback={
                        <span className="w-7 h-5 inline-block border"></span>
                      }
                    />
                  </button>
                ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
