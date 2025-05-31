"use client"
import React from "react";
import clsx from "clsx";

interface GradientButtonProps {
  text: string;
  onClickFunction: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const GradientButton = ({
  text,
  onClickFunction,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}: GradientButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClickFunction}
      disabled={disabled || loading}
      className={clsx(
        "cursor-pointer text-center text-white rounded-md text-lg font-semibold py-1  transition duration-200 ease-in-out ",
        "bg-gradient-to-r from-primaryBlue to-primaryGreen hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      aria-busy={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default GradientButton;
