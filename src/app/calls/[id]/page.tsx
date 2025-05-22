"use client";

import { notFound } from "next/navigation";
import callData from "@/mock/calls.json";
import { CallDetailView } from "@/components/CallDetailView";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CallDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const call = callData.find((c) => c.call_id === params.id);

  if (!call) {
    notFound();
  }

  return (
    <main className="p-2 md:p-6 space-y-6">
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/calls")}
          variant="outline"
          className="cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
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
            <span className="text-muted-foreground">
              Reviewed by {call.reviewer}
            </span>
          </div>
        )}
      </div>
      <CallDetailView call={call} />
    </main>
  );
}
