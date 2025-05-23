import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton, CallDetailView } from "@/components";
import { getCallById } from "@/lib/utils";

export default async function CallDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const call = await getCallById(id);

  if (!call) {
    notFound();
  }

  return (
    <main className="p-2 md:p-6 space-y-6">
      <div className="flex gap-4">
        <BackButton url="/calls" />
        <h1 className="text-2xl font-bold">Call Details</h1>
        {call.reviewer && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${call.reviewer}`}
                alt={call.reviewer}
              />
              <AvatarFallback>{call.reviewer[0]}</AvatarFallback>
            </Avatar>
            <span>Reviewed by {call.reviewer}</span>
          </div>
        )}
      </div>
      <CallDetailView call={call} />
    </main>
  );
}
