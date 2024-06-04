import Image from "next/image";
import Link from "next/link";

import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";

export const CollectionCard = ({ collection, t }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gray-50">
        {collection?.image ? (
          <Image
            className="!w-full max-w-[500px] object-cover !h-[unset] "
            src={collection?.image}
            width={250}
            height={140}
          />
        ) : null}
      </div>
      <Link
        href={`/category/collections/${collection?.collection_id}`}
        className="absolute bottom-4 ltr:left-4 rtl:right-4 transition-all duration-300 w-fit text-primary px-1 cursor-pointer flex rtl:flex-row-reverse items-center  scale-[1] bg-[#FFFFFF] hover:scale-[1.1]  py-[2px] rounded-3xl justify-between gap-2"
      >
        <span className="text-sm  text-[10px] flex-1 text-center px-2">
          {t("SEE_MORE")}
        </span>
        <PrimaryArrowIcon
          containerClassName="!h-8 !w-8"
          arrowClassName="!h-5 !w-5"
        />
      </Link>
    </div>
  );
};
