"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { POINTS_STATUS } from "@/app/api/static/constants";
import { getUserData, getUserPoints } from "@/app/api/supabase/user";

export const UserPoints = ({ active, setActive }) => {
  const t = useTranslations();
  const [target, setTarget] = useState("all");
  const [points, setPoints] = useState();
  const [filterPoints, setFilterPoints] = useState();
  const [totalPoints, setTotalPoints] = useState();

  useEffect(() => {
    getUserPoints().then((res) => {
      setPoints(res?.data);
      setFilterPoints(res?.data);
    });
    getUserData().then((res) => {
      setTotalPoints(res.data?.at(0)?.points);
    });
  }, []);

  const onFilterPoints = (filter) => {
    setTarget(filter);
    if (filter === "all") {
      setFilterPoints(points);
    } else {
      let newFilter = points.filter((point) => point?.status === filter);
      setFilterPoints(newFilter);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full pb-1">
        <div className="self-center flex justify-center mt-8">
          <Image
            className="w-[65%] object-contain h-auto"
            src={"https://kadinle.com/media/images/points.svg"}
            alt="points"
            height={250}
            width={260}
          />
        </div>
      </div>

      <div className="self-center flex flex-col justify-center items-center">
        <h3 className="text-[15px]  mt-4 mb-2">{t("My_Points")}!</h3>
      </div>
      <p className="text-[12px] text-[#6C8394]  mb-2">{t("point_msg")}</p>

      <div className="flex flex-col bg-owhite  items-center  py-4 px-4 mt-4">
        <h4 className="text-[15px]">{t("Total_Points")}</h4>
        <p className="text-opink font-[700] text-[27px]">{totalPoints}</p>
        <div className="flex flex-col self-start mt-2">
          <p className="text-[12px]">{t("Details_points")}</p>
        </div>
        <div className="flex justify-between w-full text-[11px] md:text-[13px] 2xl:text-[15px] mt-3">
          <button
            onClick={(e) => onFilterPoints("all")}
            className={`cursor-pointer ${
              target === "all" ? "text-opink" : "text-[#7E7E7E]"
            } `}
          >
            {t("All")}
          </button>
          <button
            onClick={(e) => onFilterPoints("Acquired")}
            className={`cursor-pointer ${
              target === "Acquired" ? "text-opink" : "text-[#7E7E7E]"
            } `}
          >
            {t("Acquired")}
          </button>
          <button
            onClick={(e) => onFilterPoints("Used")}
            className={`cursor-pointer ${
              target === "Used" ? "text-opink" : "text-[#7E7E7E]"
            } `}
          >
            {t("Used")}
          </button>
          <button
            onClick={(e) => onFilterPoints("Expired")}
            className={`cursor-pointer ${
              target === "Expired" ? "text-opink" : "text-[#7E7E7E]"
            } `}
          >
            {t("Expired")}
          </button>
        </div>
        {filterPoints?.length ? (
          <>
            {points?.map((point) => (
              <div
                key={point?.id}
                className="flex gap-3 mt-4 border rounded-md p-1 w-full relative"
              >
                <span
                  key={point}
                  className={`rounded-md flex items-center justify-center text-base w-16 text-white ${
                    point?.status === POINTS_STATUS?.[1] && "bg-green-500"
                  } ${
                    point?.status === POINTS_STATUS?.[2] && "bg-orange-500"
                  } ${point?.status === POINTS_STATUS?.[3] && "bg-red-500"}`}
                >
                  {point?.point}
                </span>
                <div className="">
                  <h3 className="text-opink font-medium">{t(point?.status)}</h3>
                  <p className="text-gray-500 text-xs">{point?.cause}</p>
                </div>
                <span className="absolute top-2 ltr:right-2 rtl:left-2 text-xs text-gray-500">
                  {new Date(point?.created_at).toLocaleString("en-UK")}
                </span>
              </div>
            ))}
          </>
        ) : (
          <Image
            className="w-[55px] object-contain"
            src={"https://kadinle.com/media/images/empty.png"}
            alt="no points"
            height={55}
            width={55}
          />
        )}
      </div>
    </div>
  );
};
