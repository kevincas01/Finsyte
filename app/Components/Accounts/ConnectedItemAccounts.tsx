"use client";
import { PlaidItemWithAccounts } from "@/app/Types/items";
import NeutralButton from "../Buttons/NeutralButton";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatCurrency } from "@/app/Utils/format";

interface ConnectedItemAccountsProps {
  itemWithAccounts: PlaidItemWithAccounts;
}

const ConnectedItemAccounts = ({ itemWithAccounts }: ConnectedItemAccountsProps) => {
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
          <NeutralButton onClick={() => {}} className="text-sm text-primaryGreen hover:bg-green-100">
            <SyncOutlinedIcon fontSize="inherit" />
            <span className="ml-1">Sync</span>
          </NeutralButton>
          <NeutralButton onClick={() => {}} className="text-red-500 hover:bg-red-100 text-sm">
            <DeleteOutlineOutlinedIcon fontSize="inherit" />
          </NeutralButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gray-50">
        {itemWithAccounts.accounts.map((account) => (
          <div
            key={account.account_id}
            className="border border-blue-100 bg-white rounded-lg p-4 flex flex-col gap-1 "
          >
            <p className="font-medium text-gray-800">{account.name || "Unnamed Account"}</p>
            <p className="text-sm text-gray-600">
              {account.type} &mdash; {account.subtype}
            </p>
            <p className="text-sm text-gray-400">Mask: ****{account.mask}</p>
            <p className="font-semibold text-green-600 mt-2 text-lg">
              {formatCurrency(account.current_balance) ?? "0.00"}
            </p>
            <p className="text-xs text-gray-600">
              Available: {formatCurrency(account.available_balance) ?? "0.00"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedItemAccounts;
