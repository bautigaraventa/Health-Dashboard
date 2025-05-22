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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartTitleWithTooltip } from "./ChartTitleWithTooltip";
import { QAEvaluationDataPoint } from "@/types";

interface QAEvaluationRateChartProps {
  data: QAEvaluationDataPoint[];
}

export function QAEvaluationRateChart({ data }: QAEvaluationRateChartProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <ChartTitleWithTooltip
            title="QA Evaluation Rate Over Time"
            description="Shows how many calls were evaluated per day. Helps assess consistency and throughput of the QA team."
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
      </CardContent>
    </Card>
  );
}
