import { Budget, BudgetPeriodCategory } from "../Types/budget";

export const BudgetPeriods:BudgetPeriodCategory[] = [ "Monthly", "Quarterly", "Yearly"];

export const exampleBudgets: Budget[] = [
  {
    category: "Groceries",
    period:"Monthly",
    description: "Monthly food and household essentials",
    currentAmount: 520,
    budgetAmount: 500,
  },
  {
    category: "Food & Drink",
    period:"Monthly",
    description: "Restaurants, takeout, and cafes",
    currentAmount: 150,
    budgetAmount: 200,
  },
  {
    category: "Travel",
    period:"Monthly",
    description: "Gas, rideshare, and public transport",
    currentAmount: 95.75,
    budgetAmount: 150,
  },
  {
    category: "Entertainment",
    period:"Quarterly",
    description: "Movies, games, events, and subscriptions",
    currentAmount: 80,
    budgetAmount: 120,
  },
  {
    category: "Utilities",
    period:"Monthly",
    description: "Electricity, water, internet, etc.",
    currentAmount: 180.2,
    budgetAmount: 200,
  },
];
