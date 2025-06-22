"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import { useState } from "react";
import BudgetModal from "../Modal/BudgetModal";
import { createBudget } from "@/app/Utils/Actions.ts/budgets";
const BudgetHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <BudgetModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={async (budget) => {
            const result = await createBudget({
              currentAmount: budget.currentAmount!,
              budgetAmount: budget.budgetAmount!,
              financeCategory: budget.financeCategory!,
              period: budget.period!,
            });

            if (!result.success) {
              console.error("Failed to create budget:", result.error);
              // You can also show a toast or alert here
            }
          }}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Budgets</h1>
          <p className="text-gray-600 mt-1">
            Track your spending against your monthly budgets
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <GradientButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <AddOutlinedIcon />
            <p>Add Budget</p>
          </GradientButton>
        </div>
      </div>
    </>
  );
};

export default BudgetHeader;
