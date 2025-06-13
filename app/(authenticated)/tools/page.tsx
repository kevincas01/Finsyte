import BillSplitterTool from "@/app/Components/Tools/BillSplitterTool";
import React from "react";

const ToolsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Tools</h1>
          <p className="text-gray-600 mt-1">
            Helpful financial calculators and utilities
          </p>
        </div>
      </div>
      <BillSplitterTool />
    </div>
  );
};

export default ToolsPage;
