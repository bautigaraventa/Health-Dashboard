"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { CallDurationData } from "@/types";
import { ChartCard } from "./chart-card";
import { NoData } from "@/components/ui";

interface Props {
  data: CallDurationData[];
}

export function CallDurationBarChart({ data }: Props) {
  return (
    <ChartCard
      title="Call Duration"
      description="Shows how long calls lasted each day. Useful to spot patterns like unusually short or long calls."
    >
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <NoData />
      )}
    </ChartCard>
  );
}
