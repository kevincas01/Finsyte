import { formatCurrency } from "@/app/Utils/format";

interface BudgetOverviewProps {
 
  totalBudgetAmount: number;
  totalSavedAmount: number;
}

const BudgetOverview = ({
  totalBudgetAmount,
  totalSavedAmount,
}: BudgetOverviewProps) => {
  const progress =
    totalBudgetAmount > 0
      ? ((totalSavedAmount / totalBudgetAmount) * 100).toFixed(0)
      : "0";

  return (
    <div className="border border-gray-200 rounded-md bg-white p-5">
      <h2 className="font-semibold">Goals BudgetOverview</h2>

      <div className="grid grid-cols-3 gap-5 mt-5">
        
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Budget</p>
          <p className="font-bold text-xl">
            {formatCurrency(totalBudgetAmount)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Spent</p>
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

export default BudgetOverview;
