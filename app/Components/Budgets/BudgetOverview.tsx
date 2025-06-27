import { formatCurrency } from "@/app/Utils/format";
import ProgressBar from "../ProgressBar";
import { BudgetPeriodCategory } from "@/app/Types/budget";

interface BudgetOverviewProps {
  budgetPeriod: BudgetPeriodCategory;
  totalBudgetAmount: number;
  totalSavedAmount: number;
}

const BudgetOverview = ({
  budgetPeriod,
  totalBudgetAmount,
  totalSavedAmount,
}: BudgetOverviewProps) => {
  const progress =
    totalBudgetAmount > 0 ? (totalSavedAmount / totalBudgetAmount) * 100 : 0;

  const now = new Date();
  let title = "";

  switch (budgetPeriod) {
    case "Monthly":
      title = `${now.toLocaleString("default", {
        month: "long",
      })} ${now.getFullYear()} Overview`;
      break;
    case "Quarterly":
      const month = now.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      title = `Q${quarter} ${now.getFullYear()} Overview`;
      break;
    case "Yearly":
      title = `${now.getFullYear()} Overview`;
      break;
    default:
      title = "Budget Overview";
  }

  return (
    <div className="border border-gray-200 rounded-md bg-white p-5">
      <h2 className="font-semibold">{title}</h2>

      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">Total Budgeted</p>
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
          <p className="text-sm text-gray-600">Remaining</p>
          <p className="font-bold text-xl text-primaryBlue">
            {formatCurrency(totalBudgetAmount - totalSavedAmount)}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2  mt-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-gray-600">Overall Progress</p>
          <p className="text-sm text-gray-600">{progress.toFixed(0)}%</p>
        </div>
        <ProgressBar percentage={progress} mode="budget" />
      </div>
    </div>
  );
};

export default BudgetOverview;
