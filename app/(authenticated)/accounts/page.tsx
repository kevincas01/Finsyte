import AccountsHeader from "@/app/Components/Accounts/AccountsHeader";
import ConnectedItemAccounts from "@/app/Components/Accounts/ConnectedItemAccounts";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getPlaidItemsWithAccounts } from "@/app/Utils/Actions.ts/items";
import { redirect } from "next/navigation";
import React from "react";

const AccountsPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;
  const itemsWithAccounts = await getPlaidItemsWithAccounts(userId);

  return (
    <div className="flex flex-col gap-5">
      <AccountsHeader userId={userId} />

      {itemsWithAccounts.data?.map((itemWithAccounts) => (
        <ConnectedItemAccounts
          key={itemWithAccounts.id}
          itemWithAccounts={itemWithAccounts}
        />
      ))}
    </div>
  );
};

export default AccountsPage;
