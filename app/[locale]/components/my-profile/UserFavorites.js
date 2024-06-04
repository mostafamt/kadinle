"use client";
import { listUser_like } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Loading } from "../global/Loading";
import AlertMessage from "../global/AlertMessage";

export const UserFavorites = () => {
  const t = useTranslations();
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listUser_like().then((res) => {
      setFavoriteList(res?.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mt-4">
        {!loading ? (
          <>
            {!!favoriteList?.length ? (
              <div className="grid grid-cols-2 gap-2">
                {favoriteList?.map((item) => (
                  <ProductCard inFavoriteLayout key={item?.id} item={item} />
                ))}
              </div>
            ) : (
              <AlertMessage msg={t("favorite_empty")} />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
