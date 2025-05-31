import BalancesCard from "@/app/Components/Dashboard/BalancesCard";
import BillsCard from "@/app/Components/Dashboard/BillsCard";
import DebtCard from "@/app/Components/Dashboard/DebtCard";
import ExpensesCard from "@/app/Components/Dashboard/ExpensesCard";
const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your financial overview.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <BalancesCard />
        <ExpensesCard />
        <DebtCard />
        <BillsCard />
      </div>
    </div>
  );
};

export default DashboardPage;
