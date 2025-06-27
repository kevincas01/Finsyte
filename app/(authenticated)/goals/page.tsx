import Overview from "@/app/Components/Goals/Overview";
import GoalCard from "@/app/Components/Goals/GoalCard";
import GoalsHeader from "@/app/Components/Goals/GoalsHeader";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { redirect } from "next/navigation";
import { getUserGoals } from "@/app/Utils/Actions.ts/goals";
import { mapToClientGoal } from "@/app/Utils/Transform/goals";
import GoalProgress from "@/app/Components/Goals/GoalProgress";

const GoalsPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const userId = userSession.id;
  const userGoals = (await getUserGoals(userId)).data;
  const goals = userGoals!.map((goals) => mapToClientGoal(goals));

  const totalTargetAmount = goals.reduce(
    (totalAmount, goal) => totalAmount + goal.targetAmount,
    0
  );

  const totalSavedAmount = goals.reduce(
    (totalAmount, goal) => totalAmount + goal.currentAmount,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <GoalsHeader/>

      <Overview
        totalGoals={goals.length}
        totalTargetAmount={totalTargetAmount}
        totalSavedAmount={totalSavedAmount}
      />
      <div className="grid grid-cols-2 gap-5">
        {goals.map((goal) => (
          <GoalCard key={goal.title} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;
