import { columns } from "./columns";
import { DataTable, PageHeader } from "@/components";
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
