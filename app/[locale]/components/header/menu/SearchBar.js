"use client";

import React, { useContext, useState } from "react";

import SearchIcon from "../../Icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const SearchBar = () => {
  const t = useTranslations();
  const router = useRouter();
  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      router?.push(`/search/${search}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className=" flex justify-between text-sm bg-white  border px-2 rounded-[9px]  flex-1 mx-4"
    >
      <div className="Search flex items-center gap-2 w-[80%] ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full outline-0 !border-0 montserrat text flex-1 bg-inherit focus-within:bg-inherit active:bg-inherit focus:bg-inherit"
        />
      </div>
      <button className="cursor-pointer m-[5px]">
        <SearchIcon className="text-primary h-5 w-5" />
      </button>
    </form>
  );
};
