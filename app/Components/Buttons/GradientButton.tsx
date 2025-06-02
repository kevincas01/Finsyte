"use client";
import React, { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
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
      className={`cursor-pointer text-center text-white rounded-md text-lg font-medium py-1 transition duration-200 ease-in-out 
      bg-gradient-to-r from-primaryBlue to-primaryGreen hover:opacity-80 
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} 
      ${className}`}
      aria-busy={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default GradientButton;
