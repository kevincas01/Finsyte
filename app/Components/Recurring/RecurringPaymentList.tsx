import { recurringExpenses } from "@/app/Constants/recurring";
import { TransactionCategoryColors } from "@/app/Constants/transactions";
import React from "react";

const RecurringPaymentList = () => {
  return (
    <div className="bg-white shadow-card rounded-md">
      <div className="p-5 border-b border-b-gray-200">
        <p className="font-semibold">All Recurring Payments</p>
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
          <div className="flex flex-row">
            <div>
              <p className="font-medium">${expense.amount}</p>
              <p className="text-sm text-gray-600">${expense.frequency}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentList;
