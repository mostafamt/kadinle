import React from "react";

export const SectionTitle = ({
  title,
  containerClassName = "",
  titleClassName = "",
}) => {
  return (
    // <div
    //   className={`flex items-center justify-center w-full flex-col gap-1 mt-5 mb-3 ${containerClassName}`}
    // >
    //   <h2
    //     className={`text-lg font-medium capitalize ${titleClassName} relative text-sec`}
    //   >
    //     {title}
    //     <span className="absolute -bottom-1 ltr:left-0 rtl:right-0 bg-primary w-[55px] h-[5px] rounded-xl" />
    //   </h2>
    // </div>
    <div className="flex flex-col space-y-1 justify-center md:justify-start">
      <p className="text-xl md:text-2xl font-medium">{title}</p>
      <div className="bg-primary w-[80px] h-[8px] rounded-xl "></div>
    </div>
  );
};
