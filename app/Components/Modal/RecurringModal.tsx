"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import NumberInput from "../Inputs/NumberInput";
import { RecurringFrequencies } from "@/app/Constants/recurring";
import {
  ClientRecurringTransaction,
  RecurringFrequencyCategory,
} from "@/app/Types/recurring";
import { TransactionCategories } from "@/app/Constants/transactions";
import DateInput from "../Inputs/DateInput";
import { TransactionCategory } from "@/app/Types/transactions";

interface RecurringModalProps {
  onClose: () => void;
  onSubmit: (recurring: Partial<ClientRecurringTransaction>) => void;
  mode?: "create" | "edit";
  initialRecurring?: ClientRecurringTransaction;
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

  const [category, setCategory] = useState(
    initialRecurring?.category || "Miscellaneous"
  );
  const [amountInput, setAmount] = useState<string>(
    String(initialRecurring?.amount) ?? ""
  );

  const [nextDate, setNextDate] = useState(initialRecurring?.next_date || "");

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
        label="Name"
        placeholder="e.g. Rent"
        value={name}
        onChange={(value) => setName(value)}
        required={true}
        showRequired={true}
      />
      <NumberInput
        label="Amount"
        value={amountInput}
        onChange={(value) => setAmount(value)}
        minValue={0}
        placeHolder="0.00"
        required={true}
        showRequired={true}
      />
      <DropdownInput
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(value) => setCategory(value as TransactionCategory)}
      />
      <DropdownInput
        label="Frequency"
        options={frequencyOptions}
        value={frequency}
        onChange={(value) => setFrequency(value as RecurringFrequencyCategory)}
      />
      <DateInput
        label="Start Date"
        value={nextDate}
        onChange={(value) => setNextDate(value)}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            const parsedAmount = Math.max(0, parseFloat(amountInput) || 0);
            const recurringPayment = {
              name,
              frequency,
              category,
              amount: parsedAmount,
              nextDate,
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
