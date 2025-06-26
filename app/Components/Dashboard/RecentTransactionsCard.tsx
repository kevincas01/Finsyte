import { ClientTransaction } from "@/app/Types/transactions";
import TransactionsList from "../TransactionsList";

interface RecentTransactionsCardProps {
  transactions: ClientTransaction[];
}
const RecentTransactionsCard = ({
  transactions,
}: RecentTransactionsCardProps) => {
  return (
    <div className="p-5 bg-white shadow-card rounded-md">
      <div className="flex flex-row justify-between mb-5">
        <h4 className="text-xl font-semibold">Recent Transactions</h4>
        <button className="text-primaryBlue font-medium ml-1 cursor-pointer">
          View All
        </button>
      </div>
      <div></div>
      {transactions.map((transaction, index) => (
        <TransactionsList transaction={transaction} key={index} />
      ))}
    </div>
  );
};

export default RecentTransactionsCard;
