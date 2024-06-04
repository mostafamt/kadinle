"use client";

import { getFormatPrice } from "@/app/api/lib/functions";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export const SmallCard = ({ product }) => {
  const router = useRouter();
  const { language, currency } = useGlobalOptions();

  const content = product?.content?.find(
    (p) => p?.language_id === language?.id
  );

  let price = useMemo(() => {
    return product?.discount
      ? product?.price - (product?.discount / 100) * product?.price
      : product?.price;
  }, [product?.discount, product?.price]);

  const handleLink = () => {
    router.push(
      `/product/${product?.product_sku ? product?.product_sku : product?.sku}`
    );
  };
  

  return (
    <div className="flex flex-col space-y-[3px] bg-white p-[4px] overflow-hidden">
      <figure
        className="border-opink border overflow-hidden cursor-pointer mb-1"
        onClick={handleLink}
      >
        <Image
          className="w-full min-h-[150px] h-[100%] object-cover"
          src={product?.image ? product?.image :"https://kadinle-mobile-next.vercel.app/_next/image?url=https%3A%2F%2Fkadinle.com%2Fmedia%2Fproducts%2F6B018%2F125%2F6B01800610910-1.jpg&w=128&q=75"}
          alt={content?.name}
          height={150}
          width={110}
        />
      </figure>
      <div className="flex justify-between items-center w-full ">
        <div className="flex flex-col w-full ">
          <h3
            className="text-[12px] rtl:right-dir whitespace-nowrap text-ellipsis overflow-hidden"
            onClick={handleLink}
          >
            {content?.name}
          </h3>
          <div className="flex gap-2 items-center rtl:flex-row-reverse px-1">
            <p className="text-[12px]">{getFormatPrice(price, currency)}</p>
            {product?.discount ? (
              <del className="text-[#CBCBCB] text-[10px] decoration-lpink">
                {getFormatPrice(product?.price, currency)}
              </del>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
