import BalancesCard from "@/app/Components/Dashboard/BalancesCard";
import BillsCard from "@/app/Components/Dashboard/BillsCard";
import DebtCard from "@/app/Components/Dashboard/DebtCard";
import ExpensesCard from "@/app/Components/Dashboard/ExpensesCard";
import MonthlyExpensesCard from "@/app/Components/Dashboard/MonthlyExpensesCard";
import RecentTransactionsCard from "@/app/Components/Dashboard/RecentTransactionsCard";
import { getUserAccounts } from "@/app/Utils/Actions.ts/accounts";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserInformation } from "@/app/Utils/Actions.ts/profiles";
import { getUserRecurringTransactions } from "@/app/Utils/Actions.ts/recurring";
import {
  getUserTransactions,
} from "@/app/Utils/Actions.ts/transactions";
import { getStartAndEndOfCurrentWeek } from "@/app/Utils/date";
import { getMonthlyExpensesTotal } from "@/app/Utils/expenses";
import { formatCategoriesForRadial } from "@/app/Utils/format";
import { mapToClientRecurring } from "@/app/Utils/Transform/recurring";
import { mapToClientTransaction } from "@/app/Utils/Transform/transactions";
import { redirect } from "next/navigation";
const DashboardPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;
  const profileInfo = (await getUserInformation(userId))?.data;
  const dbTransactions = (await getUserTransactions(userId)).data;
  const transactions = dbTransactions!.map((transaction) =>
    mapToClientTransaction(transaction)
  );

  const accountsInfo = (await getUserAccounts(userId)).data;

  const expenseReport = getMonthlyExpensesTotal(transactions, true, true);

  const positiveAccounts = accountsInfo?.filter(
    (account) => account.type === "depository" || account.type === "investment"
  );
  const totalBalance = positiveAccounts!.reduce(
    (total, account) => total + account.current_balance,
    0
  );

  const negativeAccounts = accountsInfo?.filter(
    (account) => account.type === "credit" || account.type === "loan"
  );
  const totalDebt =
    negativeAccounts!.reduce(
      (sum, account) => sum + Math.abs(account.current_balance),
      0
    ) ?? 0;

  const dbRecurring = (await getUserRecurringTransactions(userId)).data;

  const recurringTransactions = dbRecurring!.map((recurring) =>
    mapToClientRecurring(recurring)
  );

  const { now, endOfWeek } = getStartAndEndOfCurrentWeek();

  const upcomingTransactions = recurringTransactions.filter((tx) => {
    const txDate = new Date(tx.next_date);
    return txDate >= now && txDate <= endOfWeek;
  });

  const totalUpcomingBalance = upcomingTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const chartData = formatCategoriesForRadial(expenseReport.categories);

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
          accountsLength={positiveAccounts?.length!}
        />
        <ExpensesCard
          expensesTotal={expenseReport.total || 0}
          topExpense={expenseReport.topCategory || null}
        />
        <DebtCard
          totalDebt={totalDebt!}
          accountsLength={negativeAccounts?.length!}
        />
        <BillsCard
          totalUpcomingBalance={totalUpcomingBalance}
          upcomingBalanceLength={upcomingTransactions.length}
        />
      </div>

      <MonthlyExpensesCard chartData={chartData} />
      <RecentTransactionsCard transactions={transactions.slice(0, 10)} />
    </div>
  );
};

export default DashboardPage;
