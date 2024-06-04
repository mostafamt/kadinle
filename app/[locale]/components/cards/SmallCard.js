"use client";
import { getFormatPrice, stringSlice } from "@/app/api/lib/functions";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const SmallCard = ({ product }) => {
  const { language, currency } = useGlobalOptions();
  const router = useRouter();

  const content = product?.content?.find(
    (p) => p?.language_id === language?.id
  );
  let price = useMemo(() => {
    return product?.discount
      ? product?.price - (product?.discount / 100) * product?.price
      : product?.price;
  }, [product?.discount, product?.price]);

  const handleLink = () => {
    router?.push(
      `/product/${product?.product_sku ? product?.product_sku : product?.sku}`
    );
  };

  return (
    <div className="flex flex-col min-h-[200px] sm:min-h-[220px] space-y-[3px] bg-white overflow-hidden p-2">
      <figure
        className="w-[100%] max-w-[100%] overflow-hidden cursor-pointer relative"
        onClick={handleLink}
      >
        <Image
          className="!w-full min-h-[300px] !h-full object-cover border border-opink"
          src={product?.image ? product?.image : ""}
          alt={content?.name}
          height={300}
          width={120}
          priority
        />
      </figure>
      <div className="">
        <h3
          className="text-[14px] cursor-pointer rtl:right-dir rtl:text-right h-10 overflow-hidden overflow-ellipsis"
          onClick={handleLink}
        >
          {content?.name}
        </h3>
        <div className="flex gap-2 items-center rtl:flex-row-reverse">
          <p className="text-[18px]">{getFormatPrice(price, currency)}</p>
          {product?.discount ? (
            <del className="text-[#CBCBCB] text-[16px] decoration-lpink">
              {getFormatPrice(product?.price, currency)}
            </del>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
