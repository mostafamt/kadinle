import { useTranslations } from "next-intl";

const HomeSliderSkeleton = () => {
  const t = useTranslations();
  return (
    <div className=" flex flex-col items-center justify-center relative pb-[64px] order-[9] max-w-[350px] mx-auto">
      <div className="flex mb-[40px] lg:mb-[5%] lg:mt-4 gap-6 ">
        <div className="animate-pulse rounded-full p-3 px-7 text-[12px] text-center min-w-[150px] bg-white text-black drop-shadow-md">
          {t("loading")}
        </div>
        <div className="animate-pulse rounded-full p-3 px-7 text-[12px] text-center min-w-[150px] bg-white text-black drop-shadow-md">
          {t("loading")}
        </div>
        <div className="animate-pulse rounded-full p-3 px-7 text-[12px] text-center min-w-[150px] bg-white text-black drop-shadow-md">
          {t("loading")}
        </div>
      </div>

      <div className="w-[80%] flex relative overflow-y-visible overflow-x-clip">
        <div className="w-full flex direction-ltr">
          {Array(3)
            .fill()
            .map((_, idx) => (
              <div
                key={idx}
                className={` h-[250px] min-w-[[33.333%]] relative ${
                  idx === 1 && "z-50"
                } `}
              >
                <div
                  className={`w-full h-full bg-gray-200 animate-pulse ${
                    idx === 1 &&
                    "scale-[1.2] border rounded-[7px] border-primary "
                  }`}
                />
                {idx === 1 && (
                  <div className="w-full absolute -bottom-4 left-0 flex flex-col gap-2">
                    <div className="h-6 w-4/5 rounded bg-gray-300 animate-pulse"></div>
                    <div className="h-4 w-[100px] rounded bg-gray-300 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-[40px] lg:mt-[4%] animate-pulse">
        {Array(5)
          .fill()
          ?.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index === 0
                    ? "h-3 w-[40px] bg-gray-200 rounded-xl cursor-pointer"
                    : "h-3 w-3 bg-gray-200 rounded-xl cursor-pointer"
                }
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default HomeSliderSkeleton;
