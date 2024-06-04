"use client";
import { useMemo } from "react";
import { StarIcon } from "../Icons/StarIcon";
import { UserImage } from "../global/UserImage";
export const ReviewCard = ({ review }) => {
  const { first_name, last_name } = review?.user || {
    first_name: "",
    last_name: "",
  };

  const hashName = useMemo(() => {
    if (!review?.user?.hash_name)
      return `${first_name} ${last_name ? last_name : ""}`;
    let name =
      first_name?.[0] + first_name.substring(1).replace(/[a-zA-Z]/g, "*");
    name += last_name?.[0]
      ? last_name?.[0] + last_name.substring(1).replace(/[a-zA-Z]/g, "*")
      : "";
    return name;
  }, [first_name, last_name]);

  return (
    <div className="flex justify-center w-full min-w-full  transition-all duration-[1000ms] ">
      <div
        className={`transition-all space-y-2 duration-[1000ms] w-full  relative flex flex-col border-2 border-dotted bg-white px-3  rounded-xl border-primary items-center`}
      >
        <div
          className={`absolute transition-all duration-[1000ms] rounded-full -top-[35px] w-[70px] h-[70px] border-[#FFE5F4] ${
            review?.user?.profile_img ? "border-[7px]" : "border-[4px]"
          }`}
        >
          <UserImage
            first_name={review?.user?.first_name}
            imageClassName="w-full h-full object-cover !max-w-none rounded-full"
            imageSrc={review?.user?.profile_img}
            alt="product avatar"
          />
        </div>
        <div
          className={`flex flex-col items-center transition-all duration-[1000ms] space-y-[5px] pt-[30px]`}
        >
          <p
            className={`text-primary transition-all duration-[1000ms] text-[10px]`}
          >
            {hashName}
          </p>
          <div className="flex gap-1">
            {Array(review?.rating)?.map((r, index) => (
              <StarIcon className="w-5 h-5 text-primary" key={index} />
            ))}
          </div>
        </div>
        <div>
          <p
            className={`text-center mb-6 leading-[25px] md:leading-8 font-[500] text-[9px]`}
          >
            {review?.content?.substring(0, 120)}
          </p>
        </div>
      </div>
    </div>
  );
};
