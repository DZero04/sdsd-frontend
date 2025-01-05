// Updated AreaPieChart Component
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const fallbackData = [
  { gender: "Male", value: 51 },
  { gender: "Female", value: 36 },
  { gender: "Prefer not to say", value: 12 },
];

const COLORS = ["#3b6394", "#5da8e1", "#bdd4f0"];

const AreaPieChart = () => {
  return (
    <div className="pie-chart">
      <h4 className="pie-chart-title">Diabetic Cases by Gender</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={fallbackData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ gender, value }) => `${gender}: ${value}`}
            outerRadius={100}
            innerRadius={50}
            dataKey="value"
            nameKey="gender"
          >
            {fallbackData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaPieChart;