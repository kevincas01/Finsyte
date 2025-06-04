"use client";
import React, { ReactNode } from "react";

interface BlueButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const BlueButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}: BlueButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cursor-pointer text-center text-primaryBlue rounded-md font-medium px-4 py-2 transition duration-200 ease-in-out 
      bg-primaryBlue/20 border border-gray-200 hover:bg-primaryBlue/30  flex gap-2 flex-1 justify-center
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} 
      ${className}`}
      aria-busy={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default BlueButton;
