import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { TransactionCategory } from "@/app/Types/transactions";

const TransactionsList: {
  merchant: string;
  category: TransactionCategory;
  date: string;
  total: number;
}[] = [
  {
    merchant: "Starbucks",
    category: "Food & Drink",
    date: "2024-01-25",
    total: 5.45,
  },
  {
    merchant: "Netflix",
    category: "Entertainment",
    date: "2024-01-24",
    total: 15.99,
  },
  {
    merchant: "Uber",
    category: "Travel",
    date: "2024-01-23",
    total: 18.75,
  },
  {
    merchant: "Amazon",
    category: "Shopping",
    date: "2024-01-22",
    total: 54.32,
  },
  {
    merchant: "Verizon Wireless",
    category: "Utilities",
    date: "2024-01-21",
    total: 89.99,
  },
  {
    merchant: "Trader Joe's",
    category: "Groceries",
    date: "2024-01-20",
    total: 76.45,
  },
  {
    merchant: "Shell",
    category: "Gas",
    date: "2024-01-19",
    total: 42.18,
  },
  {
    merchant: "Spotify",
    category: "Entertainment",
    date: "2024-01-18",
    total: 9.99,
  },
];

const RecentTransactionsCard = () => {
  return (
    <div className="p-5 bg-white shadow-card rounded-md">
      <div className="flex flex-row justify-between mb-10">
        <h4 className="text-xl font-semibold">Recent Transactions</h4>
        <button className="text-primaryBlue font-medium ml-1 cursor-pointer">
          View All
        </button>
      </div>
      <div></div>
      {TransactionsList.map((transaction, index) => (
        <div key={index} className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-600 text-sm">
                {" "}
                {transaction.merchant[0]}
              </span>
            </div>
            <div>
              <p className="font-medium">{transaction.merchant}</p>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  TransactionCategoryColors[transaction.category]
                }`}
              >
                {transaction.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-red-500">
              -${transaction.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString("en-US", {
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
