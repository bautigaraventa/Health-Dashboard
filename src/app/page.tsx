"use client";

import { useState, useMemo } from "react";
import { DashboardHeader, PageHeader } from "@/components";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { DateRange } from "react-day-picker";
import callsMock from "@/mock/calls.json";

import {
  CallDurationBarChart,
  CallOutcomesPieChart,
  EvaluationRateChart,
  QAEvaluationRateChart,
} from "@/components/charts";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { Call } from "@/types";

export default function Home() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedAgent, setSelectedAgent] = useState<string | undefined>();
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();

  const filteredCalls = useMemo(() => {
    return callsMock.filter((call) => {
      const callDate = new Date(call.call_start_time);
      const inDateRange =
        (!dateRange?.from || callDate >= dateRange.from) &&
        (!dateRange?.to || callDate <= dateRange.to);

      const matchesAgent = !selectedAgent || call.assistant === selectedAgent;
      const matchesCompany =
        !selectedCompany || call.company === selectedCompany;

      return inDateRange && matchesAgent && matchesCompany;
    });
  }, [callsMock, dateRange, selectedAgent, selectedCompany]);

  const handleClearFilters = () => {
    setDateRange(undefined);
    setSelectedAgent(undefined);
    setSelectedCompany(undefined);
  };

  const metrics = useDashboardMetrics(filteredCalls as Call[]);

  return (
    <main className="flex flex-col gap-4 justify-between mb-6">
      <PageHeader
        title="Performance Dashboard"
        subtitle="Track call quality and agent performance"
      />
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedAgent={selectedAgent}
        onAgentChange={setSelectedAgent}
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
        onClearFilters={handleClearFilters}
      />
      <KpiCards calls={filteredCalls as Call[]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EvaluationRateChart data={metrics.evaluationRateOverTime} />
        <CallOutcomesPieChart data={metrics.callOutcomes} />
        <CallDurationBarChart data={metrics.callDurationOverTime} />
        <QAEvaluationRateChart data={metrics.qaEvaluationsOverTime} />
      </div>
    </main>
  );
}
