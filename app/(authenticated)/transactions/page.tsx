import TransactionsHeader from "@/app/Components/Transactions/TransactionsHeader";
import TransactionsClient from "@/app/Components/Transactions/TransactionsClient";
import { mockTransactions } from "@/app/Constants/transactions";

const TransactionsPage = () => {
  const transactions = mockTransactions;
  return (
    <div className="flex flex-col gap-5">
      <TransactionsHeader />
      <TransactionsClient transactions={[]} />
    </div>
  );
};

export default TransactionsPage;
