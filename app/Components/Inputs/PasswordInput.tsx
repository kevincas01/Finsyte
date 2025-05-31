"use client";

import { useState } from "react";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
}

const PasswordInput = ({
  label = "Password",
  placeholder = "Enter your password",
  value,
  onChange,
  name = "password",
  required = false,
}: PasswordInputProps) => {
  const [viewingPassword, setViewingPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setViewingPassword((prev) => !prev);
  };

  return (
    <div className="text-gray-800 w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primaryBlue">
        <HttpsOutlinedIcon className="text-gray-500 mr-2" />

        <input
          id={name}
          name={name}
          type={viewingPassword ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-2 text-gray-500 focus:outline-none cursor-pointer"
          aria-label={viewingPassword ? "Hide password" : "Show password"}
        >
          {viewingPassword ? (
            <VisibilityOffOutlinedIcon />
          ) : (
            <VisibilityOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
