import React from "react";

const ProductCardSkeleton = ({ bigCard }) => {
  return (
    <div className="w-full relative flex flex-col border bg-owhite border-primary p-2 md:p-2 rounded-lg animate-pulse">
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
  );
};

export default ProductCardSkeleton;
