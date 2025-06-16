"use client";
import { useState } from "react";
import { GoalCategories } from "@/app/Constants/goals";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { Goal } from "@/app/Types/goals";

interface GoalsModalProps {
  onClose: () => void;
  onSubmit: (goal: Goal) => void;
  mode?: "create" | "edit";
  initialGoal?: Goal;
}

const GoalsModal = ({
  onClose,
  onSubmit,
  mode = "create",
  initialGoal,
}: GoalsModalProps) => {
  const [title, setTitle] = useState(initialGoal?.title || "");
  const [description, setDescription] = useState(
    initialGoal?.description || ""
  );
  const [category, setCategory] = useState(initialGoal?.category || "");
  const [targetAmountInput, setTargetAmount] = useState<string>(
    String(initialGoal?.targetAmount) || ""
  );
  const [currentAmountInput, setCurrentAmount] = useState<string>(
    String(initialGoal?.currentAmount) || ""
  );

  const categoryOptions = GoalCategories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <ModalContainer
      title={mode === "edit" ? "Edit Goal" : "Create New Goal"}
      onClose={onClose}
      isOpen={true}
    >
      <TextInput
        label="Goal Title *"
        placeholder="e.g. Emergency Fund"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <TextInput
        label="Description"
        placeholder="e.g. 6 months of expenses"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <DropdownInput
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(value) => setCategory(value as string)}
      />
      <NumberInput
        label="Target Amount *"
        value={targetAmountInput}
        onChange={(value) => setTargetAmount(value)}
        minValue={0}
      />
      <NumberInput
        label="Current Amount"
        required={false}
        value={currentAmountInput}
        onChange={(value) => setCurrentAmount(value)}
        minValue={0}
      />
      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            const parsedTargetAmount = Math.max(
              0,
              parseFloat(targetAmountInput) || 0
            );
            const parsedCurrentAmount = Math.max(
              0,
              parseFloat(currentAmountInput) || 0
            );

            const updatedGoal = {
              title,
              description,
              category,
              targetAmount: parsedTargetAmount,
              currentAmount: parsedCurrentAmount,
              targetDate:
                initialGoal?.targetDate ??
                new Date().toISOString().slice(0, 10), // fallback
            };
            onSubmit(updatedGoal);
            onClose();
          }}
        >
          {mode === "edit" ? "Save Changes" : "Create Goal"}
        </GradientButton>

        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default GoalsModal;
