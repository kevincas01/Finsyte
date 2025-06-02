"use client";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import NeutralButton from "@/app/Components/Buttons/NeutralButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and manage your financial transactions
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <NeutralButton onClick={() => {}}>
            <FileDownloadOutlinedIcon />
            <p>Export</p>
          </NeutralButton>
          <GradientButton onClick={() => {}}>
            <AddOutlinedIcon />
            <p>Add Transaction</p>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
