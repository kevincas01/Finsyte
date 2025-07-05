"use client";
import { TransactionCategoryHexColors } from "@/app/Constants/transactions";
import { PieChart, Pie, Cell } from "recharts";

interface RadialProgressProps {
  chartData: { name: string; value: number }[];
  size?: number;
  strokeWidth?: number;
}

const RadialProgress = ({
  chartData,
  size = 150,
  strokeWidth = 12,
}: RadialProgressProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        <PieChart width={size + 200} height={size + 200}>
          <Pie
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={size / 1.5 - strokeWidth}
            outerRadius={size / 1.5}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={TransactionCategoryHexColors[entry.name] || "#d1d5db"}
              />
            ))}
          </Pie>
        </PieChart>
        <span className="absolute text-sm text-gray-700 font-medium">
          Expenses
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mx-auto px-6">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm"
              style={{
                backgroundColor:
                  TransactionCategoryHexColors[entry.name] || "#d1d5db",
              }}
            />
            <span className="text-sm text-gray-600 truncate font-medium">
              {entry.name} - ${entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadialProgress;
