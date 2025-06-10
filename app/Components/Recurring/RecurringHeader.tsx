"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import { useState } from "react";
import RecurringModal from "../Modal/RecurringModal";
const RecurringHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <RecurringModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={(budget) => console.log(budget)}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Recurring Payments</h1>
          <p className="text-gray-600 mt-1">Manage your recurring bills</p>
        </div>
        <div className="flex flex-row gap-3">
          <GradientButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <AddOutlinedIcon />
            <p>Add Recurring Payment</p>
          </GradientButton>
        </div>
      </div>
    </>
  );
};

export default RecurringHeader;
