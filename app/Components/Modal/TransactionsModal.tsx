"use client";

import { useState } from "react";
import { TransactionCategories } from "@/app/Constants/transactions";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import DropdownInput from "../Inputs/DropdownInput";
import NumberInput from "../Inputs/NumberInput";
import TextInput from "../Inputs/TextInput";
import ModalContainer from "./ModalContainer";
import { ClientTransactionWithAccount } from "@/app/Types/transactions";

interface TransactionsModalProps {
  onClose: () => void;
  onSubmit: (transaction: Partial<ClientTransactionWithAccount>) => void;
  initialTransaction?: ClientTransactionWithAccount;
  mode?: "create" | "edit";
}

const TransactionsModal = ({
  onClose,
  onSubmit,
  initialTransaction,
  mode = "create",
}: TransactionsModalProps) => {
  console.log(initialTransaction)
  const [merchant, setMerchant] = useState(initialTransaction?.name || "");
  const [description, setDescription] = useState(
    initialTransaction?.description || ""
  );
  const [amountInput, setAmountInput] = useState<string>(
    String(initialTransaction?.amount) ?? ""
  );

  const [category, setCategory] = useState(
    initialTransaction?.financeCategory || ""
  );

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
        label="Merchant"
        placeholder="e.g. Starbucks"
        value={merchant}
        onChange={(value) => setMerchant(value)}
        showRequired={true}
        required={true}
      />
      <TextInput
        label="Description"
        placeholder="e.g. Coffee & Pastry"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <NumberInput
        label="Amount"
        value={amountInput}
        onChange={(value) => setAmountInput(value)}
        required={true}
        showRequired={true}
        placeHolder="0.00"
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

            const newTransaction: Partial<ClientTransactionWithAccount> = {
              datetime:
                initialTransaction?.datetime ||
                new Date().toISOString().slice(0, 10),
              name: merchant,
              description,
              financeCategory: category,
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
