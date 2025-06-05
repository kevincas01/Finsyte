"use client";

import { useState } from "react";
import { TransactionCategories } from "@/app/Constants/transactions";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import NumberInput from "../Inputs/NumberInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";

interface TransactionsModalProps {
  onClose: () => void;
}

const TransactionsModal = ({ onClose }: TransactionsModalProps) => {
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");

  const categoryOptions = TransactionCategories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <ModalContainer
      title="Add new Transaction"
      onClose={onClose}
      isOpen={true}
    >
      <TextInput
        label="Merchant *"
        placeholder="e.g. Starbucks"
        value={merchant}
        onChange={(value) => setMerchant(value)}
      />
      <TextInput
        label="Description"
        placeholder="e.g. Coffee & Pastry"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <NumberInput
        label="Amount *"
        value={amount}
        onChange={(value) => setAmount(value)}
      />
      <DropdownInput
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(value) => setCategory(value as string)}
      />

      <div className="grid grid-cols-[2fr_auto] gap-5">
        <GradientButton
          onClick={() => {
            console.log({ merchant, description, amount, category });
          }}
        >
          Add Transaction
        </GradientButton>
        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default TransactionsModal;
