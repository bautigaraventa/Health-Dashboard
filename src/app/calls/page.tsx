import { getCalls } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable, PageHeader } from "@/components/ui";

export default async function CallsPage() {
  const calls = await getCalls();

  return (
    <main className="flex flex-col gap-4 justify-between mb-6">
      <PageHeader title="Calls" subtitle="Find any call in a few seconds" />
      <DataTable columns={columns} data={calls} />
    </main>
  );
}
