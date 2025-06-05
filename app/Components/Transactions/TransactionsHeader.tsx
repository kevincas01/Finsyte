"use client";
import { useState } from "react";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import NeutralButton from "@/app/Components/Buttons/NeutralButton";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TransactionsModal from "@/app/Components/Modal/TransactionsModal";

const TransactionsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <TransactionsModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <div className="flex justify-between items-center">
        <div>
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
          <GradientButton onClick={() => setIsModalOpen(true)}>
            <AddOutlinedIcon />
            <p>Add Transaction</p>
          </GradientButton>
        </div>
      </div>
    </>
  );
};

export default TransactionsHeader;
