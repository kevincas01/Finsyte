import { ClientGoal, DBGoal } from "@/app/Types/goals";

export const mapToClientGoal = (goal: DBGoal): ClientGoal => {
  return {
    id: goal.id,
    currentAmount: goal.current_amount,
    targetAmount: goal.target_amount,
    deadlineDate: goal.deadline_date,
    description: goal.description || "",
    title: goal.title,
  };
};
