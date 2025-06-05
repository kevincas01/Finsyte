import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { Transaction } from "@/app/Types/transactions";
import { formatDate } from "@/app/Utils/format";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions = [],
}) => {
  return (
    <div className="rounded-md border border-gray-200 overflow-x-auto">
      <table className="min-w-full text-sm bg-white">
        <thead>
          <tr>
            {[
              "Date",
              "Merchant",
              "Description",
              "Category",
              "Account",
              "Amount",
            ].map((header) => (
              <th
                key={header}
                className="bg-gray-100 text-left text-gray-600 font-medium px-6 py-4"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-t border-gray-100 hover:bg-gray-50 py-2"
              >
                <td className="px-6 py-4">{formatDate(txn.date)}</td>
                <td className="px-6 py-4 font-semibold text-base">
                  {txn.merchant}
                </td>
                <td className="px-6 py-4">{txn.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full text-nowrap ${
                      TransactionCategoryColors[txn.category]
                    }`}
                  >
                    {txn.category}
                  </span>
                </td>
                <td className="px-6 py-4">{txn.account}</td>
                <td className="px-6 py-4 font-semibold text-base">
                  $
                  {txn.amount < 0 ? (
                    (-1 * txn.amount).toFixed(2)
                  ) : (
                    <span className="text-green-600">
                      {txn.amount.toFixed(2)}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-gray-600 py-10">
                No transactions to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
