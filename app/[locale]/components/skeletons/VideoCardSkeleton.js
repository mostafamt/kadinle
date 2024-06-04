import React from "react";

const VideoCardSkeleton = () => {
  return (
    <div className="relative flex flex-col border border-[#E264AD] p-2 rounded-lg animate-pulse">
      <div className="relative h-[270px] bg-gray-200 flex items-center justify-center">
        <div className="bg-gray-300 w-14 h-14 rounded-[50%]"></div>
      </div>
      <div className=" w-[30%] bg-gray-200 rounded-md lg:rounded-lg h-6 mt-3"></div>
    </div>
  );
};

export default VideoCardSkeleton;
