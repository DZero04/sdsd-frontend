import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fallbackData = {
  2022: [
    { month: "Jan", cases: 10 },
    { month: "Feb", cases: 15 },
    { month: "Mar", cases: 20 },
    { month: "Apr", cases: 25 },
    { month: "May", cases: 22 },
    { month: "Jun", cases: 30 },
    { month: "Jul", cases: 18 },
    { month: "Aug", cases: 28 },
  ],
  2023: [
    { month: "Jan", cases: 12 },
    { month: "Feb", cases: 18 },
    { month: "Mar", cases: 25 },
    { month: "Apr", cases: 30 },
    { month: "May", cases: 28 },
    { month: "Jun", cases: 35 },
    { month: "Jul", cases: 20 },
    { month: "Aug", cases: 32 },
  ],
};

const AreaLineChart = () => {
  // State to manage selected year (default to 2022)
  const [selectedYear, setSelectedYear] = useState("2022");

  // Handle year dropdown change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="line-chart">
      <div
        className="line-chart-info"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h4 className="line-chart-title">Diabetic Cases Over Time</h4>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="year-dropdown"
        >
          {Object.keys(fallbackData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={fallbackData[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaLineChart;
