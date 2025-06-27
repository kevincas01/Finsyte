import BudgetProgress from "@/app/Components/Budgets/BudgetsProgress";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getBudgetInfoWithBudgetId } from "@/app/Utils/Actions.ts/budgets";
import { getUserTransactionsByCategory } from "@/app/Utils/Actions.ts/transactions";
import { mapToClientBudget } from "@/app/Utils/Transform/budgets";
import { mapToClientTransaction } from "@/app/Utils/Transform/transactions";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    budgetId: string;
  }>;
}

export default async function BudgetPage({ params }: Props) {
  
  const userSession = (await getUser()).data.user;
  if (!userSession) redirect("/");

  const userId = userSession.id;
  const budgetId = (await params).budgetId;

  const userBudget = (await getBudgetInfoWithBudgetId(userId, budgetId))?.data;
  const budget = mapToClientBudget(userBudget!);

  if (!budget) redirect("/budgets");

  const dbTransactions = (
    await getUserTransactionsByCategory(userId, budget.financeCategory)
  ).data;
  const transactions = dbTransactions!.map((transaction) =>
    mapToClientTransaction(transaction)
  );

  return (
    <div className=" max-h-[calc(100vh-40px)] flex flex-col gap-5 box-border flex-1">
      <div className="text-center">
        <h1 className="font-bold text-3xl ">Budget Progress</h1>
        <p className="text-gray-600 mt-1">
        Track your spending for {budget.financeCategory}
        </p>
      </div>
      <BudgetProgress budget={budget} transactions={transactions} />
    </div>
  );
}
