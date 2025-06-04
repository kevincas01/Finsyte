import React from "react";

interface ProgressBarProps {
  percentage: number; // value from 0 to 100
}

const getColor = (percentage: number): string => {
  if (percentage < 33) return "bg-red-500";
  if (percentage < 66) return "bg-yellow-500";
  return "bg-green-500";
};

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const progressWidth = `${Math.min(Math.max(percentage, 0), 100)}%`; // Clamp between 0–100
  const progressColor = getColor(percentage);

  return (
    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={`h-full ${progressColor} transition-all duration-300`}
        style={{ width: progressWidth }}
      />
    </div>
  );
};

export default ProgressBar;
