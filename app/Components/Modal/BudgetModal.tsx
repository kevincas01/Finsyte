"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { BudgetPeriods } from "@/app/Constants/budgets";
import { TransactionCategories } from "@/app/Constants/transactions";
import { ClientBudget, BudgetPeriodCategory } from "@/app/Types/budget";

interface BudgetModalProps {
  onClose: () => void;
  onSubmit: (budget: Partial<ClientBudget>) => void;
  mode?: "create" | "edit";
  initialBudget?: ClientBudget;
}
const BudgetModal = ({
  onClose,
  onSubmit,
  mode = "create",
  initialBudget,
}: BudgetModalProps) => {
  const [category, setCategory] = useState(initialBudget?.financeCategory || "");
  const [period, setPeriod] = useState(initialBudget?.period || "Monthly");
  const [budgetAmountInput, setBudgetAmountInput] = useState<string>(
    String(initialBudget?.budgetAmount) || ""
  );
  const [currentAmountInput, setCurentAmountInput] = useState<string>(
    String(initialBudget?.currentAmount) || ""
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
      <NumberInput
        label="Budget Amount"
        value={budgetAmountInput}
        onChange={(value) => setBudgetAmountInput(value)}
        minValue={0}
        placeHolder="0.00"
        required={true}
        showRequired={true}
      />
      <NumberInput
        label="Current Amount"
        value={currentAmountInput}
        onChange={(value) => setCurentAmountInput(value)}
        minValue={0}
        placeHolder="0.00"
      />
      <DropdownInput
        label="Budget Period"
        options={periodOptions}
        value={period}
        onChange={(value) => setPeriod(value as BudgetPeriodCategory)}
        required={true}
        showRequired={true}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            const parsedBudgetAmount = Math.max(
              0,
              parseFloat(budgetAmountInput) || 0
            );
            const parsedCurrentAmount = Math.max(
              0,
              parseFloat(currentAmountInput) || 0
            );

            const budget = {
              id:initialBudget?.id,
              financeCategory:category,
              period,
              budgetAmount: parsedBudgetAmount,
              currentAmount: parsedCurrentAmount,
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
