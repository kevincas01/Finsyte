"use client";
import { ClientTransaction } from "@/app/Types/transactions";
import TransactionsList from "../TransactionsList";
import { useRouter } from "next/navigation";

interface RecentTransactionsCardProps {
  transactions: ClientTransaction[];
}
const RecentTransactionsCard = ({
  transactions,
}: RecentTransactionsCardProps) => {
  const router = useRouter();
  return (
    <div className="p-5 bg-white shadow-card rounded-md">
      <div className="flex flex-row justify-between mb-5">
        <h4 className="text-xl font-semibold">Recent Transactions</h4>
        <button
          onClick={() => {
            router.push("/transactions");
          }}
          className="text-primaryBlue font-medium ml-1 cursor-pointer"
        >
          View All
        </button>
      </div>

      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default RecentTransactionsCard;
