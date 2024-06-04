"use client";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import VideosCard from "./VideosCard";
import Image from "next/image";
import { ViewAs } from "../categories/ViewAs";
import SingleCategorySkeleton from "../skeletons/SingleCategorySkeleton";
import ScrollUpComponent from "../global/ScrollUpComponent";
import Sort from "../categories/Sort";
import ChevronIcon from "../chat/ChevronIcon";

const filter = "https://kadinle.com/media/images/filter.svg";
const sort = "https://kadinle.com/media/images/sort.svg";

export const Videos = ({ videos, layout }) => {
  const t = useTranslations();
  const containerRef = useRef();
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [format, setFormat] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [videosFilter, setVideosFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [itemParPage, setItemParPage] = useState(24);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [CACHE_SUBCATEGORIES, setCACHE_SUBCATEGORIES] = useState({});
  const [refreshFilter, setRefreshFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("NEW");

  useEffect(() => {
    setSelectedVideos(videos);
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemParPage;
    const currentItems = selectedVideos?.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(selectedVideos?.length / itemParPage));
    setVideosFilter(currentItems);
  }, [itemOffset, itemParPage, selectedVideos]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemParPage;
    setItemOffset(newOffset);

    if (typeof window !== "object") return;

    const containerTop =
      containerRef?.current.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo(0, containerTop);
  };

  return (
    <div className="flex flex-col poppins mb-[65px] ">
      <ScrollUpComponent />
      {openSort && (
        <Sort
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          setOpenSort={setOpenSort}
        />
      )}
      <Fragment>
        <div ref={containerRef} className="flex justify-center">
          <div className="flex flex-col items-center w-[95%] max-w-[500px]">
            {isLoading ? (
              <SingleCategorySkeleton />
            ) : videosFilter?.length ? (
              <>
                <div className="flex justify-between mt-2 w-full my-1 items-center ">
                  <ViewAs format={format} setFormat={setFormat} />
                  <div className="flex gap-4 text-[14px] font-[300]">
                    <button
                      onClick={(e) => setOpenSort(true)}
                      className="py-[3px] px-2 flex justify-center gap-1 bg-opink rounded-sm text-owhite items-center w-1/2 max-w-[120px]"
                    >
                      <Image
                        className="w-[18px]"
                        src={sort}
                        alt="sort"
                        height={18}
                        width={18}
                      />
                      <p className="capitalize">{t("sort")}</p>
                    </button>

                    <button
                      onClick={(e) => setOpenFilter(true)}
                      className="py-[3px] px-2 flex justify-center gap-1 bg-opink rounded-sm text-owhite items-center w-1/2 max-w-[120px]"
                    >
                      <Image
                        className="w-[18px] object-contain"
                        src={filter}
                        alt="filter"
                        height={18}
                        width={18}
                      />
                      <p className="capitalize">{t("filter")}</p>
                    </button>
                  </div>
                </div>
                <div
                  className={`max-w-full grid mt-4 gap-4 ${
                    format === 1 ? "grid-cols-2 !gap-2" : ""
                  } `}
                >
                  {videosFilter?.map((video) => {
                    return (
                      <div className="max-w-full" key={video?.id}>
                        <VideosCard
                          isLarge={format !== 1}
                          review={video}
                          layout={layout}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-auto mb-4">
                  <ReactPaginate
                    breakClassName="bg-gray-100 p-1 rounded-md px-2"
                    containerClassName="flex items-center gap-2 mt-4 max-w-fit mx-auto"
                    pageLinkClassName=" p-1 rounded-md px-2 bg-gray-100"
                    activeLinkClassName="text-white bg-opink"
                    breakLabel="..."
                    nextLabel={
                      <ChevronIcon className="h-4 w-4 ltr:rotate-180" />
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={
                      <ChevronIcon className="h-4 w-4 rtl:rotate-180" />
                    }
                    disabledClassName="bg-transparent border border-gray-200"
                    nextClassName="text-lg px-2 rounded-md bg-gray-300 h-7 w-7 flex items-center justify-center"
                    previousClassName="text-lg px-2 rounded-md bg-gray-300  h-7 w-7 flex items-center justify-center"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <p className="text-center w-full mt-8 text-red-400">
                {t("no_result_in_category")}
              </p>
            )}
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Videos;
