"use client";
import { formatCurrency, formatDate } from "@/app/Utils/format";
import ProgressBar from "../ProgressBar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NeutralButton from "../Buttons/NeutralButton";
import BlueButton from "../Buttons/BlueButton";
interface Goal {
  title: string;
  description?: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string; // formatted as 'YYYY-MM-DD'
}

interface GoalCardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { title, description, currentAmount, targetAmount } = goal;

  const remainingAmount = Math.max(targetAmount - currentAmount, 0);
  const progress =
    targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="p-5 bg-white rounded-md border border-gray-200 flex flex-col gap-2">
      <p className="font-semibold">{title}</p>
      {description && <p className="text-sm">{description}</p>}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Current</p>
        <p className="font-semibold text-base">
          {formatCurrency(currentAmount)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Target</p>
        <p className="font-semibold text-base">
          {formatCurrency(targetAmount)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Remaining</p>
        <p className="font-semibold text-base">
          {formatCurrency(remainingAmount)}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-gray-600">Progress</p>
          <p className="font-semibold text-base">{progress.toFixed(0)}%</p>
        </div>
        <ProgressBar percentage={progress} />
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <CalendarMonthOutlinedIcon fontSize="inherit" />
          <p>Deadline</p>
          <p>{formatDate(goal.targetDate)}</p>
        </span>
      </div>
      <div className="flex flex-row gap-5">
        <NeutralButton onClick={() => {}}>Add Money</NeutralButton>
        <BlueButton onClick={() => {}}>Edit Goal</BlueButton>
      </div>
    </div>
  );
};

export default GoalCard;
