import React from "react";

export const SkeletonText = ({ className }) => {
  return (
    <div
      className={`h-4 w-32 rounded-md bg-gray-200 animate-pulse ${className}`}
    />
  );
};
