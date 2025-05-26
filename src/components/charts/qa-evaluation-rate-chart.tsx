"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartCard } from "./chart-card";
import { QAEvaluationDataPoint } from "@/types";
import { NoData } from "@/components/ui";

interface QAEvaluationRateChartProps {
  data: QAEvaluationDataPoint[];
}

export function QAEvaluationRateChart({ data }: QAEvaluationRateChartProps) {
  return (
    <ChartCard
      title="QA Evaluation Rate Over Time"
      description="Shows how many calls were evaluated per day. Helps assess consistency and throughput of the QA team."
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoData />
      )}
    </ChartCard>
  );
}
