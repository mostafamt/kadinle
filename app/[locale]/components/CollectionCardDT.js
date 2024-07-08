import Image from "next/image";
import Link from "next/link";
import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";

export const CollectionCard = ({ collection, t }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gray-50">
        {collection?.image ? (
          <Image
            className="!w-full  object-cover !h-[unset] "
            src={collection?.image}
            width={250}
            height={140}
            alt="collection card"
          />
        ) : null}
      </div>
      <div className="absolute h-[85%] w-[80%] flex flex-col space-y-2 xl:space-y-8 top-[10%] left-[10%] ">
        <div className="flex gap-2 px-[2px] !mt-auto w-fit md:w-none justify-center md:justify-start md:gap-6 items-center bg-white  text-white rounded-3xl cursor-pointer ">
          <Link
            href={`/collections/${collection?.collection_id}`}
            className="transition-all duration-[600ms] cursor-pointer flex rtl:flex-row-reverse items-center  scale-[1] bg-[#FFFFFF] text-[#676767]  hover:scale-[1.1] w-fit py-[2px] rounded-3xl justify-between gap-3"
          >
            <span className="text-sm px-2 text-[10px] flex-1 text-center ">
              {t("SEE_MORE")}
            </span>
            <PrimaryArrowIcon arrowClassName="rtl:!-rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
};
