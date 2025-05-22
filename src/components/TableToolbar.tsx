"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components";
import React, { useEffect, useState } from "react";
import { ClearFiltersButton, FilterSelect } from "@/components";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}

export function TableToolbar<TData>({ table }: TableToolbarProps<TData>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState("all");
  const [selectedReviewer, setSelectedReviewer] = useState("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState("all");

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) {
      table.getColumn("call_start_time")?.setFilterValue(undefined);
      return;
    }

    table.getColumn("call_start_time")?.setFilterValue({
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    });
  }, [dateRange, table]);

  useEffect(() => {
    table.setGlobalFilter(search || undefined);
  }, [search, table]);

  const assistantOptions = Array.from(
    new Set(
      table
        .getPreFilteredRowModel()
        .rows.map((row) => row.original["assistant"])
    )
  );

  const reviewerOptions = Array.from(
    new Set(
      table.getPreFilteredRowModel().rows.map((row) => row.original["reviewer"])
    )
  );

  const onClearFilters = () => {
    setSearch("");
    setDateRange(undefined);
    setSelectedAssistant("all");
    setSelectedReviewer("all");
    setSelectedEvaluation("all");
    table.getColumn("assistant")?.setFilterValue(undefined);
    table.getColumn("reviewer")?.setFilterValue(undefined);
    table.getColumn("evaluation")?.setFilterValue(undefined);
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="search"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Search Calls
        </label>
        <Input
          id="search"
          placeholder="Call ID or Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <FilterSelect
        id="assistant"
        label="Assistant"
        value={selectedAssistant}
        options={assistantOptions}
        onChange={(value) => {
          setSelectedAssistant(value);
          table
            .getColumn("assistant")
            ?.setFilterValue(value === "all" ? undefined : value);
        }}
      />
      <FilterSelect
        id="reviewer"
        label="Reviewer"
        value={selectedReviewer}
        options={reviewerOptions}
        onChange={(value) => {
          setSelectedReviewer(value);
          table
            .getColumn("reviewer")
            ?.setFilterValue(value === "all" ? undefined : value);
        }}
      />
      <FilterSelect
        id="evaluation"
        label="Evaluation"
        value={selectedEvaluation}
        options={["true", "false"]}
        placeholder="All statuses"
        onChange={(value) => {
          setSelectedEvaluation(value);
          const column = table.getColumn("evaluation");
          if (!column) return;

          column.setFilterValue(value === "all" ? undefined : value === "true");
        }}
      />
      <DateRangePicker date={dateRange} setDate={setDateRange} />
      <ClearFiltersButton onClearFilters={onClearFilters} />
    </div>
  );
}
