"use client";
import { useState } from "react";
import { GoalCategories } from "@/app/Constants/goals";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { ClientGoal } from "@/app/Types/goals";
import DateInput from "../Inputs/DateInput";

interface GoalsModalProps {
  onClose: () => void;
  onSubmit: (goal: Partial<ClientGoal>) => void;
  mode?: "create" | "edit";
  initialGoal?: ClientGoal;
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
  const [targetAmountInput, setTargetAmount] = useState<string>(
    String(initialGoal?.targetAmount) || ""
  );
  const [currentAmountInput, setCurrentAmount] = useState<string>(
    String(initialGoal?.currentAmount) || ""
  );
  const [deadlineDate, setDeadlineDate] = useState(
    initialGoal?.deadlineDate || ""
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
        label="Goal Title"
        placeholder="e.g. Emergency Fund"
        value={title}
        onChange={(value) => setTitle(value)}
        required={true}
        showRequired={true}
      />
      <TextInput
        label="Description"
        placeholder="e.g. 6 months of expenses"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <NumberInput
        label="Target Amount"
        value={targetAmountInput}
        onChange={(value) => setTargetAmount(value)}
        minValue={0}
        required={true}
        showRequired={true}
        placeHolder="0"
      />
      <NumberInput
        label="Current Amount"
        required={false}
        value={currentAmountInput}
        onChange={(value) => setCurrentAmount(value)}
        minValue={0}
        placeHolder="0"
      />
      <DateInput
        label="Deadline"
        value={deadlineDate}
        onChange={(value) => setDeadlineDate(value)}
        required={true}
        showRequired={true}
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
              targetAmount: parsedTargetAmount,
              currentAmount: parsedCurrentAmount,
              deadlineDate:
                initialGoal?.deadlineDate ??
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
