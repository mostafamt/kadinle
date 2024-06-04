import React from "react";

export const AdsTapeBar = ({ containerClassName, title, icon }) => {
  return (
    <p
      className={`p-2 w-full text-xs rounded-md text-center flex items-center gap-4 ${containerClassName}`}
    >
      {icon}
      <span className="mx-auto">{title}</span>
    </p>
  );
};
