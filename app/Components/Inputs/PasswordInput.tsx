"use client";

import { useState } from "react";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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

      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <HttpsOutlinedIcon fontSize="small" />
        </span>

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
          aria-label={viewingPassword ? "Hide password" : "Show password"}
        >
          {viewingPassword ? (
            <VisibilityOffOutlinedIcon fontSize="small" />
          ) : (
            <VisibilityOutlinedIcon fontSize="small" />
          )}
        </button>

        <input
          id={name}
          name={name}
          type={viewingPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg py-2 pr-10 pl-10 bg-white outline-none focus:ring-2 focus:ring-primaryBlue text-gray-800 font-medium"
          value={value}
          minLength={6}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
