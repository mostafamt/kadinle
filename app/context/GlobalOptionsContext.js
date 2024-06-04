"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getFavoriteList,
  getUserCart,
  getUserInfo,
} from "../api/supabase/user";
import { supabase } from "../api/supabase/supabase.config";
import { loggedInTimes, resetPoints } from "../api/supabase/points";
import Cookies from "js-cookie";
import { getFlashProducts } from "../api/supabase/home";

export const GlobalOptionsContext = createContext();

export const useGlobalOptions = () => {
  return useContext(GlobalOptionsContext);
};

const getStorageCategoryId = () => {
  const storageCategoryIds =
    typeof window === "object" && localStorage.getItem("HISTORY_CATEGORY_ID");
  if (storageCategoryIds !== "undefined" && !storageCategoryIds)
    return JSON.parse(storageCategoryIds);
  return {
    "e65b41f4-3e1f-463b-9d50-7bd44b0d2a68":
      "e65b41f4-3e1f-463b-9d50-7bd44b0d2a68",
  }; // default
};
let DEFAULT_CURRENCY = {
  id: "2dcf464a-20ea-4569-9185-21f1c33aae5a",
  name: "United States",
  "alph-2": "US",
  "alph-3": "USA",
  code: "+1",
  currency_id: "6100af63-25e1-4a76-ae9d-df8609d6273f",
  region_id: "44650daa-9c58-4939-93e1-447345e74459",
  currency: {
    id: "6100af63-25e1-4a76-ae9d-df8609d6273f",
    name: "United States Dollar",
    code: "USD",
    rate: 1,
    exchange_percent: 0,
  },
};

let DEFAULT_LANGUAGE = {
  id: "c53d7987-f51a-4b47-9ee0-3215becdce17",
  name: "English",
  code: "EN",
};

export const GlobalOptionsContextProvider = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [language, setLanguage] = useState({});
  const [currency, setCurrency] = useState({});
  const [user, setUser] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [userRefresh, setUserRefresh] = useState(false);
  const [favoritesList, setFavoritesList] = useState({});
  const [refreshFavorite, setRefreshFavorite] = useState(false);
  const [flashProducts, setFlashProducts] = useState({});
  const [historyCategoryIds, setHistoryCategoryIds] = useState(
    getStorageCategoryId() || {}
  );

  useEffect(() => {
    const localStorageCurrency =
      typeof window === "object" && localStorage.getItem("kadinle_currency");
    const storageCountry =
      localStorageCurrency && localStorageCurrency !== "undefined"
        ? JSON.parse(localStorageCurrency)
        : DEFAULT_CURRENCY;

    changeCurrency(storageCountry);
  }, []);

  useEffect(() => {
    const localStorageLang =
      typeof window === "object" && localStorage.getItem("kadinle_lang");
    const storageLang =
      localStorageLang && localStorageLang !== "undefined"
        ? JSON.parse(localStorageLang)
        : DEFAULT_LANGUAGE;

    changeLanguage(storageLang);
  }, []);

  useEffect(() => {
    typeof window === "object" &&
      localStorage.setItem(
        "HISTORY_CATEGORY_ID",
        JSON.stringify(historyCategoryIds)
      );
  }, [historyCategoryIds]);

  const getUser = async () => {
    const user = Cookies.get("KADINLE_USER");
    if (!user) {
      setUser({});
    } else {
      setUser(JSON.parse(user));
      loggedInTimes();
      resetPoints(user?.id);
    }
  };

  useEffect(() => {
    getUser();
  }, [userRefresh]);

  useEffect(() => {
    getUserCart().then((res) => {
      setCartLength(res?.data?.length);
    });
  }, [refresh, user]);

  useEffect(() => {
    if (user?.id) {
      getFavoriteList().then((res) => {
        if (res?.error) return;
        let cache_items = {};
        for (const item of res?.data) {
          cache_items[item?.product_id] = item?.id;
        }
        setFavoritesList(cache_items);
      });
    }
  }, [refreshFavorite, user?.id]);

  useEffect(() => {
    getFlashProducts().then((res) => {
      let hash = {};
      for (const product of res) {
        hash[product?.product_id] = product;
      }
      setFlashProducts(hash);
    });
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    typeof window === "object" &&
      localStorage.setItem("kadinle_lang", JSON.stringify(lang));
  };

  const changeCurrency = (curr) => {
    typeof window === "object" &&
      localStorage.setItem("kadinle_currency", JSON.stringify(curr));
    setCurrency(curr);
  };

  const value = {
    user,
    setUser,
    setUserRefresh,
    favoritesList,
    setRefreshFavorite,
    language,
    currency,
    cartLength,
    setRefresh,
    changeCurrency,
    setLanguage,
    changeLanguage,
    showOptions,
    setShowOptions,
    showAuthPopup,
    setShowAuthPopup,
    flashProducts,
    historyCategoryIds,
    setHistoryCategoryIds,
    cartLength,
    showShare,
    setShowShare,
  };

  return (
    <GlobalOptionsContext.Provider value={value}>
      {props.children}
    </GlobalOptionsContext.Provider>
  );
};
