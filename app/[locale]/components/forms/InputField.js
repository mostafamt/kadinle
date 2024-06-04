"use client";
import React from "react";

export const InputField = ({
  containerClassesName,
  labelClassName,
  label,
  fieldClassName,
  iconEnd,
  long,
  ...fieldProps
}) => {
  return (
    <div className={`flex flex-col gap-1 ${containerClassesName}`}>
      {label ? (
        <label className={`text-gray-500 ${labelClassName}`}>{label}</label>
      ) : null}
      {long ? (
        <textarea
          className={`border p-2 border-gray-300 rounded-md bg-white outline-primary ${fieldClassName}`}
          {...fieldProps}
        />
      ) : (
        <div className="w-full relative">
          <input
            className={`border w-full p-2 border-gray-300 rounded-md bg-white outline-primary ${fieldClassName}`}
            {...fieldProps}
          />
          {iconEnd ? iconEnd : null}
        </div>
      )}
    </div>
  );
};
