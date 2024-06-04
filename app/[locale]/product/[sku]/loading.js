import React from "react";
import ProductPageSkeletonTwo from "../../components/skeletons/ProductPageSkeletonTwo";
import ProductsSliderSkeleton from "../../components/skeletons/ProductsSliderSkeleton";
import ProductPageSliderSkeleton from "../../components/skeletons/ProductPageSliderSkeleton";
import { ProductPageSkeleton } from "../../components/skeletons/ProductPageSkeleton";

const loading = () => {
  return (
    <div className=" mx-auto container">
      <ProductPageSliderSkeleton />
      <ProductPageSkeleton />;
      <ProductPageSkeletonTwo />
      <ProductsSliderSkeleton />
    </div>
  );
};

export default loading;
