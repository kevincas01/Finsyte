import BudgetHeader from "@/app/Components/Budgets/BudgetHeader";
import BudgetPeriodDisplay from "@/app/Components/Budgets/BudgetPeriodDisplay";
import { exampleBudgets } from "@/app/Constants/budgets";

const BudgetsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <BudgetHeader />
      <BudgetPeriodDisplay budgets={exampleBudgets} />
    </div>
  );
};

export default BudgetsPage;
