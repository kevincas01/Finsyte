"use client";
import BudgetCard from "@/app/Components/Budgets/BudgetCard";
import BudgetOverview from "@/app/Components/Budgets/BudgetOverview";
import { BudgetPeriods} from "@/app/Constants/budgets";
import {BudgetPeriodCategory, ClientBudget } from "@/app/Types/budget";
import { useState } from "react";

interface BudgetPeriodDisplayProps {
  budgets: ClientBudget[];
}
const BudgetPeriodDisplay = ({ budgets }: BudgetPeriodDisplayProps) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<BudgetPeriodCategory>("Monthly");
  const filteredBudgets = budgets.filter(
    (budget) => budget.period === selectedPeriod
  );
  const totalBudgetAmount = filteredBudgets.reduce(
    (totalAmount, budget) => totalAmount + budget.budgetAmount,
    0
  );

  const totalSavedAmount = filteredBudgets.reduce(
    (totalAmount, budget) => totalAmount + budget.currentAmount,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between bg-white border border-gray-200 rounded-md p-5 items-center">
        <p className="font-semibold">Budget Period</p>
        <div className="flex flex-row gap-2">
          {BudgetPeriods.map((period) => (
            <button
              key={period}
              className={`py-1 px-2 cursor-pointer text-base rounded-md font-medium ${
                selectedPeriod === period
                  ? "text-white bg-gradient-to-r from-primaryBlue to bg-primaryGreen"
                  : "bg-white text-black border border-gray-200"
              }`}
              onClick={() => {
                setSelectedPeriod(period);
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <BudgetOverview
        budgetPeriod={selectedPeriod}
        totalBudgetAmount={totalBudgetAmount}
        totalSavedAmount={totalSavedAmount}
      />
      <div className="grid grid-cols-2 gap-5">
        {filteredBudgets.map((budget, index) => (
          <BudgetCard key={index} budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetPeriodDisplay;
