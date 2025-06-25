import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { ClientTransaction } from "@/app/Types/transactions";

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
        <div key={index} className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-600 text-sm">
                {transaction.name[0]}
              </span>
            </div>
            <div>
              <p className="font-medium">{transaction.name}</p>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  TransactionCategoryColors[transaction.financeCategory!]
                }`}
              >
                {transaction.financeCategory}
              </span>
            </div>
          </div>
          <div className="text-right">
            {transaction.amount > 0 ? (
              <p className="font-semibold text-red-500">
                -${transaction.amount.toFixed(2)}
              </p>
            ) : (
              <p className="font-semibold text-green-500">
                +${(-1 * transaction.amount).toFixed(2)}
              </p>
            )}

            <p className="text-sm text-gray-500">
              {new Date(transaction.datetime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactionsCard;
