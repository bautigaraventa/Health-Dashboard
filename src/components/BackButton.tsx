"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function BackButton({ url }: { url: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(url)}
      variant="outline"
      className="cursor-pointer"
    >
      <ArrowLeftIcon className="h-5 w-5" />
    </Button>
  );
}
