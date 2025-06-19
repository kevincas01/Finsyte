"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlaidLink from "../Plaid/PlaidLink";
import NeutralButton from "../Buttons/NeutralButton";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
const AccountsHeader = ({ userId }: { userId: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h1 className="font-bold text-3xl">Connected Accounts</h1>
        <p className="text-gray-600 mt-1">
          Manage your connected financial institutions and accounts
        </p>
      </div>
      <div className="flex flex-row gap-3">
        <span>
          <NeutralButton onClick={() => {}}>
            <SyncOutlinedIcon />
            Sync All
          </NeutralButton>{" "}
        </span>
        <span>
          <PlaidLink userId={userId}>
            <AddOutlinedIcon />
            <p>Connect</p>
          </PlaidLink>
        </span>
      </div>
    </div>
  );
};

export default AccountsHeader;
