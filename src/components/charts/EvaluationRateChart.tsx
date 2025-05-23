"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { EvaluationDataPoint } from "@/types";
import { NoData } from "@/components";

interface EvaluationRateChartProps {
  data: EvaluationDataPoint[];
}

export function EvaluationRateChart({ data }: EvaluationRateChartProps) {
  const agentKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key === "rate") : [];

  return (
    <ChartCard
      title="Evaluation Rate"
      description="Shows the percentage of calls that have been reviewed by a QA agent. Useful to track QA coverage over time."
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            {agentKeys.map((agent) => (
              <Line
                key={agent}
                type="monotone"
                dataKey={agent}
                stroke="#3b82f6"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <NoData />
      )}
    </ChartCard>
  );
}
