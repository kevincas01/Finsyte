"use client";
type Option = {
  label: string;
  value: string | number;
};

type DropdownInputProps = {
  options: Option[];
  placeholder?: string;
  value?: string | number;
  onChange: (option: string | number) => void;
  label?: string;
  required?: boolean;
  showRequired?: boolean;
};

const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  label,
  required = false,
  showRequired = false,
}) => {
  return (
    <div className="flex flex-col flex-1">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && showRequired && "*"}
        </label>
      )}
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="flex border font-medium border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
