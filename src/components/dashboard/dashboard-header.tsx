"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import {
  ClearFiltersButton,
  DateRangePicker,
  FilterSelect,
} from "@/components/ui";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  agents: string[];
  companies: string[];
}

export function DashboardHeader({ agents, companies }: DashboardHeaderProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedAgent = searchParams.get("agent") ?? "all";
  const selectedCompany = searchParams.get("company") ?? "all";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const dateRange: DateRange | undefined = {
    from: from ? parse(from, "yyyy-MM-dd", new Date()) : undefined,
    to: to ? parse(to, "yyyy-MM-dd", new Date()) : undefined,
  };

  const updateQueryParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const onAgentChange = (value?: string) => {
    updateQueryParam("agent", value);
  };

  const onCompanyChange = (value?: string) => {
    updateQueryParam("company", value);
  };

  const onDateRangeChange = (range: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (range?.from) {
      params.set("from", format(range.from, "yyyy-MM-dd"));
    } else {
      params.delete("from");
    }

    if (range?.to) {
      params.set("to", format(range.to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const onClearFilters = () => {
    router.push("?");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-wrap gap-4 items-end">
        <FilterSelect
          id="company"
          label="Company"
          value={selectedCompany}
          placeholder="Select company"
          options={companies}
          onChange={(value) =>
            onCompanyChange(value === "all" ? undefined : value)
          }
        />

        <FilterSelect
          id="agent"
          label="Agent"
          value={selectedAgent}
          placeholder="Select agent"
          options={agents}
          onChange={(value) =>
            onAgentChange(value === "all" ? undefined : value)
          }
        />

        <DateRangePicker date={dateRange} setDate={onDateRangeChange} />

        <ClearFiltersButton onClearFilters={onClearFilters} />
      </div>
    </motion.div>
  );
}
