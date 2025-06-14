import Overview from "@/app/Components/Goals/Overview";
import GoalCard from "@/app/Components/Goals/GoalCard";
import GoalsHeader from "@/app/Components/Goals/GoalsHeader";

export const mockGoals = [
  {
    title: "Emergency Fund",
    description: "6 months of living expenses",
    currentAmount: 3000,
    targetAmount: 6000,
    targetDate: "2025-12-31",
  },
  {
    title: "Vacation Fund",
    description: "Trip to Japan",
    currentAmount: 1000,
    targetAmount: 4000,
    targetDate: "2025-09-15",
  },
  {
    title: "New Laptop",
    description: "Upgrade to MacBook Pro",
    currentAmount: 500,
    targetAmount: 2000,
    targetDate: "2025-08-01",
  },
  {
    title: "Home Renovation",
    description: "Bathroom and kitchen upgrades",
    currentAmount: 12000,
    targetAmount: 15000,
    targetDate: "2026-03-01",
  },
];

const Goals = () => {
  const totalTargetAmount = mockGoals.reduce(
    (totalAmount, goal) => totalAmount + goal.targetAmount,
    0
  );

  const totalSavedAmount = mockGoals.reduce(
    (totalAmount, goal) => totalAmount + goal.currentAmount,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <GoalsHeader/>
      <Overview
        totalGoals={mockGoals.length}
        totalTargetAmount={totalTargetAmount}
        totalSavedAmount={totalSavedAmount}
      />
      <div className="grid grid-cols-2 gap-5">
        {mockGoals.map((goal) => (
          <GoalCard key={goal.title} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default Goals;
