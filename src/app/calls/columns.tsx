"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

export type Call = {
  call_id: string;
  agent: string;
  customer_phone_number: string;
  call_start_time: string;
  duration: number;
  reviewer: string;
  evaluation: boolean;
  qa_check: string;
};

export const columns: ColumnDef<Call>[] = [
  {
    accessorKey: "call_id",
    header: "Call ID",
    cell: ({ row }) => (
      <div className="truncate max-w-[100px]">{row.getValue("call_id")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="truncate max-w-[100px]">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => (
      <div className="truncate max-w-[100px]">{row.getValue("agent")}</div>
    ),
  },
  {
    accessorKey: "customer_phone_number",
    header: "Customer Phone",
  },
  {
    accessorKey: "call_start_time",
    header: "Start Time",
    cell: ({ row }) => {
      const value = row.getValue("call_start_time") as string;
      return format(new Date(value), "PPpp");
    },
    filterFn: (row, columnId, filterValue: { from: string; to: string }) => {
      const value = new Date(row.getValue(columnId));
      const from = new Date(filterValue.from);
      const to = new Date(filterValue.to);

      return value >= from && value <= to;
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Duration (s)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
  },
  {
    accessorKey: "evaluation",
    header: "Evaluation",
    cell: ({ row }) => (row.getValue("evaluation") ? "✅ Done" : "⏳ Pending"),
  },
  {
    accessorKey: "qa_check",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        QA Check
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    enableSorting: true,
  },
];
