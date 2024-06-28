import { getCategoriesById } from "@/app/api/supabase/home";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import FallbackImage from "../global/FallbackImage";

export const SubCategoriesBar = ({ subCategories: categories, category }) => {
  const params = useParams()
  const { language } = useGlobalOptions();
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategories = async () => {
    const data = await getCategoriesById(category?.parent_id);
    setSubCategories(data);
  };

  useEffect(() => {
    if (!categories?.length) getSubCategories();
    else setSubCategories(categories);
  }, [params?.id]);

  // if(!subCategories?.length) return;

  return (
    <div className={`container ${subCategories?.length ? '' : 'hidden'}`}>
      <div className="flex items-center border-b w-full gap-4 overflow-auto px-4 py-2">
        {subCategories?.map((category) => {
          const categoryContent =
            category?.category_content || category?.content;

          const content = categoryContent?.find(
            (c) => c?.language_id === language?.id
          );
          return (
            <Link
              key={category?.id}
              href={`/categories/${category?.id}`}
              className="flex flex-col gap-1 justify-center items-start overflow-hidden w-20 hover:scale-110 duration-300 "
            >
              <FallbackImage
                containerClassName="bg-gray-100"
                src={category?.image ? category?.image : ""}
                alt={content?.title}
                height={80}
                width={80}
                className="object-contain w-20 h-20 bg-white"
              />
              <h3 className="text-[10px] capitalize whitespace-nowrap text-center w-full font-medium">
                {content?.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
