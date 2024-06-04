"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const ProductFeatureRow = ({ containerClassName, name, label }) => {
  if (!name) return;
  return (
    <div className={`flex flex-1 items-start ${containerClassName}`}>
      <p className="w-[100px] ltr:w-[125px] whitespace-nowrap font-semibold text-[#707070]">
        {label}:
      </p>
      <p>{name}</p>
    </div>
  );
};

export const ProductInfo = ({
  content,
  info,
  categoryInfo,
  language,
  availableColors,
  color,
}) => {
  const t = useTranslations();

  return (
    <div className="mt-2 flex flex-col text-[12px] space-y-[7px] bg-owhite p-3 rounded-[8px]">
      <ProductFeatureRow
        containerClassName="flex-col gap-2 bg-gray-50 border p-4 hover:shadow flex flex-col gap-2 rounded-md"
        label={t("Product_Description")}
        name={content?.description}
      />
      <div className=" bg-gray-50 border p-4 hover:shadow flex flex-col gap-2 rounded-md">
        <ProductFeatureRow
          label={t("productCategory")}
          name={
            <Link
              href={`/categories/${categoryInfo?.category_id}`}
              state={{
                parent_id: categoryInfo?.parent_id || categoryInfo?.category_id,
              }}
              className="text-opink cursor-pointer no-underline"
            >
              {categoryInfo?.title}
            </Link>
          }
        />

        <ProductFeatureRow
          label={t("Product_Material")}
          name={
            info?.material_content?.find(
              (material) => material?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("fabricType")}
          name={
            info?.fabric_content?.find(
              (fabric) => fabric?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("fabric_information")}
          name={
            info?.fabric_information_content?.find(
              (fabric_information) =>
                fabric_information?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("season")}
          name={
            info?.season_content?.find(
              (season) => season?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("environment")}
          name={
            info?.environment_content?.find(
              (environment) => environment?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("style")}
          name={
            info?.style_content?.find(
              (style) => style?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("package_contents")}
          name={
            info?.package_content?.find(
              (_package) => _package?.language_id === language?.id
            )?.name
          }
        />
      </div>
      <div className=" bg-gray-50 border p-4 hover:shadow flex flex-col gap-2 rounded-md">
        <ProductFeatureRow
          label={t("Color")}
          name={
            availableColors?.find(
              (s) =>
                s.language_id === language?.id &&
                s?.color_id === color?.color_id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("Product_Pattern")}
          name={
            info?.pattern_content?.find(
              (pattern) => pattern?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("lining")}
          name={
            info?.lining_content?.find(
              (lining) => lining?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("collarType")}
          name={
            info?.collar_content?.find(
              (collar) => collar?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("sleeve_type")}
          name={
            info?.sleeve_type_content?.find(
              (sleeve_type) => sleeve_type?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("sleeveLength")}
          name={
            info?.sleeve_content?.find(
              (sleeve) => sleeve?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("waist")}
          name={
            info?.waist_content?.find(
              (waist) => waist?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("belt_condition")}
          name={
            info?.belt_condition_content?.find(
              (belt_condition) => belt_condition?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("pocket")}
          name={
            info?.pocket_content?.find(
              (pocket) => pocket?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("leg_type")}
          name={
            info?.leg_type_content?.find(
              (leg_type) => leg_type?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("closure_type")}
          name={
            info?.closure_type_content?.find(
              (closure_type) => closure_type?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("thickness")}
          name={
            info?.thickness_content?.find(
              (thickness) => thickness?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("specialFeatures")}
          name={
            info?.feature_content?.find(
              (feature) => feature.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("printing_technique")}
          name={
            info?.printing_technique_content?.find(
              (printing_technique) =>
                printing_technique?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("embroidery_type")}
          name={
            info?.embroidery_type_content?.find(
              (embroidery_type) => embroidery_type?.language_id === language?.id
            )?.name
          }
        />
      </div>
      <ProductFeatureRow
        containerClassName="bg-gray-50 border p-4 hover:shadow flex flex-col gap-2 rounded-md"
        label={t("washing_instructions")} // NEW
        name={
          info?.washing_instructions_content?.find(
            (washing_instructions) =>
              washing_instructions?.language_id === language?.id
          )?.name
        }
      />
    </div>
  );
};
