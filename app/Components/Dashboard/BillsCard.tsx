import { formatCurrency } from "@/app/Utils/format";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
interface BillsCardProps {
  totalUpcomingBalance: number;
  upcomingBalanceLength: number;
}
const BillsCard = ({
  totalUpcomingBalance,
  upcomingBalanceLength,
}: BillsCardProps) => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-md">
          <EventNoteOutlinedIcon />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Upcoming Bills</h3>
        <p className="font-bold text-2xl">
          {formatCurrency(totalUpcomingBalance)}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          {upcomingBalanceLength} bill{upcomingBalanceLength > 1 && "s"} due
          this week
        </p>
      </div>
    </div>
  );
};

export default BillsCard;
