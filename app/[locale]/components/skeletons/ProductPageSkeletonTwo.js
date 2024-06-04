import React from "react";

const ProductPageSkeletonTwo = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between mt-2">
        <div className="animate-pulse bg-gray-200 w-[105px] h-5 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-4 h-4 rounded"></div>
      </div>
      <div className="my-3 w-full flex items-center justify-center gap-3">
        <div className="w-9 h-7 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-9 h-7 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-9 h-7 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-9 h-7 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-9 h-7 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div>
        <div className="w-20 rounded h-5 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-[46px] h-[43px] bg-gray-200 animate-pulse rounded"></div>
          <div className="w-[46px] h-[43px] bg-gray-200 animate-pulse rounded"></div>
          <div className="w-[46px] h-[43px] bg-gray-200 animate-pulse rounded"></div>
          <div className="w-[46px] h-[43px] bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="flex gap-5 mt-3">
        <div className="w-[150px] rounded h-5 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex flex-col mt-3 mb-3">
        <div className="w-24 rounded h-5 bg-gray-200 animate-pulse"></div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-11 h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-11 h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-11 h-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="mb-4">
        <div className="w-16 rounded h-5 bg-gray-200 animate-pulse mb-2"></div>
        <div className="w-[100px] h-[34px] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="bg-gray-200 w-full h-[134px] rounded animate-pulse mb-3"></div>
      <div className="bg-gray-200 w-full h-12 rounded animate-pulse mb-3"></div>
      <div className="bg-gray-200 w-full h-[77px] rounded animate-pulse mb-3"></div>
      <div className="bg-gray-200 w-full h-[90px] rounded animate-pulse"></div>
    </div>
  );
};

export default ProductPageSkeletonTwo;
