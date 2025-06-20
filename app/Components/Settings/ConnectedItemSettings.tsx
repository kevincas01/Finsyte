"use client";
import { PlaidItemWithAccounts } from "@/app/Types/items";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import NeutralButton from "../Buttons/NeutralButton";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getTransactionsFromItem } from "@/app/Utils/Actions.ts/plaid";
import { createTransactions } from "@/app/Utils/Actions.ts/transactions";

interface ConnectedItemSettingsProps {
  itemsWithAccounts: PlaidItemWithAccounts[] | undefined;
}
const ConnectedItemSettings = ({
  itemsWithAccounts,
}: ConnectedItemSettingsProps) => {
  const handleItemSync = async (
    itemId: string,
    userId: string,
    access_token: string
  ) => {
    // Handle sync: Sync transactions client.sync({})
    // Returns latest transactions that have been added or modified

    const transactions = (await getTransactionsFromItem(access_token))
      .transactions;

    const transactionResponse = await createTransactions({
      userId,
      itemId,
      transactions,
    });

    // TODO
    // Get latest sync for item and display it: use either a state or call db again
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-white rounded-md border border-gray-200">
      <div className="flex items-center gap-3">
        <AccountBalanceOutlinedIcon />
        <h3 className="text-xl font-semibold">
          Connected Financial Institutions
        </h3>
      </div>

      {itemsWithAccounts &&
        itemsWithAccounts.map((item) => (
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 border border-gray-200 rounded-md p-4 "
            key={item.id}
          >
            <div className="">
              <p className="font-semibold text-lg text-primaryBlue">
                {item.institution_name || "Unnamed Institution"}
              </p>
              <p className="text-sm text-gray-600">
                Last synced: 2 hours ago{" "}
                {/* TODO: Replace with real timestamp later */}
              </p>
            </div>

            <div className="mt-3 md:mt-0 text-sm text-gray-700 flex flex-col items-start md:items-center">
              <p className="font-medium">
                {item.accounts.length} linked account
                {item.accounts.length !== 1 && "s"}
              </p>
              <ul className="list-disc ml-4 text-xs text-gray-600 mt-1">
                {item.accounts.slice(0, 3).map((account) => (
                  <li key={account.account_id}>
                    {account.name} ({account.subtype})
                  </li>
                ))}
                {item.accounts.length > 3 && (
                  <li>+{item.accounts.length - 3} more</li>
                )}
              </ul>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <NeutralButton
                onClick={() => {
                  handleItemSync(item.item_id, item.user_id, item.access_token);
                }}
                className="text-sm text-primaryBlue hover:bg-primaryBlue/10 text-nowrap"
              >
                <SyncOutlinedIcon fontSize="inherit" />
                Sync Institution
              </NeutralButton>
              <NeutralButton
                onClick={() => {}}
                className="text-red-500 hover:bg-red-500/10 text-sm"
              >
                <DeleteOutlineOutlinedIcon fontSize="inherit" />
              </NeutralButton>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ConnectedItemSettings;
