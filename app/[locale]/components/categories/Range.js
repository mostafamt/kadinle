import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import React from "react";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";

const Range = ({ values, setPriceValues }) => {
  const { currency } = useGlobalOptions();
  const [value1, setValue1] = React.useState(values);
  const handleChange1 = (newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setValue1(newValue);
    setPriceValues(value1);
  };

  return (
    <div className="flex flex-col -mt-[10px] ">
      <div className="">
        <RangeSlider
          defaultValue={[20, 40]}
          value={value1}
          onInput={handleChange1}
          valueLabelDisplay="auto"
          disableSwap
          min={values?.[0]}
          max={values?.[1]}
          className="price-range"
        />
      </div>

      <div className="flex justify-between -mt-2  text-[14px]">
        <div className="w-[68px] h-[22px] bg-[#E3E5E8] flex items-center justify-center">
          <p className="text-[10px] text-[#727C8E]">
            {value1?.[0]} {currency?.["alph-3"]}
          </p>
        </div>

        <div className="w-[68px] h-[22px] bg-[#E3E5E8] flex items-center justify-center">
          <p className="text-[10px] text-[#727C8E]">
            {value1?.[1]} {currency?.["alph-3"]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Range;
