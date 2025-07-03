import AccountDetails from "@/app/Components/Accounts/Single Account Page/AccountDetails";
import { getAccountInfoWithAccountId } from "@/app/Utils/Actions.ts/accounts";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserTransactionsWithAccountId } from "@/app/Utils/Actions.ts/transactions";
import { mapToClientTransaction } from "@/app/Utils/Transform/transactions";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    accountId: string;
  }>;
}

export default async function AccountPage({ params }: Props) {
  const userSession = (await getUser()).data.user;
  if (!userSession) redirect("/");

  const userId = userSession.id;
  const accountId = (await params).accountId;

  const account = (await getAccountInfoWithAccountId(userId, accountId))?.data;
  if (!account) redirect("/dashboard");

  const dbTransactions = (
    await getUserTransactionsWithAccountId(userId, accountId)
  ).data;
  const transactions = dbTransactions!.map((transaction) =>
    mapToClientTransaction(transaction)
  );

  return (
    <div className=" max-h-[calc(100vh-40px)] flex flex-col gap-5 box-border flex-1">
      <AccountDetails account={account} transactions={transactions} />
    </div>
  );
}
