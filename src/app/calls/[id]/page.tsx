import { notFound } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  BackButton,
} from "@/components/ui";
import { getCallById } from "@/lib/utils";
import { CallDetail } from "@/components/calls";

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
                src={`${process.env.AVATAR_URL}${call.reviewer}`}
                alt={call.reviewer}
              />
              <AvatarFallback>{call.reviewer[0]}</AvatarFallback>
            </Avatar>
            <span>Reviewed by {call.reviewer}</span>
          </div>
        )}
      </div>
      <CallDetail call={call} />
    </main>
  );
}
