"use client";
import React from "react";
export const ViewAs = ({ setFormat, format }) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setFormat(1)}
        className={`flex items-center justify-center ${
          format === 1 ? "bg-primary" : "bg-white border border-primary"
        } rounded h-7 w-7`}
      >
        <span
          className={`${
            format === 1 ? "bg-white" : "bg-primary"
          } w-5 h-5 rounded-sm`}
        ></span>
      </button>
      <button
        onClick={() => setFormat(2)}
        className={`${
          format === 2 ? "bg-primary" : "bg-white border border-primary"
        } flex rounded justify-center items-center w-7 h-7`}
      >
        <i
          className={`inline-block gg-layout-grid ${
            format === 2 ? "text-white" : "text-primary"
          }`}
        />
      </button>
    </div>
  );
};
