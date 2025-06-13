"use client";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  icon?: "email" | "lock" | "person" | "search";
  required?: boolean;
  onChange: (value: string) => void;
}

const iconMap = {
  email: EmailOutlinedIcon,
  lock: LockOutlinedIcon,
  person: PersonOutlineIcon,
  search: SearchOutlinedIcon,
};

const TextInput = ({
  label,
  placeholder,
  value,
  icon,
  required = true,
  onChange,
}: TextInputProps) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {IconComponent && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <IconComponent fontSize="small" />
          </span>
        )}
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border border-gray-300 rounded-lg py-2 pr-3 ${
            IconComponent ? "pl-10" : "pl-3"
          } bg-white outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium`}
        />
      </div>
    </div>
  );
};

export default TextInput;
