import React from "react";

export const ProductPrice = () => {
  return (
    <div className="flex items-start gap-1 flex-col">
      <strong className="text-base lg:text-lg">45.99$</strong>
      <del className="text-sm lg:text-sm text-gray-300 line-through -mt-2">
        59.99$
      </del>
    </div>
  );
};
