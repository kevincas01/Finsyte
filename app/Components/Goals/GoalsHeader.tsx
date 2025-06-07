"use client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GradientButton from "@/app/Components/Buttons/GradientButton";
import { useState } from "react";
import GoalsModal from "../Modal/GoalsModal";
const GoalsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <GoalsModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={(goal) => {
            console.log("New goal:", goal);
          }}
        />
      )}

      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Goals</h1>
          <p className="text-gray-600 mt-1">
            Track Progress towards your financial objectives.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <GradientButton onClick={() => {setIsModalOpen(true)}}>
            <AddOutlinedIcon />
            <p>Add Goal</p>
          </GradientButton>
        </div>
      </div>
    </>
  );
};

export default GoalsHeader;
