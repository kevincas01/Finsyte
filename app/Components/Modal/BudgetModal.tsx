"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { BudgetPeriods } from "@/app/Constants/budgets";
import { TransactionCategories } from "@/app/Constants/transactions";
import { Budget, BudgetPeriodCategory } from "@/app/Types/budget";

interface BudgetModalProps {
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
  mode?: "create" | "edit";
  initialBudget?: Budget;
}
const BudgetModal = ({
  onClose,
  onSubmit,
  mode = "create",
  initialBudget,
}: BudgetModalProps) => {
  const [category, setCategory] = useState(initialBudget?.category || "");
  const [period, setPeriod] = useState(initialBudget?.period || "Monthly");
  const [budgetAmount, setBudgetAmount] = useState<number | "">(
    initialBudget?.budgetAmount || ""
  );
  const [currentAmount, setCurentAmount] = useState<number | "">(
    initialBudget?.currentAmount || ""
  );

  const categoryOptions = TransactionCategories.map((category) => ({
    label: category,
    value: category,
  }));
  const periodOptions = BudgetPeriods.map((period) => ({
    label: period,
    value: period,
  }));

  return (
    <ModalContainer
      title={mode === "edit" ? "Edit Budget" : "Create New Budget"}
      onClose={onClose}
      isOpen={true}
    >
      <DropdownInput
        label="Category *"
        options={categoryOptions}
        value={category}
        onChange={(value) => setCategory(value as string)}
      />
      <DropdownInput
        label="Budget Period"
        options={periodOptions}
        value={period}
        onChange={(value) => setPeriod(value as BudgetPeriodCategory)}
      />
      <NumberInput
        label="Budget Amount *"
        value={budgetAmount}
        onChange={(value) => setBudgetAmount(value)}
        minValue={0}
      />
      <NumberInput
        label="Current Amount"
        value={currentAmount}
        onChange={(value) => setCurentAmount(value)}
        minValue={0}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            const budget = {
              category,
              period,
              budgetAmount: Number(budgetAmount),
              currentAmount: Number(currentAmount),
            };
            onSubmit(budget);
            onClose();
          }}
        >
          {mode === "edit" ? "Save Changes" : "Create Budget"}
        </GradientButton>
        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default BudgetModal;
