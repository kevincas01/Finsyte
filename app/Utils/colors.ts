export const getGoalColor = (percentage: number): string => {
  if (percentage < 33) return "bg-red-500";
  if (percentage < 66) return "bg-yellow-500";
  return "bg-green-500";
};

export const getBudgetColor = (percentage: number): string => {
  if (percentage < 80) {
    return "bg-green-600";
  } else if (percentage >= 80 && percentage <= 100) {
    return "bg-yellow-600";
  } else {
    return "bg-red-600";
  }
};
