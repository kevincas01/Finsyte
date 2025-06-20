import TransactionsHeader from "@/app/Components/Transactions/TransactionsHeader";
import TransactionsClient from "@/app/Components/Transactions/TransactionsClient";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { redirect } from "next/navigation";
import { getUserTransactionsWithAccount } from "@/app/Utils/Actions.ts/transactions";
import { mapToClientTransaction } from "@/app/Utils/Transform/transactions";

const TransactionsPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;

  const dbTransactions = (await getUserTransactionsWithAccount(userId)).data;
  const transactions = dbTransactions!.map((transaction) =>
    mapToClientTransaction(transaction)
  );

  return (
    <div className="flex flex-col gap-5">
      <TransactionsHeader />
      <TransactionsClient transactions={transactions!} />
    </div>
  );
};

export default TransactionsPage;
