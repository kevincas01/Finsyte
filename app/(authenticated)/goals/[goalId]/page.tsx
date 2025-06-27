import GoalProgress from "@/app/Components/Goals/GoalProgress";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getGoalInfoWithGoalId } from "@/app/Utils/Actions.ts/goals";
import { mapToClientGoal } from "@/app/Utils/Transform/goals";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    goalId: string;
  }>;
}

export default async function GoalPage({ params }: Props) {
  const userSession = (await getUser()).data.user;
  if (!userSession) redirect("/");

  const userId = userSession.id;
  const goalId = (await params).goalId;

  const userGoal = (await getGoalInfoWithGoalId(userId, goalId))?.data;
  const goal = mapToClientGoal(userGoal!);

  if (!goal) redirect("/dashboard");

  // const dbTransactions = (
  //   await getUserTransactionsWithBudgetId(userId, accountId)
  // ).data;
  // const transactions = dbTransactions!.map((transaction) =>
  //   mapToClientTransaction(transaction)
  // );

  return (
    <div className=" max-h-[calc(100vh-40px)] flex flex-col gap-5 box-border flex-1">
      <div className="text-center">
        <h1 className="font-bold text-3xl ">Budget Progress</h1>
        <p className="text-gray-600 mt-1">
          Track your spending for {goal.title}
        </p>
      </div>
      <GoalProgress goal={goal} transactions={[]} />{" "}
    </div>
  );
}
