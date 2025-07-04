"use client";
import { TransactionCategoryHexColors } from "@/app/Constants/transactions";
import { PieChart, Pie, Cell, Label } from "recharts";

interface RadialProgressProps {
  chartData: { name: string; value: number }[];
  size?: number;
  strokeWidth?: number;
}

const RadialProgress = ({
  chartData,
  size = 120,
  strokeWidth = 12,
}: RadialProgressProps) => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <PieChart width={size + 200} height={size + 200}>
        <Pie
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius={size / 2 - strokeWidth}
          outerRadius={size / 2}
          paddingAngle={2}
          dataKey="value"
          label={({ name, value, percent }) => {
            const percentValue = (percent! * 100).toFixed(0);
            return `${name}: ${percentValue}%`;
          }}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                TransactionCategoryHexColors[entry.name] || "#d1d5db" // fallback gray
              }
            />
          ))}
        </Pie>
      </PieChart>
      <span className="absolute text-xs text-gray-600 text-center">
        Expenses
      </span>
    </div>
  );
};

export default RadialProgress;
