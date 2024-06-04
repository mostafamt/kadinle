import React from "react";

import ProductCardSkeleton from "./ProductCardSkeleton";

const SingleCategorySkeleton = ({ layout }) => {
  return (
    <div className=" mt-3 flex justify-center w-full">
      <div className="flex flex-col items-center w-[95%] max-w-[500px]">
        <div className="w-full relative mb-2">
          {layout === "search" ? (
            <div className="bg-gray-200 w-[150px] h-8 animate-pulse mt-4"></div>
          ) : (
            <>
              {layout === "flash-sale" ? null : (
                <div className="rounded-lg w-full max-w-none h-[165px] bg-gray-200" />
              )}
            </>
          )}
        </div>

        {layout === "flash-sale" && (
          <div className="h-[52px] w-4/5 mx-auto my-2 bg-gray-200 animate-pulse" />
        )}

        <div className="flex justify-between mt-2 w-full my-1 items-center ">
          <div className="flex gap-2 items-center">
            <div className="bg-gray-200 w-7 h-7 animate-pulse rounded"></div>
            <div className="bg-gray-200 w-7 h-7 animate-pulse rounded"></div>
          </div>
          <div className="flex gap-4 text-[14px] font-[300]">
            <div className="bg-gray-200 w-[67px] h-7 animate-pulse rounded"></div>
            <div className="bg-gray-200 w-[67px] h-7 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 mt-5 gap-2 mb-10">
          {Array(24)
            .fill()
            .map((_, idx) => (
              <div className="max-w-full" key={idx}>
                <ProductCardSkeleton bigCard key={idx} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCategorySkeleton;
