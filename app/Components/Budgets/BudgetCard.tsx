"use client";
import { formatCurrency } from "@/app/Utils/format";
import ProgressBar from "../ProgressBar";
import NeutralButton from "../Buttons/NeutralButton";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
interface Budget {
  title: string;
  currentAmount: number;
  budgetAmount: number;
}

interface BudgetCardProps {
  budget: Budget;
}

const getBudgetStatus = (percentage: number) => {
  if (percentage < 80) {
    return (
      <div className="flex text-sm items-center gap-1 text-green-600">
        <TaskAltOutlinedIcon fontSize="inherit" />
        <p>On Track</p>
      </div>
    );
  } else if (percentage >= 80 && percentage <= 100) {
    return (
      <div className="flex text-sm items-center gap-1 text-yellow-600">
        <ReportProblemOutlinedIcon fontSize="inherit" />
        <p>Near Limit</p>
      </div>
    );
  } else {
    return (
      <div className="flex text-sm items-center gap-1 text-red-600">
        <ReportProblemOutlinedIcon fontSize="inherit" />
        <p>Over Budget</p>
      </div>
    );
  }
};

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const { title, currentAmount, budgetAmount } = budget;

  const remainingAmount = Math.max(budgetAmount - currentAmount, 0);
  const progress =
    budgetAmount > 0 ? (currentAmount / budgetAmount) * 100 : 0;

  return (
    <div className="p-5 bg-white rounded-md border border-gray-200 flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="font-semibold">{title}</p>
        {getBudgetStatus(progress)}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Spent</p>
        <p className="font-semibold text-base">
          {formatCurrency(currentAmount)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Budget</p>
        <p className="font-semibold text-base">
          {formatCurrency(budgetAmount)}
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
        <ProgressBar percentage={progress} mode="budget" />
      </div>

      <div className="flex flex-row gap-5">
        <NeutralButton onClick={() => {}}>Edit Money</NeutralButton>
      </div>
    </div>
  );
};

export default BudgetCard;
