import BudgetHeader from "@/app/Components/Budgets/BudgetHeader";
import BudgetPeriodDisplay from "@/app/Components/Budgets/BudgetPeriodDisplay";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserBudgets } from "@/app/Utils/Actions.ts/budgets";
import { mapToClientBudget } from "@/app/Utils/Transform/budgets";
import { redirect } from "next/navigation";

const BudgetsPage = async() => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;
  const userBudgets = (await getUserBudgets(userId)).data;
  const budgets = userBudgets!.map((budget) =>
    mapToClientBudget(budget)
  );

  return (
    <div className="flex flex-col gap-5">
      <BudgetHeader />
      <BudgetPeriodDisplay budgets={budgets} />
    </div>
  );
};

export default BudgetsPage;
