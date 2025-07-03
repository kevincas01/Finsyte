import { formatCurrency } from "@/app/Utils/format";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
interface DebtCardProps {
  totalDebt: number;
  accountsLength: number;
}
const DebtCard = ({ totalDebt, accountsLength }: DebtCardProps) => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-red-500 text-white p-2 rounded-md">
          <TrendingDownOutlinedIcon />
        </div>
        {/* <p className="text-red-600 text-sm"> -$1,244</p> */}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Total Debt</h3>
        <p className="font-bold text-2xl">{formatCurrency(totalDebt, 2)}</p>
        <p className="text-gray-400 text-xs mt-1">
          Across {accountsLength} account{accountsLength > 1 && "s"}
        </p>
      </div>
    </div>
  );
};

export default DebtCard;
