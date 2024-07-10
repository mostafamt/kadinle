import React from "react";

const CategoryBannerSkeleton = () => {
  return (
    <div className="relative w-full animate-pulse lg:container">
      <div className="bg-gray-200 h-[175px] lg:rounded-2xl lg:overflow-hidden lg:h-[350px]"></div>
      <div className="absolute bottom-[15%] -translate-x-2/4  left-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-4">
        <div className="bg-white h-7 w-[150px] lg:h-10 lg:w-[180px] rounded-lg"></div>
        <div className="bg-white h-7 w-[90px] lg:h-10 lg:w-[120px] rounded-3xl"></div>
      </div>
    </div>
  );
};

export default CategoryBannerSkeleton;
