"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartTitleWithTooltip } from "./ChartTitleWithTooltip";
import { OutcomeData } from "@/types";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface CallOutcomesPieChartProps {
  data: OutcomeData[];
  colors?: string[];
}

export function CallOutcomesPieChart({
  data,
  colors = COLORS,
}: CallOutcomesPieChartProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <ChartTitleWithTooltip
            title="Call Outcomes"
            description="Displays the reasons calls ended (e.g. customer ended, assistant forwarded). Helps analyze call flow and drop-offs."
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
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
      </CardContent>
    </Card>
  );
}
