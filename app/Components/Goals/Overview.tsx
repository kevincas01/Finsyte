import { formatCurrency } from "@/app/Utils/format";

interface OverviewProps {
  totalGoals: number;
  totalTargetAmount: number;
  totalSavedAmount: number;
}

const Overview = ({
  totalGoals,
  totalTargetAmount,
  totalSavedAmount,
}: OverviewProps) => {
  const progress =
    totalTargetAmount > 0
      ? ((totalSavedAmount / totalTargetAmount) * 100).toFixed(0)
      : "0";

  return (
    <div className="border border-gray-200 rounded-md bg-white p-5">
      <h2 className="font-semibold">Goals Overview</h2>

      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Goals</p>
          <p className="font-bold text-xl">{totalGoals}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Target</p>
          <p className="font-bold text-xl">
            {formatCurrency(totalTargetAmount)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Saved</p>
          <p className="font-bold text-xl">
            {formatCurrency(totalSavedAmount)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Overall Progress</p>
          <p className="font-bold text-xl">{progress}%</p>
        </div>
      </div>
     
    </div>
  );
};

export default Overview;
