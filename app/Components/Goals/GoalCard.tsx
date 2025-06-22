"use client";
import { formatCurrency, formatDate } from "@/app/Utils/format";
import ProgressBar from "../ProgressBar";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NeutralButton from "../Buttons/NeutralButton";
import BlueButton from "../Buttons/BlueButton";

import { useState } from "react";
import GoalsModal from "../Modal/GoalsModal";
import { ClientGoal } from "@/app/Types/goals";
import { updateGoal } from "@/app/Utils/Actions.ts/goals";

interface GoalCardProps {
  goal: ClientGoal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { title, description, currentAmount, targetAmount } = goal;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const remainingAmount = Math.max(targetAmount - currentAmount, 0);
  const progress =
    targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  return (
    <div className="p-5 bg-white rounded-md border border-gray-200 flex flex-col gap-2">
      {isModalOpen && (
        <GoalsModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (updatedGoal) => {
            const result = await updateGoal({
              id: updatedGoal.id,
              currentAmount: updatedGoal.currentAmount!,
              targetAmount: updatedGoal.targetAmount!,
              title: updatedGoal.title!,
              description: updatedGoal.description!,
              deadlineDate: updatedGoal.deadlineDate!,
            });

            if (!result.success) {
              console.error("Failed to update budget:", result.error);
            }
          }}
          mode="edit"
          initialGoal={goal}
        />
      )}
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
        <ProgressBar percentage={progress} mode="goal" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <CalendarMonthOutlinedIcon fontSize="inherit" />
          <p>Deadline</p>
          <p>{formatDate(goal.deadlineDate)}</p>
        </span>
      </div>
      <div className="flex flex-row gap-5">
        <NeutralButton onClick={() => {}}>Add Money</NeutralButton>
        <BlueButton onClick={() => setIsModalOpen(true)}>Edit Goal</BlueButton>
      </div>
    </div>
  );
};

export default GoalCard;
