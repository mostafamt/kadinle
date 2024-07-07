// import Image from "next/image";
// import Link from "next/link";

// import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";

// export const CategoryBanner = async ({
//   category,
//   homeSectionsOrder,
//   languageId,
//   t,
//   page,
// }) => {
//   const categoryInfo = category?.content?.find(
//     (cat) => cat.language_id === languageId
//   );
//   const categoryOrderName = category?.content?.find(
//     (cat) => cat.language_id === "c53d7987-f51a-4b47-9ee0-3215becdce17"
//   );

//   let sectionSettings =
//     homeSectionsOrder?.[categoryOrderName?.title?.toLowerCase()];

//   return (
//     <Link
//       href={`/categories/${categoryInfo?.category_id}?parent_id=${categoryInfo?.category_id}`}
//       className="cursor-pointer block relative w-full mb-3 container mx-auto"
//       style={{
//         order: sectionSettings?.section_order,
//         display: !sectionSettings?.display_home && "none !important",
//       }}
//     >
//       <div className=" relative flex flex-col space-y-3 ">
//         <div className="flex flex-col space-y-4 items-center w-full">
//           <div className="relative w-full ">
//             <div className="flex bg-gray-50 overflow-hidden justify-center w-full min-h-[140px] ">
//               <Image
//                 src={
//                   categoryInfo?.mobile_image
//                     ? categoryInfo?.mobile_image
//                     : categoryInfo?.web_image
//                     ? categoryInfo?.web_image
//                     : "https://kadinle-web-next.vercel.app/_next/image?url=https%3A%2F%2Fkadinle.com%2Fmedia%2Fcategories%2F0d51e8b9-9d21-4190-b1f7-dcee2f0c1352%2FTurkish%2Fweb%2FTR.jpg&w=1920&q=75"
//                 }
//                 className=" w-full object-cover !h-auto"
//                 alt={categoryInfo?.title}
//                 height={140}
//                 width={575}
//               />
//             </div>
//             <div className="absolute bottom-[25%] -translate-x-2/4  left-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-4">
//               <h3 className="text-white text-sm xs:text-xl font-normal categoryShadow ltr:tracking-[3.1px] leading-[20px]">
//                 {categoryInfo?.title}
//               </h3>
//               {page === "main" && (
//                 <button
//                   className={`transition-all duration-300  hover:bg-primary hover:text-[#FFFFFF] hover:scale-[1.1] scale-[1] bg-[#FFFFFF] text-primary"
//                 cursor-pointer flex  items-center !mt-2 w-fit ltr:pr-[2px] rtl:pl-[2px] py-[3px] rounded-3xl justify-between gap-3`}
//                 >
//                   <span className="text-[10px] flex-1 ltr:pl-2 rtl:pr-2 whitespace-nowrap text-center text-inherit">
//                     {t("SEE_MORE")}
//                   </span>
//                   <PrimaryArrowIcon
//                     containerClassName="!w-6 !h-6"
//                     arrowClassName="!w-4 !h-4"
//                   />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

import Image from "next/image";
import Link from "next/link";

import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";
import { useTranslations } from "next-intl";

export const CategoryBanner = async ({
  category,
  homeSectionsOrder,
  languageId,

}) => {
  const t = useTranslations()
  if (category?.content?.at(0)?.id) console.log(category, "category");

  const categoryInfo = category?.content?.find(
    (cat) => cat.language_id === languageId
  );

  let sectionSettings = homeSectionsOrder?.[category?.id];

  return (
    <Link
      href={`/categories/${categoryInfo?.category_id}?parent_id=${categoryInfo?.category_id}`}
      className="cursor-pointer block relative w-full mb-2 container min-h-[140px bg-gray-100 w-full mx-auto"
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
    >
      <div className="full-screen">
        <Image
          alt="circle"
          className={`w-[150px] top-[30%] absolute left-0`}
          src="https://kadinle.com/media/images/circle.png"
          height={150}
          width={120}
        />
      </div>
      <div className=" relative flex flex-col space-y-3 lg:mx-6">
        <div className="flex flex-col space-y-4 items-center w-full container">
          <div className="relative w-full ">
            <div className="flex bg-gray-50 lg:rounded-2xl overflow-hidden justify-center w-full h-[140px] md:h-[320px] lg:h-[350px]">
              {categoryInfo?.web_image ? (
                <Image
                  src={categoryInfo?.web_image ? categoryInfo?.web_image : ""}
                  className=" w-full object-cover lg:rounded-2xl !h-auto"
                  alt={categoryInfo?.title}
                  height={250}
                  width={1900}
                />
              ) : null}
            </div>
            <div className="absolute bottom-[15%] -translate-x-2/4  left-1/2 flex flex-col justify-center items-center space-y-4 md:space-y-4">
              <h3 className="text-white text-sm xs:text-xl md:text-[30px] font-black categoryShadow ltr:tracking-[3.1px] leading-[20px]">
                {categoryInfo?.title}
              </h3>
              <button
                className={`transition-all duration-[600ms] hover:bg-primary hover:text-[#FFFFFF] hover:scale-[1.1]                    scale-[1] bg-[#FFFFFF] text-[#676767]"
                cursor-pointer flex  items-center w-fit ltr:pr-[2px] rtl:pl-[2px] py-[3px] rounded-3xl justify-between gap-3`}
              >
                <span className="text-sm text-[10px] flex-1 ltr:pl-2 rtl:pr-2 whitespace-nowrap text-center ">
                  {t("SEE_MORE")}
                </span>
                <PrimaryArrowIcon />
                {/* <Image
                  className="cursor-pointer w-[35px] rtl:rotate-180"
                  src={"https://kadinle.com/media/images/arrow.png"}
                  alt="Go to category page"
                /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
