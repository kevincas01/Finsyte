"use client";
import { useState } from "react";
import { GoalCategories } from "@/app/Constants/goals";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";

interface GoalsModalProps {
  onClose: () => void;
}
const GoalsModal = ({ onClose }: GoalsModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [currentAmount, setCurrentAmount] = useState<number | "">("");

  const categoryOptions = GoalCategories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <ModalContainer title="Create New Goal" onClose={onClose} isOpen={true}>
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
        value={targetAmount}
        onChange={(value) => setTargetAmount(value)}
      />
      <NumberInput
        label="Current Amount"
        required={false}
        value={currentAmount}
        onChange={(value) => setCurrentAmount(value)}
      />
      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            // Handle form submission here
            console.log({
              title,
              description,
              category,
              targetAmount,
              currentAmount,
            });
          }}
        >
          Create Goal
        </GradientButton>
        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default GoalsModal;
