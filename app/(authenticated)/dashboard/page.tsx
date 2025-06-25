import BalancesCard from "@/app/Components/Dashboard/BalancesCard";
import BillsCard from "@/app/Components/Dashboard/BillsCard";
import DebtCard from "@/app/Components/Dashboard/DebtCard";
import ExpensesCard from "@/app/Components/Dashboard/ExpensesCard";
import RecentTransactionsCard from "@/app/Components/Dashboard/RecentTransactionsCard";
import { getUserAccounts } from "@/app/Utils/Actions.ts/accounts";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserInformation } from "@/app/Utils/Actions.ts/profiles";
import { getUserTransactionsWithAccount } from "@/app/Utils/Actions.ts/transactions";
import { getMonthlyExpensesTotal } from "@/app/Utils/expenses";
import { mapToClientTransaction } from "@/app/Utils/Transform/transactions";
import { redirect } from "next/navigation";
const DashboardPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;
  const profileInfo = (await getUserInformation(userId))?.data;
  const dbTransactions = (await getUserTransactionsWithAccount(userId)).data;
  const transactions = dbTransactions!.map((transaction) =>
    mapToClientTransaction(transaction)
  );

  const accountsInfo = (await getUserAccounts(userId)).data;

  const expenseReport = getMonthlyExpensesTotal(transactions, true);

  const totalBalance = accountsInfo?.reduce(
    (total, account) => total + account.available_balance,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {`Welcome ${
            profileInfo.first_name ? " " + profileInfo.first_name : ""
          }! Here's your financial overview.`}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <BalancesCard
          totalBalance={totalBalance!}
          accountsLength={accountsInfo?.length!}
        />
        <ExpensesCard
          expensesTotal={expenseReport.total}
          topExpense={expenseReport.topCategory!}
        />
        <DebtCard />
        <BillsCard />
      </div>

      <RecentTransactionsCard transactions={transactions} />
    </div>
  );
};

export default DashboardPage;
