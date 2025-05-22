import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/PageHeader";
import callData from "@/mock/calls.json";

export default function CallsPage() {
  const data = callData;

  return (
    <main className="flex flex-col gap-4 justify-between mb-6">
      <PageHeader title="Calls" subtitle="Find any call in a few seconds" />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
