"use client";
import { getCountries } from "@/app/api/supabase/shared";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Flag from "react-world-flags";

export const UserCountry = () => {
  const t = useTranslations();
  const { currency, changeCurrency } = useGlobalOptions();
  const [currencies, setCurrencies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchChangeHandler = ({ target: { value } }) => setSearchValue(value);

  useEffect(() => {
    getCountries()?.then((c) => {
      setCurrencies(c);
    });
  }, []);

  const regex = new RegExp(searchValue, "i");
  const filteredCurrencies = currencies?.filter((currency) =>
    regex.test(currency?.name)
  );
  return (
    <div className="flex flex-col">
      <div className="mb-4 pb-2 border-b flex items-center justify-between bg-opink text-white p-3">
        <h3 className="text-[17px] md:text-[19px] 2xl:text-[22px]">
          {t("country")}
        </h3>
        <span>{currency?.name}</span>
      </div>
      <div className="flex flex-wrap gap-y-2">
        <input
          value={searchValue}
          onChange={searchChangeHandler}
          placeholder={t("search")}
          className="w-full outline-none text-sm p-2 shadow border-b mx-auto border-gray-200 rounded"
        />
        <div className="overflow-y-scroll scrollbar-hidden w-full max-h-[350px] p-2 rounded-md bg-white">
          {filteredCurrencies?.map((curr) => {
            if (curr?.id !== currency?.id) {
              return (
                <button
                  key={curr?.id}
                  onClick={() => {
                    if (curr?.id !== currency?.id) changeCurrency(curr);
                  }}
                  className={`p-2 px-4 flex items-center border-b pb-1 last:border-0 justify-between w-full ${
                    currency?.id === curr?.id ? "bg-opink text-white" : ""
                  }`}
                >
                  <p className="text-start">{curr?.name}</p>
                  <Flag code={curr?.["alph-2"]} width="30" />
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
