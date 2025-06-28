"use client";
import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { formatCurrency, formatDate } from "@/app/Utils/format";
import React, { useState } from "react";
import RecurringModal from "../Modal/RecurringModal";
import { ClientRecurringTransaction } from "@/app/Types/recurring";
interface RecurringTransactionsListProps {
  recurringTransactions: ClientRecurringTransaction[];
}
const RecurringTransactionsList = ({
  recurringTransactions,
}: RecurringTransactionsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecurring, setSelectedRecurring] =
    useState<ClientRecurringTransaction | null>(null);
  return (
    <div className="bg-white shadow-card rounded-md">
      {isModalOpen && selectedRecurring && (
        <RecurringModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRecurring(null);
          }}
          onSubmit={(budget) => {
            console.log(budget);
            setIsModalOpen(false);
            setSelectedRecurring(null);
          }}
          mode="edit"
          initialRecurring={selectedRecurring}
        />
      )}
      <div className="p-5 border-b border-b-gray-200">
        <p className="font-semibold">All Recurring Transactions</p>
      </div>

      {recurringTransactions.map((transaction) => (
        <div
          key={transaction.name}
          className="flex flex-row justify-between p-5 border-b border-b-gray-200"
        >
          <div className="flex flex-row gap-2 items-center">
            <p className="font-medium">{transaction.name}</p>

            <span
              className={`my-auto text-xs font-medium px-2 py-1 rounded-full text-nowrap ${
                TransactionCategoryColors[transaction.category]
              }`}
            >
              {transaction.category}
            </span>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div>
              <p className="font-medium">
                {formatCurrency(transaction.amount, 2)}
              </p>
              <p className="text-sm text-gray-600">{transaction.frequency}</p>
            </div>
            <p className="font-medium text-sm">
              {formatDate(transaction?.next_date)}
            </p>
            <button
              onClick={() => {
                setSelectedRecurring(transaction);
                setIsModalOpen(true);
              }}
              className="text-blue-600 hover:underline text-sm cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringTransactionsList;
