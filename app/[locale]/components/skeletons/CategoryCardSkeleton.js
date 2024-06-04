import React from "react";

const CategoryCardSkeleton = () => {
  return (
    <div className="p-1 border-opink border rounded-md flex flex-col overflow-hidden items-center justify-end animate-pulse w-full">
      <div className="rounded-md bg-gray-200 w-full h-[88px]"></div>
      <div className="rounded bg-gray-200 w-[75px] h-6 mx-auto mt-2"></div>
    </div>
  );
};

export default CategoryCardSkeleton;
