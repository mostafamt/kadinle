import React from "react";

const ProductCardSkeleton = ({ bigCard }) => {
  return (
    <div className="w-full relative flex flex-col border bg-owhite border-primary p-2 md:p-4 rounded-lg animate-pulse">
      <div className="full-screen">
        <div className="w-[100%] bg-gray-200 h-[300px] rounded-t-lg" />
        <div className="flex justify-between items-center  gap-2 mt-2">
          <div className="flex flex-col w-[65%]">
            <div className="bg-gray-200 h-4 mb-1 w-full"></div>
            <div className="bg-gray-200 h-3 w-3/5"></div>
          </div>
          <div className="flex gap-1 text-white items-center px-4 py-1 lg:py-2 w-[27%] lg:w-none bg-gray-200 h-9 rounded-md lg:rounded-lg" />
        </div>
      </div>
      <div className="mob-screen
      ">
        <div
          className={`${
            bigCard ? "h-[230px]" : "h-[140px]"
          } w-[100%] bg-gray-200 rounded-t-lg`}
        />
        <div className="flex flex-col gap-1 mt-2">
          <div className="bg-gray-200 h-4 w-full"></div>
          <div className="flex justify-between items-center w-full">
            <div className="bg-gray-200 h-3 w-1/3"></div>
            <div className="w-[27%] bg-gray-200 h-5 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
