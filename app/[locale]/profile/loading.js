import React from "react";

import { SkeletonIcon } from "../components/skeletons/SkeletonIcon";

export default function loading() {
  return (
    <div className="md:max-w-[575px] md:mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <SkeletonIcon className="h-8 w-8 rounded-md  animate-pulse" />
          <SkeletonIcon className="h-8 w-20 rounded-md  animate-pulse" />
          <SkeletonIcon className="h-8 w-8 rounded-md  animate-pulse" />
        </div>
        <div className=" flex gap-4 items-center">
          <div className="h-28 w-28 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-6 w-32 bg-gray-200 animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-10 w-full bg-gray-200 animate-pulse mb-2" />
    </div>
  );
}
