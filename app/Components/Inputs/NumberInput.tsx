import React from "react";

interface NumberInputProps {
  label: string;
  required?: boolean;
  value: number | "";
  onChange: (value: number | "") => void;
  minValue?: number;
  maxValue?: number;
}

const NumberInput = ({
  label,
  required = true,
  value,
  onChange,
  minValue,
  maxValue,
}: NumberInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type="number"
          placeholder="0"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val === "" ? "" : Number(val));
          }}
          min={minValue !== undefined ? minValue : undefined}
          max={maxValue !== undefined ? maxValue : undefined}
          required={required}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium"
        />
      </div>
    </div>
  );
};

export default NumberInput;
