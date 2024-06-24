"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import SingleCategorySkeleton from "../skeletons/SingleCategorySkeleton";
import Filters from "../categories/Filters";
import VideoCard from "../home/VideoCard";
import ReactPaginate from "react-paginate";

const VideosDT = ({ videos, layout }) => {
  const t = useTranslations();
  const containerRef = useRef();
  const { currency, language } = useGlobalOptions();
  const [videosFilter, setVideosFilter] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const [pageCount, setPageCount] = useState(1);
  const [itemParPage, setItemParPage] = useState(24);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshSort, setRefreshSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("NEW");

  useEffect(() => {
    setSelectedVideos(videos);
  }, []);

  // useEffect(() => {
  //   if (selectedSort === "POPULAR")
  //     setSelectedVideos(sortByRating(selectedVideos, "asc"));
  //   if (selectedSort === "MAX_TO_MIN")
  //     setSelectedVideos(sortByPrice(selectedVideos, "desc"));
  //   if (selectedSort === "MIN_TO_MAX")
  //     setSelectedVideos(sortByPrice(selectedVideos, "asc"));
  //   if (selectedSort === "OLD")
  //     setSelectedVideos(sortByDateAdded(selectedVideos, "asc"));
  //   if (selectedSort === "NEW")
  //     setSelectedVideos(sortByDateAdded(selectedVideos, "desc"));
  //   setRefreshSort((p) => !p);
  // }, [selectedSort, selectedVideos]);

  useEffect(() => {
    const endOffset = itemOffset + itemParPage;
    const currentItems = selectedVideos?.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(selectedVideos?.length / itemParPage));
    setVideosFilter(currentItems);
  }, [itemOffset, itemParPage, selectedVideos, refreshSort]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemParPage;
    setItemOffset(newOffset);
    if (typeof window === "object") {
      const containerTop =
        containerRef?.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, containerTop);
    }
  };

  function sortByRating(products, sortOrder) {
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === "desc") {
      return list?.sort((a, b) => b.rating - a.rating);
    } else {
      return list;
    }
  }

  function sortByDateAdded(products, sortOrder) {
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (sortOrder === "desc") {
      return list?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      return list;
    }
  }

  function sortByPrice(products, sortOrder) {
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return list?.sort((a, b) => b.price - a.price);
    } else {
      return list;
    }
  }

  return (
    <section className="flex flex-col poppins overflow-hidden">
      <div className="flex justify-center mt-1 ">
        <div className="w-full flex flex-col items-center">
          <div className="container mb-2">
            <h3 className="w-full text-gray-600 text-sm mt-4">
              {t("videos")}: {selectedVideos?.length}
            </h3>
          </div>
          <div
            ref={containerRef}
            className="container flex w-full justify-between"
          >
            <>
              {loading ? (
                <SingleCategorySkeleton layout={layout} />
              ) : (
                <>
                  {!!videosFilter?.length ? (
                    <>
                      <Filters
                        filters={{}}
                        currency={currency}
                        // setRefreshFilter={setRefreshFilter}
                        selectedCategories={selectedCategories}
                        selectedColors={selectedColors}
                        selectedSizes={selectedSizes}
                        setSelectedCategories={setSelectedCategories}
                        setSelectedColors={setSelectedColors}
                        setSelectedSizes={setSelectedSizes}
                      />
                      <div className="flex flex-col  mt-4 xl:w-[calc(100%-320px)] lg:w-[calc(100%-300px)] md:w-[calc(100%-320px)] sm:w-[calc(100%-320px)]">
                        <div className="flex gap-4 flex-wrap lg:gap-12 ">
                          <div className="flex items-center gap-2 lg:gap-6">
                            <label className="text-[16px] lg:text-[18px]">
                              {t("Show_products")}:
                            </label>
                            <select
                              // onClick={(e) => setItemParPage(e.target.value)}
                              className="border border-[#E264AD] rounded-2xl p-1 px-3"
                            >
                              <option>10</option>
                              <option>20</option>
                              <option>50</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2 lg:gap-6 sort">
                            <label className="text-[16px] lg:text-[18px] capitalize">
                              {t("sort")}
                            </label>
                            <select
                              className="capitalize border border-[#E264AD] rounded-2xl p-1 px-3"
                              onClick={(e) => setSelectedSort(e.target.value)}
                            >
                              <option value="NEW">{t("newToOld")}</option>
                              <option value="OLD">{t("oldToNew")}</option>
                              <option value="MAX_TO_MIN">
                                {t("highestPrice")}
                              </option>
                              <option value="MIN_TO_MAX">
                                {t("lowestPrice")}
                              </option>
                              <option value="POPULAR">
                                {t("highestRated")}
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="gap-4 mt-[40px] grid md:grid-cols-2 lg:grid-cols-4">
                          {videosFilter?.map((video, index) => (
                            <div className="max-w-full" key={video?.id}>
                              <VideoCard review={video} layout={layout} />
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto mb-4">
                          <ReactPaginate
                            breakClassName="bg-gray-100 p-1 rounded-md px-2"
                            containerClassName="flex items-center gap-2 mt-4 max-w-fit mx-auto"
                            pageLinkClassName=" p-1 rounded-md px-2 bg-gray-100"
                            activeLinkClassName="text-white bg-primary"
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<"
                            disabledClassName="bg-transparent border border-gray-200"
                            nextClassName="text-lg px-2 rounded-md bg-gray-300"
                            previousClassName="text-lg px-2 rounded-md bg-gray-300"
                            renderOnZeroPageCount={null}
                            sp
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="bg-red-100 flex-1 h-fit m-20 text-red-500 p-2 rounded-md text-center px-8 my-[40px]">
                      {t("no_results")}
                    </p>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideosDT;
