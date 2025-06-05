import { getBudgetColor, getGoalColor } from "../Utils/colors";

interface ProgressBarProps {
  percentage: number; // value from 0 to 100
  mode: "goal" | "budget";
}

const ProgressBar = ({ percentage, mode }: ProgressBarProps) => {
  const clampedPercentage=Math.min(Math.max(percentage, 0), 100)
  const progressWidth = `${clampedPercentage}%`;
  const getColor = mode === "budget" ? getBudgetColor : getGoalColor;

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
