import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { ClientTransactionWithAccount } from "@/app/Types/transactions";
import { useState } from "react";
import TransactionsModal from "../Modal/TransactionsModal";
import { createTransaction } from "@/app/Utils/Actions.ts/transactions";
import { formatDateToMMDDYYYY } from "@/app/Utils/format";

type TransactionsTableProps = {
  transactions: ClientTransactionWithAccount[];
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions = [],
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<ClientTransactionWithAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="rounded-md border border-gray-200 overflow-auto w-full">
      {isModalOpen && selectedTransaction && (
        <TransactionsModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTransaction(null);
          }}
          onSubmit={(updatedTransaction) => {
            // Replace the old transaction with the updated one (lifting state needed in parent if data lives above)
            console.log("Updated transaction:", updatedTransaction);
            setIsModalOpen(false);
            setSelectedTransaction(null);
          }}
          initialTransaction={selectedTransaction}
          mode="edit"
        />
      )}

      <table className="min-w-max w-full text-sm bg-white">
        <thead>
          <tr>
            {[
              "Date",
              "Merchant",
              "Description",
              "Category",
              "Account",
              "Amount",
              "Actions",
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
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-gray-100 hover:bg-gray-50 py-2"
              >
                <td className="px-6 py-4">
                  {formatDateToMMDDYYYY(transaction.datetime)}
                </td>
                <td className="px-6 py-4 font-semibold text-base">
                  {transaction.name}
                </td>
                <td className="px-6 py-4">{transaction.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full text-nowrap ${
                      TransactionCategoryColors[transaction.financeCategory!]
                    }`}
                  >
                    {transaction.financeCategory}
                  </span>
                </td>
                <td className="px-6 py-4">{transaction.account?.name}</td>
                <td className="px-6 py-4 font-semibold text-base">
                  $
                  {transaction.amount < 0 ? (
                    (-1 * transaction.amount).toFixed(2)
                  ) : (
                    <span className="text-green-600">
                      {transaction.amount.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:underline text-sm cursor-pointer"
                  >
                    Edit
                  </button>
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
