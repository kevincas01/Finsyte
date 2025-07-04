import React from "react";
import RadialProgress from "../Charts/RadialProgressCategories";

interface MonthlyExpensesCardProps {
  chartData: {
    name: string;
    value: number;
  }[];
}
const MonthlyExpensesCard = ({ chartData }: MonthlyExpensesCardProps) => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <h4 className="text-xl font-semibold">Monthly Expenses by Category</h4>
      <RadialProgress chartData={chartData} />
    </div>
  );
};

export default MonthlyExpensesCard;
