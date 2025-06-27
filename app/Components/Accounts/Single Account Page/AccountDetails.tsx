"use client";

import { DBAccount } from "@/app/Types/account";
import { ClientTransaction } from "@/app/Types/transactions";
import { formatCurrency } from "@/app/Utils/format";
import TransactionsList from "../../TransactionsList";

interface Props {
  account: DBAccount;
  transactions: ClientTransaction[];
}

export default function AccountDetails({ account, transactions }: Props) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="border border-blue-100 bg-white rounded-lg p-4">
        <p className="font-medium text-gray-800 text-xl">
          {account.name || "Unnamed Account"}
        </p>
        <p className="text-sm text-gray-600">
          {account.type} — {account.subtype}
        </p>
        <p className="text-sm text-gray-400">Mask: ****{account.mask}</p>
        <p className="font-semibold text-green-600 mt-2 text-lg">
          {formatCurrency(account.current_balance) ?? "0.00"}
        </p>
        <p className="text-xs text-gray-600">
          Available: {formatCurrency(account.available_balance) ?? "0.00"}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold text-gray-800 ">Transactions</h2>

        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
}
