import Image from "next/image";
import CategoryCardSkeleton from "../skeletons/CategoryCardSkeleton";
import Link from "next/link";

export const CategoriesBodyFull = ({ categories, languageId }) => {
  return (
    <div className="flex flex-col items-center pb-16">
      <Image
        className="mainImage max-h-[500px] object-[15%] object-cover w-full min-h-[300px] h-auto"
        src={"https://kadinle.com/media/static/general_1920_1080.jpg" || ''}
        alt="banner"
        height={300}
        width={1500}
      />
      <div className="flex w-full justify-between container">
        <div className="w-full gap-4 mt-[40px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!categories ? (
            <>
              {Array(7)
                .fill()
                .map((_, idx) => (
                  <CategoryCardSkeleton key={idx} />
                ))}
            </>
          ) : (
            <>
              {categories?.map((category) => {
                let content = category?.content?.find(
                  (category) => category?.language_id === languageId
                );
                if (!category?.content?.length) return null;
                return (
                  <Link
                    key={category?.id}
                    href={`/categories/${category?.id}?parent_id=${category?.id}`}
                    className="p-1 border-opink border group hover:bg-primary duration-300 rounded-md flex flex-col items-center"
                  >
                    <Image
                      className="rounded-md bg-gray-100 w-full object-cover"
                      src={content?.web_image || ''}
                      alt={content?.title}
                      height={80}
                      width={200}
                    />
                    <h4 className="text-center group-hover:text-white text-opink">
                      {content?.title}
                    </h4>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
