import React from "react";
import { ProductFavorite } from "./ProductFavorite";

export const ProductInfo = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="capitalize font-medium text-sm md:text-lg">
          testing title{" "}
        </h3>
        <ProductFavorite />
      </div>
      <p className="text-gray-500 text-xs">
        {`lorem ipesom lorem ipesom lorem ipesom lorem ipesom lorem ipesom lorem
          ipesom lorem ipesom lorem ipesom lorem ipesom lorem ipesom lorem
          ipesom lorem ipesom`.slice(0, 100)}
      </p>
    </>
  );
};
