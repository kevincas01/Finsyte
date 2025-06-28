"use client";
import { recurringExpenses } from "@/app/Constants/recurring";
import { TransactionCategoryColors } from "@/app/Constants/transactions";
import { formatDate } from "@/app/Utils/format";
import React, { useState } from "react";
import RecurringModal from "../Modal/RecurringModal";
import { Recurring } from "@/app/Types/recurring";
interface RecurringTransactionsListProps {
  expenses: Recurring[];
}
const RecurringTransactionsList = ({ expenses }: RecurringTransactionsListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecurring, setSelectedRecurring] = useState<Recurring | null>(
    null
  );
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
        <p className="font-semibold">All Recurring Transactionss</p>
      </div>

      {recurringExpenses.map((expense) => (
        <div
          key={expense.name}
          className="flex flex-row justify-between p-5 border-b border-b-gray-200"
        >
          <div className="flex flex-row gap-2 items-center">
            <p className="font-medium">{expense.name}</p>

            <span
              className={`my-auto text-xs font-medium px-2 py-1 rounded-full text-nowrap ${
                TransactionCategoryColors[expense.category]
              }`}
            >
              {expense.category}
            </span>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div>
              <p className="font-medium">${expense.amount}</p>
              <p className="text-sm text-gray-600">{expense.frequency}</p>
            </div>
            <p className="font-medium text-sm">
              {formatDate(expense?.targetDate)}
            </p>
            <button
              onClick={() => {
                setSelectedRecurring(expense);
                setIsModalOpen(true);
              }}
              className="text-blue-600 hover:underline text-sm cursor-pointer"
            >
              Edit
            </button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringTransactionsList;
