"use client";
import React, { ReactNode } from "react";

interface NeutralButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: "gray" | "white";
}

const NeutralButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  variant = "white",
}: NeutralButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cursor-pointer text-center  rounded-md font-medium px-4 py-2 transition duration-200 ease-in-out 
      flex gap-2 flex-1 justify-center items-center 
      ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} 

      ${variant === "white" ? "bg-white hover:bg-gray-100 text-black  border border-gray-200" : "bg-gray-100 hover:bg-gray-200 text-black "}
      ${className}`}
      aria-busy={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default NeutralButton;
