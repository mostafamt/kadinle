import Image from "next/image";
import Link from "next/link";

import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";

export const CategoryBanner = async ({
  category,
  homeSectionsOrder,
  languageId,
  t,
}) => {
  const categoryInfo = category?.content?.find(
    (cat) => cat.language_id === languageId
  );
  const categoryOrderName = category?.content?.find(
    (cat) => cat.language_id === "c53d7987-f51a-4b47-9ee0-3215becdce17"
  );

  let sectionSettings =
    homeSectionsOrder?.[categoryOrderName?.title?.toLowerCase()];

  return (
    <Link
      href={`/categories/${categoryInfo?.category_id}?parent_id=${categoryInfo?.category_id}`}
      className="cursor-pointer block relative w-full mb-3 container mx-auto"
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
    >
      <div className=" relative flex flex-col space-y-3 ">
        <div className="flex flex-col space-y-4 items-center w-full">
          <div className="relative w-full ">
            <div className="flex bg-gray-50 overflow-hidden justify-center w-full min-h-[140px] ">
                <Image
                  src={
                    categoryInfo?.mobile_image
                      ? categoryInfo?.mobile_image
                      : categoryInfo?.web_image ? categoryInfo?.web_image : "https://kadinle-web-next.vercel.app/_next/image?url=https%3A%2F%2Fkadinle.com%2Fmedia%2Fcategories%2F0d51e8b9-9d21-4190-b1f7-dcee2f0c1352%2FTurkish%2Fweb%2FTR.jpg&w=1920&q=75"
                  }
                  className=" w-full object-cover !h-auto"
                  alt={categoryInfo?.title}
                  height={140}
                  width={575}
                />
            </div>
            <div className="absolute bottom-[25%] -translate-x-2/4  left-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-4">
              <h3 className="text-white text-sm xs:text-xl font-normal categoryShadow ltr:tracking-[3.1px] leading-[20px]">
                {categoryInfo?.title}
              </h3>
              <button
                className={`transition-all duration-300  hover:bg-primary hover:text-[#FFFFFF] hover:scale-[1.1] scale-[1] bg-[#FFFFFF] text-primary"
                cursor-pointer flex  items-center !mt-2 w-fit ltr:pr-[2px] rtl:pl-[2px] py-[3px] rounded-3xl justify-between gap-3`}
              >
                <span className="text-[10px] flex-1 ltr:pl-2 rtl:pr-2 whitespace-nowrap text-center text-inherit">
                  {t("SEE_MORE")}
                </span>
                <PrimaryArrowIcon
                  containerClassName="!w-6 !h-6"
                  arrowClassName="!w-4 !h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
