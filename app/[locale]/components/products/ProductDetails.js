"use client";

import { useTranslations } from "next-intl";
import React from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

const ProductDetails = ({ sku, barcode, brand, origin }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col space-y-2 mb-2 mt-5 text-[#25252D] ">
      <div className="flex">
        <p className="w-[55%] font-semibold text-[#707070] text-sm">
          {t("SKU_CODE")}:
        </p>
        <p className=" text-[#707070] ">{sku}</p>
      </div>
      <div className="flex">
        <p className="w-[55%] font-semibold text-[#707070] text-sm">
          {t("origin")}:
        </p>
        <p className=" text-[#707070] ">{origin}</p>
      </div>
      {brand ? (
        <div className="flex ">
          <p className="w-[55%] font-semibold text-[#707070] text-sm">
            {t("brand")}:
          </p>
          <div className="w-[35%]">
            <p className="text-[#707070]  ">{brand?.[0]?.name}</p>
          </div>
        </div>
      ) : null}
      <div className="flex">
        <p className="w-[55%] font-semibold text-[#707070] text-sm">
          {t("QR")}:
        </p>
        <QRCode
          value={typeof window === "object" && window?.location?.href}
          style={{ width: 180, height: 180 }}
        />
      </div>
      {barcode ? (
        <div className="flex justify-between mb-3">
          <p className="text-[16px] ">{t("Barcode")} :</p>
          <Barcode value={barcode} />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
