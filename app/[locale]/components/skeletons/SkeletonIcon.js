import React from "react";

export const SkeletonIcon = ({ className }) => {
  return (
    <div
      className={`h-10 w-10 rounded-full bg-gray-200 animate-pulse ${className}`}
    />
  );
};
