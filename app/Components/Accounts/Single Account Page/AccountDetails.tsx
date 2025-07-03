"use client";

import { DBAccount } from "@/app/Types/account";
import { ClientTransaction } from "@/app/Types/transactions";
import { formatCurrency } from "@/app/Utils/format";
import TransactionsList from "../../TransactionsList";
import { getAccountTypeMeta } from "@/app/Utils/accounts";

interface Props {
  account: DBAccount;
  transactions: ClientTransaction[];
}

export default function AccountDetails({ account, transactions }: Props) {
  const { icon, color } = getAccountTypeMeta(account.type);

  const isDebt = account.type === "credit" || account.type === "loan";
  return (
    <div className="w-full flex flex-col gap-5 overflow-auto">
      <div className="border border-blue-100 bg-white rounded-lg p-4">
        <div className="flex flex-row justify-between items-center w-full">
          <span className={`${color} px-3 py-2 text-white text-lg rounded-md`}>
            {icon}
          </span>
          <span className="text-right">
            <p
              className={`font-semibold text-lg ${
                isDebt ? "text-red-600" : "text-green-600"
              }`}
            >
              {formatCurrency(account.current_balance, 2)}
            </p>
            {account.available_balance != null && (
              <p className="text-xs text-gray-600">
                Available: {formatCurrency(account.available_balance,2)}
              </p>
            )}
          </span>
        </div>

        {/* Account details */}
        <div className="flex flex-col gap-1 w-full">
          <p className="font-semibold text-gray-800">{account.name}</p>
          <p className="text-sm text-gray-600 capitalize">
            {account.subtype?.replace("_", " ") || account.type} ••••
            {account.mask}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-auto flex flex-col gap-2 box-border flex-1">
        <h2 className="font-semibold text-gray-800 ">Transactions</h2>

        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
}
