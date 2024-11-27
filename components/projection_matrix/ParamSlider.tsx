import React from "react";
// import slider
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the CSS for rc-slider

interface ParamSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number | number[]) => void;
  title: string;
}

export default function ParamSlider({
  value,
  min,
  max,
  onChange,
  title,
}: ParamSliderProps) {
  return (
    <div className="flex flex-row mt-2">
      <p className="mr-3">{title}</p>
      <Slider
        className={"mt-1"}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <p className="w-[3rem] ml-3">{Math.round(value)}</p>
    </div>
  );
}
