"use client";
import React, { ReactNode } from "react";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const GradientButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}: GradientButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cursor-pointer text-center text-white rounded-md text-lg font-medium px-4 py-1 transition duration-200 ease-in-out 
      bg-gradient-to-r from-primaryBlue to-primaryGreen hover:opacity-80 flex gap-2 justify-center items-center
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} 
      ${className}`}
      aria-busy={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default GradientButton;
