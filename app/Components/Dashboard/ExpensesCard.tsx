import { formatCurrency } from "@/app/Utils/format";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
interface ExpensesCardProps {
  expensesTotal: number;
  topExpense: { category: string; amount: number };
}
const ExpensesCard = ({ expensesTotal, topExpense }: ExpensesCardProps) => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-yellow-500 text-white p-2 rounded-md">
          <ReceiptOutlinedIcon />
        </div>
        {/* <p className="text-green-600 text-sm"> +$244</p> */}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Monthly Expenses</h3>
        <p className="font-bold text-2xl">{formatCurrency(expensesTotal)}</p>
        <p className="text-gray-400 text-xs mt-1">
          Top: {topExpense.category} ({formatCurrency(topExpense.amount)})
        </p>
      </div>
    </div>
  );
};

export default ExpensesCard;
