"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { BudgetPeriods } from "@/app/Constants/budgets";
import { TransactionCategories } from "@/app/Constants/transactions";

interface BudgetModalProps {
  onClose: () => void;
}
const BudgetModal = ({ onClose }: BudgetModalProps) => {
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState("");
  const [budgetAmount, setBudgetAmount] = useState<number | "">("");

  const categoryOptions = TransactionCategories.map((category) => ({
    label: category,
    value: category,
  }));
  const periodOptions = BudgetPeriods.map((period) => ({
    label: period,
    value: period,
  }));

  return (
    <ModalContainer title="Create New Budget" onClose={onClose} isOpen={true}>
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
        onChange={(value) => setPeriod(value as string)}
      />
      <NumberInput
        label="Budget Amount *"
        value={budgetAmount}
        onChange={(value) => setBudgetAmount(value)}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            // Handle form submission here
            console.log({
              category,
              budgetAmount,
            });
          }}
        >
          Create Budget
        </GradientButton>
        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default BudgetModal;
