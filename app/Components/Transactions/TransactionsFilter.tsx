"use client";
import { TransactionCategories } from "@/app/Constants/transactions";
import TextInput from "../Inputs/TextInput";
import DropdownInput from "../Inputs/DropdownInput";

interface TransactionsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  account: string;
  onAccountChange: (value: string) => void;
}

const TransactionsFilter = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  account,
  onAccountChange,
}: TransactionsFilterProps) => {
  const categoryOptions = TransactionCategories.map((c) => ({
    label: c,
    value: c,
  }));
  const accounts = [
    "Chase Checking",
    "Capital One Credit",
    "Wells Fargo Debit",
  ]; // Replace with real values if needed

  const accountOptions = accounts.map((a) => ({ label: a, value: a }));

  return (
    <div className="bg-white p-6 shadow-card flex flex-col lg:flex-row gap-5 rounded-md">
      <TextInput
        label="Search"
        placeholder="Search Transactions"
        icon="search"
        value={search}
        onChange={(value) => {
          onSearchChange(value);
        }}
      />
      <div className="flex flex-row gap-5">
        <DropdownInput
          label="Category"
          options={[
            { label: "All Categories", value: "All" },
            ...categoryOptions,
          ]}
          value={category}
          onChange={(option) => onCategoryChange(option as string)}
        />
        <DropdownInput
          label="Account"
          options={[{ label: "All Accounts", value: "All" }, ...accountOptions]}
          value={account}
          onChange={(option) => onAccountChange(option as string)}
        />
      </div>
    </div>
  );
};
export default TransactionsFilter;
