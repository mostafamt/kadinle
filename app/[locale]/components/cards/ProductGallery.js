import React from "react";

export const ProductGallery = () => {
  return (
    <>
      {/* <figure className="h-full w-full bg-black hover:absolute hover:top-0 hover:left-0 duration-200"></figure> */}
      <div className="h-44 duration-200 rounded bg-gray-100 relative">
        <div className="flex gap-1 absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="bg-gray-200 h-2 w-4 rounded-xl" />
          <span className="bg-gray-200 h-2 w-4 rounded-xl" />
          <span className="bg-gray-200 h-2 w-4 rounded-xl" />
        </div>
      </div>
    </>
  );
};
