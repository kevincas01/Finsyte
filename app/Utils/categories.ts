import { TransactionCategory } from "../Types/transactions";

export const mapPlaidCategoryToCustom = (
  primary: string,
  detailed: string
): TransactionCategory => {
  const p = primary.toUpperCase();
  const d = detailed.toUpperCase();

  if (p === "FOOD_AND_DRINK") {
    if (d === "FOOD_AND_DRINK_GROCERIES") return "Groceries";
    return "Food & Drink";
  }

  if (p === "TRANSPORTATION") {
    return "Transportation";
  }

  if (p === "BANK_FEES" || p === "LOAN_PAYMENTS") {
    return "Fees & Adjustments";
  }

  if (p === "RENT_AND_UTILITIES") {
    return "Housing";
  }

  if (p === "TRAVEL") return "Transportation";
  if (p === "ENTERTAINMENT") return "Entertainment";
  if (p === "GENERAL_MERCHANDISE" || p === "HOME_IMPROVEMENT")
    return "Shopping";
  if (p === "PERSONAL_CARE") return "Personal";
  if (p === "MEDICAL") return "Health & Wellness";
  if (p === "GENERAL_SERVICES") {
    if (d.includes("EDUCATION")) return "Education";
    return "Personal";
  }
  if (p === "GOVERNMENT_AND_NON_PROFIT" && d.includes("DONATIONS"))
    return "Gifts & Donations";

  return "Miscellaneous";
};
