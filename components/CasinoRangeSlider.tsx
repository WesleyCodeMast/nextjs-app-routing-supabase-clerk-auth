"use client";
import React from "react";

interface props {
  defaultValue: number;
  _onChange: (val: number) => void;
}

const CasinoRangeSlider: React.FC<props> = ({ defaultValue, _onChange }) => {
  const _onInput = (e: any) => {
    e.preventDefault();
    _onChange(e.target.value);
  };
  return (
    <div className="flex w-1/3">
      <div className="relative min-w-full">
        <div className="text-current">
          <input
            onInput={_onInput}
            value={defaultValue}
            className="transparent h-[4px] w-full cursor-pointer
                border-transparent bg-neutral-200 dark:bg-neutral-600"
            list="tickmarks"
            step="100"
            min="100"
            max="1000"
            type="range"
            id="customRange3"
          />
          <datalist id="tickmarks">
            <option value="100"></option>
            <option value="200"></option>
            <option value="300"></option>
            <option value="400"></option>
            <option value="500"></option>
            <option value="600"></option>
            <option value="700"></option>
            <option value="800"></option>
            <option value="900"></option>
            <option value="1000"></option>
          </datalist>
          <div className="absolute -ml-1 top-6 left-0 -mb-6">100</div>
          <div className="absolute -mr-1 top-6 right-0 -mb-6">1000</div>
        </div>
      </div>
    </div>
  );
};

export default CasinoRangeSlider;
