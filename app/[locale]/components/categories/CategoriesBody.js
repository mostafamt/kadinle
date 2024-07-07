"use client";
import React, { useEffect, useState } from "react";
import { CategoriesHead } from "./CategoriesHead";
import { CategoryBanner } from "../home/CategoryBanner";
import { getHomeSectionSorted } from "@/app/api/supabase/home";
import { SECTIONS_ORDER } from "@/app/api/static/constants";
import CategoryBodyCircles from "./CategoryBodyCircles";

export const CategoriesBody = ({ categories, languageId }) => {
  console.log("categories", categories);
  const [format, setFormat] = useState(2);
  const [homeSectionsOrder, setHomeSectionsOrder] = useState(SECTIONS_ORDER);

  const fetchHomeSectionsOrder = async () => {
    const res = await getHomeSectionSorted();
    if (res?.error) {
      return SECTIONS_ORDER;
    } else {
      let hash = {};
      for (const section of res?.data) {
        let hashName = section?.section_name?.toLowerCase();
        hash[hashName] = {
          ...section,
          section_order: section?.section_order + 1,
        };
      }
      return hash;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sectionsOrder = await fetchHomeSectionsOrder();
      setHomeSectionsOrder(sectionsOrder);
    };

    fetchData();
  }, []);

  return (
    <div className="pb-28">
      <CategoriesHead
        categories={categories}
        setFormat={setFormat}
        format={format}
      />
      <div
        className={`w-full grid mt-4 px-2 container mx-auto ${
          format === 2 ? "grid-cols-1 gap-2" : "gap-3"
        } `}
      >
        {categories?.map((category) => (
          <div key={category?.id}>
            <CategoryBanner
              homeSectionsOrder={homeSectionsOrder}
              category={category}
              
              languageId={languageId}
              page="category"
            />
            <CategoryBodyCircles key={category?.id}/>
          </div>
        ))}
      </div>
    </div>
  );
};
