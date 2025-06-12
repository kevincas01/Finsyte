import React from "react";

interface DateInputProps {
  label: string;
  required?: boolean;
  value: string; 
  onChange: (value: string) => void;
  minDate?: string; 
  maxDate?: string;
}

const DateInput = ({
  label,
  required = true,
  value,
  onChange,
  minDate,
  maxDate,
}: DateInputProps) => {
    console.log(value)
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate}
          max={maxDate}
          required={required}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium"
        />
      </div>
    </div>
  );
};

export default DateInput;
