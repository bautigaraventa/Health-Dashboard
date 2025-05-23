"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { OutcomeData } from "@/types";
import { NoData } from "@/components";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6d6565",
  "#000000",
  "#a22525",
];

interface CallOutcomesPieChartProps {
  data: OutcomeData[];
  colors?: string[];
}

export function CallOutcomesPieChart({
  data,
  colors = COLORS,
}: CallOutcomesPieChartProps) {
  return (
    <ChartCard
      title="Call Outcomes"
      description="Displays the reasons calls ended (e.g. customer ended, agent forwarded). Helps analyze call flow and drop-offs."
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <NoData />
      )}
    </ChartCard>
  );
}
