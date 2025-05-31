import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const BalancesCard = () => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-green-500 text-white p-2 rounded-md">
          <AttachMoneyOutlinedIcon />
        </div>
        <p className="text-green-600 text-sm"> +$1,244</p>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
        <p className="font-bold text-2xl">$24,534</p>
        <p className="text-gray-400 text-xs mt-1">Across 3 accounts</p>
      </div>
    </div>
  );
};

export default BalancesCard;
