"use client";

import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import callData from "@/mock/calls.json";
import {
  ClearFiltersButton,
  DateRangePicker,
  FilterSelect,
} from "@/components";

interface DashboardHeaderProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedAgent?: string;
  onAgentChange: (agent?: string) => void;
  selectedCompany?: string;
  onCompanyChange: (company?: string) => void;
  onClearFilters: () => void;
}

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  selectedAgent,
  onAgentChange,
  selectedCompany,
  onCompanyChange,
  onClearFilters,
}: DashboardHeaderProps) {
  const { agents, companies } = useMemo(() => {
    const reviewers = new Set<string>();
    const orgs = new Set<string>();

    for (const call of callData) {
      if (call.assistant) reviewers.add(call.assistant);
      if (call.company) orgs.add(call.company);
    }

    return {
      agents: Array.from(reviewers),
      companies: Array.from(orgs),
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <FilterSelect
        id="agent"
        label="Agent"
        value={selectedAgent ?? "all"}
        placeholder="Select agent"
        options={agents}
        onChange={(value) => onAgentChange(value === "all" ? undefined : value)}
      />
      <FilterSelect
        id="company"
        label="Company"
        value={selectedCompany ?? "all"}
        placeholder="Select company"
        options={companies}
        onChange={(value) =>
          onCompanyChange(value === "all" ? undefined : value)
        }
      />
      <DateRangePicker date={dateRange} setDate={onDateRangeChange} />
      <ClearFiltersButton onClearFilters={onClearFilters} />
    </div>
  );
}
