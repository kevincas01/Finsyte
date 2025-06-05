import BudgetCard from "@/app/Components/Budgets/BudgetCard";
import BudgetOverview from "@/app/Components/Budgets/BudgetOverview";

interface Budget {
    title: string;
    description?: string;
    currentAmount: number;
    budgetAmount: number;
  }
const exampleBudgets: Budget[] = [
    {
      title: "Groceries",
      description: "Monthly food and household essentials",
      currentAmount: 520,
      budgetAmount: 500,
    },
    {
      title: "Food & Drink",
      description: "Restaurants, takeout, and cafes",
      currentAmount: 150,
      budgetAmount: 200,
    },
    {
      title: "Travel",
      description: "Gas, rideshare, and public transport",
      currentAmount: 95.75,
      budgetAmount: 150,
    },
    {
      title: "Entertainment",
      description: "Movies, games, events, and subscriptions",
      currentAmount: 80,
      budgetAmount: 120,
    },
    {
      title: "Utilities",
      description: "Electricity, water, internet, etc.",
      currentAmount: 180.2,
      budgetAmount: 200,
    },
  ];
  
const BudgetsPage = () => {

    const totalBudgetAmount = exampleBudgets.reduce(
        (totalAmount, budget) => totalAmount + budget.budgetAmount,
        0
      );
    
      const totalSavedAmount = exampleBudgets.reduce(
        (totalAmount, budget) => totalAmount + budget.currentAmount,
        0
      );
  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Budgets</h1>
        <p className="text-gray-600 mt-1">
          Track your spending against your monthly budgets
        </p>
      </div><BudgetOverview
        totalBudgetAmount={totalBudgetAmount}
        totalSavedAmount={totalSavedAmount}
      />
      <div className="grid grid-cols-2 gap-5">
        {exampleBudgets.map((budget) => (
          <BudgetCard key={budget.title} budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetsPage;
