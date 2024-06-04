"use client";
import Image from "next/image";
import React from "react";

const ProductSliderFull = ({ src }) => {
  return (
    <div className="w-[283px] md:w-[319px] lg:w-[360px] min-h-[300px] xl:w-[390px] relative">
      <Image
        className="w-full object-contain h-full"
        src={src}
        alt="product image"
        height={450}
        width={390}
        priority
      />
    </div>
  );
};

export default ProductSliderFull;
