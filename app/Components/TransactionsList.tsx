import React from "react";
import { ClientTransaction } from "../Types/transactions";
import Image from "next/image";
import { TransactionCategoryColors } from "../Constants/transactions";
import { formatDateToMMDDYYYY } from "../Utils/format";
interface TransactionsListProps {
  transaction: ClientTransaction;
}
const TransactionsList = ({ transaction }: TransactionsListProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 relative overflow-hidden">
          {transaction.logoUrl ? (
            <Image
              fill
              src={transaction.logoUrl}
              alt="Merchant Logo"
              objectFit="cover"
              className="relative rounded-full"
            />
          ) : (
            <span className="text-gray-600 text-lg">{transaction.name[0]}</span>
          )}
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
          {formatDateToMMDDYYYY(transaction.datetime)}
        </p>
      </div>
    </div>
  );
};

export default TransactionsList;
