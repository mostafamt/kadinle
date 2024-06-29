"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import Flag from "react-world-flags";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { ChevronIcon } from "../../Icons/ChevronIcon";
import { getSearchKey } from "@/app/api/lib/functions";

export const CountriesBar = ({ countries }) => {
  const { language } = useGlobalOptions();
  let searchKey = getSearchKey(language?.name) || "name";
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const { currency, changeCurrency } = useGlobalOptions();
  const [searchValue, setSearchValue] = useState("");

  const searchChangeHandler = ({ target: { value } }) => setSearchValue(value);

  const regex = new RegExp(searchValue, "i");
  const filteredCurrencies = useMemo(() => {
    return searchValue
      ? countries?.filter((country) => regex.test(country?.[searchKey]))
      : countries;
  }, [searchValue, searchKey]);

  return (
    <div className="relative">
      <button
        className={`text-[#727C8E] text-[14px] flex items-center gap-1 border p-1 rounded-md ${
          open ? "bg-primary text-white" : ""
        }`}
        onClick={() => setOpen((p) => !p)}
      >
        <Flag
          className="w-7 h-5 object-contain"
          code={currency?.["alph-2"]}
          width="30"
          height="20"
        />
        <ChevronIcon className="w-4 h-4 text-primary" />
      </button>
      {open ? (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-[10000]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bg-white shadow w-[200px] h-[300px] rounded-md z-[10001] top-full ltr:right-0 rtl:left-0">
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
                ?.sort((a, b) => a?.[searchKey]?.localeCompare(b?.[searchKey]))
                ?.map((curr) => {
                  return (
                    <button
                      key={curr?.id}
                      onClick={() => {
                        if (curr?.id !== currency?.id) changeCurrency(curr);
                        setOpen(false);
                      }}
                      className="p-2 px-4 border-b flex items-center justify-between w-full"
                    >
                      <span className="text-start">{curr[searchKey]}</span>
                      <Flag
                        className="w-9 h-[32px] object-contain"
                        code={curr?.["alph-2"]}
                        width="38"
                        height="32"
                        fallback={
                          <span className="w-7 h-5 inline-block border"></span>
                        }
                      />
                    </button>
                  );
                })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
