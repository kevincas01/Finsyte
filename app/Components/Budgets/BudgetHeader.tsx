"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import { useState } from "react";
import BudgetModal from "../Modal/BudgetModal";
const BudgetHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <BudgetModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Budgets</h1>
          <p className="text-gray-600 mt-1">
            Track your spending against your monthly budgets
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <GradientButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <AddOutlinedIcon />
            <p>Add Budget</p>
          </GradientButton>
        </div>
      </div>
    </>
  );
};

export default BudgetHeader;
