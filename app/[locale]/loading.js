import React from "react";

import CategoryBannerSkeleton from "./components/skeletons/CategoryBannerSkeleton";
import { CollectionsSkeleton } from "./components/skeletons/CollectionsSkeleton";
import SaleTimerSkeleton from "./components/skeletons/SaleTimerSkeleton";

export default function loading() {
  return (
    <div className="mx-auto w-full container">
      <CategoryBannerSkeleton />
      <div className="h-32 w-full animate-pulse" />
      <SaleTimerSkeleton />
      <div className="h-32 w-full animate-pulse" />
      <CollectionsSkeleton />
      <div className="h-32 w-full animate-pulse" />
      <CategoryBannerSkeleton />
      <CategoryBannerSkeleton />
      <CategoryBannerSkeleton />
      <CategoryBannerSkeleton />
    </div>
  );
}
