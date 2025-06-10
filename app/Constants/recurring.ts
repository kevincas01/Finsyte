import { Recurring, RecurringFrequencyCategory } from "../Types/recurring";

export const RecurringFrequencies: RecurringFrequencyCategory[] = [
  "Weekly",
  "Monthly",
  "Quarterly",
  "Yearly",
];

export const recurringExpenses: Recurring[] = [
  {
    name: "Rent",
    amount: 1500,
    category: "Housing",
    frequency: "Monthly",
    targetDate: "2025-07-01",
  },
  {
    name: "Renter's Insurance",
    amount: 20,
    category: "Housing",
    frequency: "Monthly",
    targetDate: "2025-07-01",
  },
  {
    name: "Internet",
    amount: 60,
    category: "Utilities",
    frequency: "Monthly",
    targetDate: "2025-07-02",
  },
  {
    name: "Electric Bill",
    amount: 100,
    category: "Utilities",
    frequency: "Monthly",
    targetDate: "2025-07-05",
  },
  {
    name: "Water Bill",
    amount: 40,
    category: "Utilities",
    frequency: "Monthly",
    targetDate: "2025-07-06",
  },
  
  {
    name: "Car Insurance",
    amount: 120,
    category: "Travel",
    frequency: "Monthly",
    targetDate: "2025-07-03",
  },
  {
    name: "Transit Pass",
    amount: 75,
    category: "Travel",
    frequency: "Monthly",
    targetDate: "2025-07-01",
  },
  
];
