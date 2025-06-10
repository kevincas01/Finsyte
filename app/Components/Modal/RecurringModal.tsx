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
import { RecurringFrequencies } from "@/app/Constants/recurring";
import { Recurring, RecurringFrequencyCategory } from "@/app/Types/recurring";
import { TransactionCategories } from "@/app/Constants/transactions";

interface RecurringModalProps {
  onClose: () => void;
  onSubmit: (recurring: Recurring) => void;
  mode?: "create" | "edit";
  initialRecurring?: Recurring;
}

const RecurringModal = ({
  onClose,
  onSubmit,
  mode = "create",
  initialRecurring,
}: RecurringModalProps) => {
  const [name, setName] = useState(initialRecurring?.name || "");
  const [frequency, setFrequency] = useState(
    initialRecurring?.frequency || "Monthly"
  );

  const [category, setCategory] = useState(initialRecurring?.category || "");
  const [amount, setAmount] = useState<number | "">(
    initialRecurring?.amount ?? ""
  );

  const categoryOptions = TransactionCategories.map((category) => ({
    label: category,
    value: category,
  }));
  const frequencyOptions = RecurringFrequencies.map((frequency) => ({
    label: frequency,
    value: frequency,
  }));

  return (
    <ModalContainer
      title={
        mode === "edit"
          ? "Edit Recurring Payment"
          : "Create New Recurring Payment"
      }
      onClose={onClose}
      isOpen={true}
    >
      <TextInput
        label="Name *"
        placeholder="e.g. Rent"
        value={name}
        onChange={(value) => setName(value)}
      />
      <NumberInput
        label="Current Amount"
        required={false}
        value={amount}
        onChange={(value) => setAmount(value)}
        minValue={0}
      />
      <DropdownInput
        label="Budget Period"
        options={frequencyOptions}
        value={frequency}
        onChange={(value) => setFrequency(value as RecurringFrequencyCategory)}
      />
      <DropdownInput
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(value) => setCategory(value as string)}
      />
      <DropdownInput
        label="Category"
        options={frequencyOptions}
        value={frequency}
        onChange={(value) => setFrequency(value as RecurringFrequencyCategory)}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            const recurringPayment = {
              name,
              frequency,
              category,
              amount: Number(amount),
            };
            onSubmit(recurringPayment);
            onClose();
          }}
        >
          {mode === "edit" ? "Save Changes" : "Create Recurring Payment"}
        </GradientButton>

        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default RecurringModal;
