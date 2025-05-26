import { ReactNode } from "react";

interface DetailCardProps {
  label?: string;
  value: ReactNode;
}

export function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div className="rounded-lg border p-4 space-y-1">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
