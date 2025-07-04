import { TransactionCategory } from "../Types/transactions";

export const TransactionCategories: TransactionCategory[] = [
  "Education",
  "Entertainment",
  "Fees & Adjustments",
  "Food & Drink",
  "Health & Wellness",
  "Housing",
  "Gifts & Donations",
  "Groceries",
  "Miscellaneous",
  "Personal",
  "Shopping",
  "Transportation",
  "Travel",
  "Utilities",
];

export const TransactionCategoryColors: Record<string, string> = {
  Education: "bg-indigo-100 text-indigo-600",
  Entertainment: "bg-purple-100 text-purple-700",
  "Fees & Adjustments": "bg-red-100 text-red-600",
  "Food & Drink": "bg-blue-100 text-blue-600",
  "Health & Wellness": "bg-emerald-100 text-emerald-600",
  Housing: "bg-lime-100 text-lime-700",
  "Gifts & Donations": "bg-rose-100 text-rose-600",
  Groceries: "bg-blue-100 text-blue-600",
  Miscellaneous: "bg-neutral-100 text-neutral-600",
  Personal: "bg-teal-100 text-teal-700",
  Shopping: "bg-pink-100 text-pink-600",
  Travel: "bg-yellow-100 text-yellow-700",
  Transportation: "bg-yellow-100 text-yellow-700",
  Utilities: "bg-green-100 text-green-700",
};
export const TransactionCategoryHexColors: Record<string, string> = {
  Education: "#6366f1",           // indigo-400
  Entertainment: "#c084fc",       // purple-400
  "Fees & Adjustments": "#f87171", // red-400
  "Food & Drink": "#60a5fa",      // blue-400
  "Health & Wellness": "#34d399", // emerald-400
  Housing: "#84cc16",             // lime-400
  "Gifts & Donations": "#fb7185", // rose-400
  Groceries: "#60a5fa",           // blue-400 (same as Food & Drink)
  Miscellaneous: "#a3a3a3",       // neutral-400
  Personal: "#2dd4bf",            // teal-400
  Shopping: "#f472b6",            // pink-400
  Travel: "#facc15",              // yellow-400
  Transportation: "#facc15",      // yellow-400
  Utilities: "#4ade80",           // green-400
};