import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

const DebtCard = () => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-red-500 text-white p-2 rounded-md">
          <TrendingDownOutlinedIcon />
        </div>
        <p className="text-red-600 text-sm"> -$1,244</p>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Total Debt</h3>
        <p className="font-bold text-2xl">$3,456</p>
        <p className="text-gray-400 text-xs mt-1">Across 3 credit cards</p>
      </div>
    </div>
  );
};

export default DebtCard;
