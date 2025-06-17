import BalancesCard from "@/app/Components/Dashboard/BalancesCard";
import BillsCard from "@/app/Components/Dashboard/BillsCard";
import DebtCard from "@/app/Components/Dashboard/DebtCard";
import ExpensesCard from "@/app/Components/Dashboard/ExpensesCard";
import RecentTransactionsCard from "@/app/Components/Dashboard/RecentTransactionsCard";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserInformation } from "@/app/Utils/Actions.ts/profiles";
import { redirect } from "next/navigation";
const DashboardPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const profileInfo = (await getUserInformation(userSession.id))?.data;

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {`Welcome ${
            profileInfo.first_name ? " " + profileInfo.first_name : ""
          }! Here's your financial overview.`}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <BalancesCard />
        <ExpensesCard />
        <DebtCard />
        <BillsCard />
      </div>

      <RecentTransactionsCard />
    </div>
  );
};

export default DashboardPage;
