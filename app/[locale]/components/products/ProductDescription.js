"use client";
import { getCategoryInfo } from "@/app/api/supabase/products";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";

const ProductFeatureRow = ({ containerClassName, name, label }) => {
  if (!name) return;
  return (
    <div className={`flex ${containerClassName}`}>
      <p className="w-[200px] font-semibold">{label}:</p>
      <p>{name}</p>
    </div>
  );
};

const ProductDescription = ({
  product,
  setCategoryInfo,
  categoryInfo,
  color,
}) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const [availableColors, setAvailableColors] = useState();

  const content = product?.productcontents?.find(
    (p) => p?.language_id === language?.id
  );

  const variants = product?.productvariants;

  useEffect(() => {
    if (!product?.productinfo?.category_id || !language?.id) return;

    getCategoryInfo(product?.productinfo?.category_id).then((res) => {
      let selectedCategoryByLanguage = res?.data?.find(
        (category) => category?.language_id === language?.id
      );
      setCategoryInfo(selectedCategoryByLanguage);
    });
    let colorsContent = {};
    let sizesContent = {};
    if (variants) {
      for (const variant of product?.productvariants) {
        for (const subVariant of variant?.colorContents) {
          if (!colorsContent[subVariant?.id]) {
            colorsContent[subVariant?.id] = subVariant;
          }
        }
        for (const subVariant of variant?.sizeContents) {
          if (!sizesContent[subVariant?.id]) {
            sizesContent[subVariant?.id] = subVariant;
          }
        }
      }
    }

    setAvailableColors(Object.values(colorsContent));
  }, [
    product?.productinfo?.category_id,
    language?.id,
    product?.productvariants,
    variants,
  ]);

  return (
    <div className="flex flex-col text-[#707070] space-y-4 text-[14px]  border-b pb-6 border-[#AEAEAE] ">
      <ProductFeatureRow
        containerClassName="flex-col gap-2 bg-white p-4 hover:shadow flex flex-col gap-2 rounded-md"
        label={t("Product_Description")}
        name={content?.description}
      />
      <div className=" bg-white p-4 hover:shadow flex flex-col gap-2 rounded-md">
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
            product?.productinfo?.material_content?.find(
              (material) => material?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("fabricType")}
          name={
            product?.productinfo?.fabric_content?.find(
              (fabric) => fabric?.language_id === language?.id
            )?.name
          }
        />
        {/* 01070663083 */}

        <ProductFeatureRow
          label={t("fabric_information")}
          name={
            product?.productinfo?.fabric_information_content?.find(
              (fabric_information) =>
                fabric_information?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("season")}
          name={
            product?.productinfo?.season_content?.find(
              (season) => season?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("environment")}
          name={
            product?.productinfo?.environment_content?.find(
              (environment) => environment?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("style")}
          name={
            product?.productinfo?.style_content?.find(
              (style) => style?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("package_contents")}
          name={
            product?.productinfo?.package_content?.find(
              (_package) => _package?.language_id === language?.id
            )?.name
          }
        />
      </div>
      <div className=" bg-white p-4 hover:shadow flex flex-col gap-2 rounded-md">
        <ProductFeatureRow
          label={t("Color")}
          name={
            availableColors?.find(
              (s) =>
                s?.language_id === language?.id &&
                s?.color_id === color?.color_id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("Product_Pattern")}
          name={
            product?.productinfo?.pattern_content?.find(
              (pattern) => pattern?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("lining")}
          name={
            product?.productinfo?.lining_content?.find(
              (lining) => lining?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("collarType")}
          name={
            product?.productinfo?.collar_content?.find(
              (collar) => collar?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("sleeve_type")}
          name={
            product?.productinfo?.sleeve_type_content?.find(
              (sleeve_type) => sleeve_type?.language_id === language?.id
            )?.name
          }
        />

        <ProductFeatureRow
          label={t("sleeveLength")}
          name={
            product?.productinfo?.sleeve_content?.find(
              (sleeve) => sleeve?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("waist")}
          name={
            product?.productinfo?.waist_content?.find(
              (waist) => waist?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("belt_condition")}
          name={
            product?.productinfo?.belt_condition_content?.find(
              (belt_condition) => belt_condition?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("pocket")}
          name={
            product?.productinfo?.pocket_content?.find(
              (pocket) => pocket?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("leg_type")}
          name={
            product?.productinfo?.leg_type_content?.find(
              (leg_type) => leg_type?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("closure_type")}
          name={
            product?.productinfo?.closure_type_content?.find(
              (closure_type) => closure_type?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("thickness")}
          name={
            product?.productinfo?.thickness_content?.find(
              (thickness) => thickness?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("specialFeatures")}
          name={
            product?.productinfo?.feature_content?.find(
              (feature) => feature?.language_id === language?.id
            )?.name
          }
        />

        {/* <ProductFeatureRow
          label={t("additional_feature")}
          name="جديد لا يوجد معلومات بعد (اختبار)"
        /> */}
        <ProductFeatureRow
          label={t("printing_technique")}
          name={
            product?.productinfo?.printing_technique_content?.find(
              (printing_technique) =>
                printing_technique?.language_id === language?.id
            )?.name
          }
        />
        <ProductFeatureRow
          label={t("embroidery_type")}
          name={
            product?.productinfo?.embroidery_type_content?.find(
              (embroidery_type) => embroidery_type?.language_id === language?.id
            )?.name
          }
        />
      </div>
      <ProductFeatureRow
        containerClassName="bg-white p-4 hover:shadow flex flex-col gap-2 rounded-md"
        label={t("washing_instructions")}
        name={
          product?.productinfo?.washing_instructions_content?.find(
            (washing_instructions) =>
              washing_instructions?.language_id === language?.id
          )?.name
        }
      />
    </div>
  );
};

export default ProductDescription;
