import React from "react";

const loading = () => {
  return (
    <div className="fixed bg-black w-screen h-screen top-0 left-0 z-[10000]">
      <div className="w-full h-screen flex items-center">
        <div className="w-[400px] h-[94vh] rounded-xl relative mx-auto items-end gap-2 bg-[#444]">
          <div className="relative rounded-xl h-full w-full z-10">

            <div className="absolute top-6 z-10 w-full left-0 px-4 flex justify-between items-center">
              <span className="animate-pulse h-6 w-6 rounded-full bg-[#fff3]" />
              <span className="animate-pulse h-6 w-6 rounded-full bg-[#fff3]" />
            </div>

            <div className="h-full w-full relative flex items-center animate-pulse bg-[#222]" />
            <div className="flex flex-col gap-2 max-w-[90%] text-gray-200 px-4 text-sm absolute rtl:right-0 ltr:left-0 bottom-8">
              <span className="h-5 w-32 rounded-md animate-pulse bg-[#fff3]" />

              <div className="flex gap-3 mb-6">
                <div className="h-16 w-12 cursor-pointer bg-[#fff3] animate-pulse" />
                <div className="h-16 w-12 cursor-pointer bg-[#fff3] animate-pulse" />
                <div className="h-16 w-12 cursor-pointer bg-[#fff3] animate-pulse" />
                <div className="h-16 w-12 cursor-pointer bg-[#fff3] animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-4 text-gray-200 px-4 text-sm absolute rtl:left-8 ltr:right-8 bottom-8">
              <span className="animate-pulse h-11 w-11 rounded-full bg-[#fff3]" />
              <span className="animate-pulse h-11 w-11 rounded-full bg-[#fff3]" />
              <span className="animate-pulse h-11 w-11 rounded-full bg-[#fff3]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
