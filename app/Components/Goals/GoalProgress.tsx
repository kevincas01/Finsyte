import { formatCurrency, formatDateToMMDDYYYY } from "@/app/Utils/format";
import React from "react";
import ProgressBar from "../ProgressBar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { ClientGoal } from "@/app/Types/goals";
import { ClientTransaction } from "@/app/Types/transactions";
import TransactionsList from "../TransactionsList";
interface GoalProgressProps {
  goal: ClientGoal;
  transactions: ClientTransaction[];
}

const GoalProgress = ({ goal, transactions }: GoalProgressProps) => {
  const remaining = goal.targetAmount - goal.currentAmount;
  const percentage = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100)
  );

  return (
    <div className="overflow-auto bg-white rounded-md p-5 border border-gray-200 flex flex-col gap-3 h-full flex-1">
      <p className="font-semibold">{goal.title}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Current</p>
        <p className="font-semibold text-base">
          {formatCurrency(goal.currentAmount)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Target</p>
        <p className="font-semibold text-base">
          {formatCurrency(goal.targetAmount)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Remaining</p>
        <p className="font-semibold text-base">{formatCurrency(remaining)}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-gray-600">Progress</p>
          <p className="font-semibold text-base">{percentage}%</p>
        </div>
        <ProgressBar percentage={percentage} mode="goal" />
      </div>

      <p className="font-semibold">Recent Activity</p>

      <div className="overflow-auto flex flex-col gap-2 box-border flex-1">
        {transactions.length > 0 ? (
          <TransactionsList transactions={transactions}/>
        ) : (
          <p className="text-sm text-gray-400 italic">No recent transactions</p>
        )}
      </div>

      <div className="flex justify-center items-center mb-1 text-center">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <CalendarMonthOutlinedIcon fontSize="inherit" />
          <p>Deadline</p>
          <p>{formatDateToMMDDYYYY(goal.deadlineDate)}</p>
        </span>
      </div>
    </div>
  );
};

export default GoalProgress;
