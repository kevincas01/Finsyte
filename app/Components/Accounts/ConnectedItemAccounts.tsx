"use client";
import { DBPlaidItemWithAccounts } from "@/app/Types/items";
import NeutralButton from "../Buttons/NeutralButton";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatCurrency } from "@/app/Utils/format";
import {
  getRecurringTransactions,
  getTransactionsFromItem,
} from "@/app/Utils/Actions.ts/plaid";
import { createTransactions } from "@/app/Utils/Actions.ts/transactions";
import {
  getLatestCursorOrNull,
  updateItemCursor,
} from "@/app/Utils/Actions.ts/items";
import { useRouter } from "next/navigation";
import { DBAccount } from "@/app/Types/account";
import { upsertRecurringOutflows } from "@/app/Utils/Actions.ts/recurring";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { getAccountTypeMeta } from "@/app/Utils/accounts";
interface ConnectedItemAccountsProps {
  itemWithAccounts: DBPlaidItemWithAccounts;
}

const ConnectedItemAccounts = ({
  itemWithAccounts,
}: ConnectedItemAccountsProps) => {
  const router = useRouter();
  const handleItemSync = async (
    itemId: string,
    userId: string,
    accessToken: string,
    accounts: DBAccount[]
  ) => {
    // Step 1: Get latest cursor from DB
    const { success, data, error } = await getLatestCursorOrNull(itemId);
    if (!success) {
      console.error("Error fetching cursor:", error);
      return;
    }

    const startingCursor = data?.cursor ?? undefined;

    const { transactions, cursor: newCursor } = await getTransactionsFromItem(
      accessToken,
      startingCursor
    );

    const transactionResponse = await createTransactions({
      userId,
      itemId,
      transactions,
    });

    if (!transactionResponse.success) {
      console.error("Error saving transactions:", transactionResponse.error);
      return;
    }

    const updateResult = await updateItemCursor(itemId, newCursor);
    if (!updateResult.success) {
      console.error("Failed to update item cursor:", updateResult.error);
      return;
    }

    const accountIds = accounts.map((account) => account.account_id);

    const { outflows } = await getRecurringTransactions(
      accessToken,
      accountIds
    );

    await upsertRecurringOutflows(userId, outflows);

    // Optional: You could return the transactions or re-fetch latest from DB here
    console.log("Sync completed successfully.");
  };

  const renderAccountCard = (account: DBAccount) => {
    const { icon, color } = getAccountTypeMeta(account.type);

    const isDebt = account.type === "credit" || account.type === "loan";

    return (
      <>
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

        <NeutralButton
          className="w-full"
          onClick={() => {
            router.push(`/accounts/${account.account_id}`);
          }}
        >
          <VisibilityOutlinedIcon />
          View Transactions
        </NeutralButton>
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex flex-row justify-between items-center border-b border-gray-200 p-5 ">
        <div>
          <p className="font-semibold text-lg text-primaryBlue">
            {itemWithAccounts.institution_name || "Unnamed Institution"}
          </p>
          <p className="text-sm text-gray-600">Last synced: 2 hours ago</p>
        </div>

        <div className="flex gap-3">
          <NeutralButton
            onClick={() => {
              handleItemSync(
                itemWithAccounts.item_id,
                itemWithAccounts.user_id,
                itemWithAccounts.access_token,
                itemWithAccounts.accounts
              );
            }}
            className="text-sm text-primaryBlue hover:bg-primaryBlue/10"
          >
            <SyncOutlinedIcon fontSize="inherit" />
            <span className="ml-1">Sync</span>
          </NeutralButton>
          <NeutralButton
            onClick={() => {}}
            className="text-red-500 hover:bg-red-500/10 text-sm"
          >
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
          </NeutralButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gray-50">
        {itemWithAccounts.accounts.map((account, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-white rounded-lg p-5 flex flex-col flex-1 gap-3 items-start w-full text-left"
          >
            {renderAccountCard(account)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedItemAccounts;
