import CategoryBannerSkeleton from "@/app/[locale]/components/skeletons/CategoryBannerSkeleton";
import ProductCardSkeleton from "@/app/[locale]/components/skeletons/ProductCardSkeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-2  mx-auto container">
      <CategoryBannerSkeleton />
      <div className="grid grid-cols-2 gap-4">
        {Array(8)
          .fill(0)
          ?.map((r, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default loading;
