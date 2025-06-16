"use client";

import { useState } from "react";
import { TransactionCategories } from "@/app/Constants/transactions";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import NumberInput from "../Inputs/NumberInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import { Transaction } from "@/app/Types/transactions";

interface TransactionsModalProps {
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  initialTransaction?: Transaction;
  mode?: "create" | "edit";
}

const TransactionsModal = ({
  onClose,
  onSubmit,
  initialTransaction,
  mode = "create",
}: TransactionsModalProps) => {
  const [merchant, setMerchant] = useState(initialTransaction?.merchant || "");
  const [description, setDescription] = useState(
    initialTransaction?.description || ""
  );
  const [amountInput, setAmountInput] = useState<string>(
    String(initialTransaction?.amount) ?? ""
  );

  const [category, setCategory] = useState(initialTransaction?.category || "");

  const categoryOptions = TransactionCategories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <ModalContainer
      title={mode === "edit" ? "Edit Transaction" : "Add New Transaction"}
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
        value={amountInput}
        onChange={(value) => setAmountInput(value)}
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
            const parsedAmount = Math.max(0, parseFloat(amountInput) || 0);

            const newTransaction: Transaction = {
              id: initialTransaction?.id || crypto.randomUUID(),
              date:
                initialTransaction?.date ||
                new Date().toISOString().slice(0, 10),
              merchant,
              description,
              category: category as Transaction["category"],
              account: initialTransaction?.account || "",
              amount: parsedAmount,
            };

            onSubmit(newTransaction);
            onClose();
          }}
        >
          {mode === "edit" ? "Save Changes" : "Add Transaction"}
        </GradientButton>
        <NeutralButton onClick={onClose}>Cancel</NeutralButton>
      </div>
    </ModalContainer>
  );
};

export default TransactionsModal;
