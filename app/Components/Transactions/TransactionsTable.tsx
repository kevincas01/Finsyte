import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { ClientTransactionWithAccount } from "@/app/Types/transactions";
import { useState } from "react";
import TransactionsModal from "../Modal/TransactionsModal";
import { updateTransaction } from "@/app/Utils/Actions.ts/transactions";
import { formatDateToMMDDYYYY } from "@/app/Utils/format";
import Image from "next/image";

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
          onSubmit={async (transaction) => {
            const result = await updateTransaction({
              id: transaction.id,
              amount: transaction.amount,
              name: transaction.name,
              description: transaction.description,
              financeCategory: transaction.financeCategory,
            });

            if (!result.success) {
              console.error("Failed to update transaction:", result.error);
              // You can also show a toast or alert here
            }
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
                <td className="px-6 py-4 font-semibold text-base flex ">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 relative overflow-hidden">
                    {transaction.logoUrl ? (
                      <Image
                        fill
                        src={transaction.logoUrl}
                        alt="Merchant Logo"
                        objectFit="cover"
                        className="relative rounded-full"
                      />
                    ) : (
                      <span className="text-gray-600 text-lg">
                        {transaction.name[0]}
                      </span>
                    )}
                  </div>
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
                  {transaction.amount > 0 ? (
                    <p className="font-semibold ">
                      ${transaction.amount.toFixed(2)}
                    </p>
                  ) : (
                    <p className="font-semibold text-green-500">
                      +${(-1 * transaction.amount).toFixed(2)}
                    </p>
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
