import RecurringHeader from "@/app/Components/Recurring/RecurringHeader";
import RecurringPaymentList from "@/app/Components/Recurring/RecurringTransactionsList";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import {
  getUserRecurringTransactionsWAccount,
} from "@/app/Utils/Actions.ts/recurring";
import {
  mapToClientRecurringWAccount,
} from "@/app/Utils/Transform/recurring";
import { redirect } from "next/navigation";

const BudgetsPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;

  const dbRecurring = (await getUserRecurringTransactionsWAccount(userId)).data;

  const recurringTransactions = dbRecurring!.map((recurring) =>
    mapToClientRecurringWAccount(recurring)
  );

  return (
    <div className="flex flex-col gap-5">
      <RecurringHeader />

      <RecurringPaymentList recurringTransactions={recurringTransactions} />
    </div>
  );
};

export default BudgetsPage;
