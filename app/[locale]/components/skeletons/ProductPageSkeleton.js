import React from "react";

export const ProductPageSkeleton = () => {
  return (
    <>
      <div className="self-center relative -top-3 w-[200px] h-[25px] bg-gray-200 rounded animate-pulse"></div>
      <div className="flex w-full justify-center animate-pulse">
        <div className="flex w-[80%] justify-between text-[15px]">
          <div className="rounded-full  w-[70px] h-[25px] flex items-center justify-center bg-gray-200"></div>
          <div className="rounded-full  w-[70px] h-[25px] flex items-center justify-center bg-gray-200"></div>
          <div className="rounded-full  w-[70px] h-[25px] flex items-center justify-center bg-gray-200"></div>
        </div>
      </div>
    </>
  );
};
