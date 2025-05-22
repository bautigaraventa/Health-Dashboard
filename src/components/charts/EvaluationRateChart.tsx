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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTitleWithTooltip } from "./ChartTitleWithTooltip";
import { EvaluationDataPoint } from "@/types";

interface EvaluationRateChartProps {
  data: EvaluationDataPoint[];
}

export function EvaluationRateChart({ data }: EvaluationRateChartProps) {
  const agentKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key === "rate") : [];

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <ChartTitleWithTooltip
            title="Evaluation Rate"
            description="Shows the percentage of calls that have been reviewed by a QA agent. Useful to track QA coverage over time."
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
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
                stroke={"#3b82f6"}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
