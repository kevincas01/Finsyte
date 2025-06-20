import { TransactionCategory } from "../Types/transactions";

export const TransactionCategories: TransactionCategory[] = [
  "Automotive",
  "Fees & Adjustments",
  "Education",
  "Food & Drink",
  "Utilities",
  "Entertainment",
  "Travel",
  "Shopping",
  "Professional Services",
  "Personal",
  "Miscellaneous",
  "Health & wellness",
  "Gifts & donations",
  "Gas",
  "Groceries",
];

export const TransactionCategoryColors: Record<string, string> = {
  Automotive: "bg-gray-100 text-gray-700",
  "Fees & Adjustments": "bg-red-100 text-red-600",
  Education: "bg-indigo-100 text-indigo-600",
  "Food & Drink": "bg-blue-100 text-blue-600",
  Utilities: "bg-green-100 text-green-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Travel: "bg-yellow-100 text-yellow-700",
  Shopping: "bg-pink-100 text-pink-600",
  "Professional Services": "bg-cyan-100 text-cyan-700",
  Personal: "bg-teal-100 text-teal-700",
  Miscellaneous: "bg-neutral-100 text-neutral-600",
  "Health & wellness": "bg-emerald-100 text-emerald-600",
  "Gifts & donations": "bg-rose-100 text-rose-600",
  Gas: "bg-orange-100 text-orange-700",
  Groceries: "bg-lime-100 text-lime-700",
};
