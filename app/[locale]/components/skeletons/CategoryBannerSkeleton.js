import React from "react";

const CategoryBannerSkeleton = () => {
  return (
    <div className="relative w-full animate-pulse">
      <div className="bg-gray-200 h-[175px]"></div>
      <div className="absolute bottom-[15%] -translate-x-2/4  left-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-4">
        <div className="bg-white h-7 w-[150px] rounded-lg"></div>
        <div className="bg-white h-7 w-[90px] rounded-3xl"></div>
      </div>
    </div>
  );
};

export default CategoryBannerSkeleton;
