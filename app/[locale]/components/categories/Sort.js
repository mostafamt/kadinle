"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
const apply = "https://kadinle.com/media/images/apply.svg";

const Sort = ({ setOpenSort, selectedSort, setSelectedSort }) => {
  const t = useTranslations();
  return (
    <div
      onClick={(e) => setOpenSort(false)}
      className="fixed w-full h-full top-0 left-0  bg-[#0005] z-30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-[14px] flex flex-col w-[80%] max-w-[300px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-owhite"
      >
        <h3 className="mb-4 ltr:pl-8 rtl:pr-8 pt-5 text-[#25252D] font-[200] text-[14px] capitalize">
          {`${t("sortBy")}  :`}
        </h3>

        <div className="w-full flex justify-center">
          <div className="w-[70%] flex flex-col">
            <button
              onClick={(e) => setSelectedSort("NEW")}
              className={`${
                selectedSort === "NEW"
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-black"
              } cursor-pointer py-2 ltr:pl-2 rtl:pr-2 border-b capitalize `}
            >
              {t("newToOld")}
            </button>

            <button
              onClick={(e) => setSelectedSort("OLD")}
              className={`${
                selectedSort === "OLD"
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-black"
              } cursor-pointer py-2 ltr:pl-2 rtl:pr-2 border-b capitalize `}
            >
              {t("oldToNew")}
            </button>
            <button
              onClick={(e) => setSelectedSort("MAX_TO_MIN")}
              className={`${
                selectedSort === "MAX_TO_MIN"
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-black"
              } cursor-pointer py-2 ltr:pl-2 rtl:pr-2 border-b capitalize `}
            >
              {t("highestPrice")}
            </button>
            <button
              onClick={(e) => setSelectedSort("MIN_TO_MAX")}
              className={`${
                selectedSort === "MIN_TO_MAX"
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-black"
              } cursor-pointer py-2 ltr:pl-2 rtl:pr-2 border-b capitalize `}
            >
              {t("lowestPrice")}
            </button>
            <button
              onClick={(e) => setSelectedSort("POPULAR")}
              className={`${
                selectedSort === "POPULAR"
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-black"
              } cursor-pointer py-2 ltr:pl-2 rtl:pr-2 border-b capitalize `}
            >
              {t("highestRated")}
            </button>

            <button
              onClick={(e) => setOpenSort(false)}
              className="flex justify-between px-2 capitalize py-1 self-center mt-[50px] mb-[20px] gap-4 items-center w-[135px] text-[12px] bg-opink text-owhite rounded-full"
            >
              {t("applySort")}
              <Image
                src={apply}
                alt="apply sort"
                height={30}
                width={30}
                className="rtl:rotate-180"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
