import { ReactNode } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={className ?? "w-full h-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label={`Info about ${title}`}
                  className="bg-transparent border-0 p-0 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-sm">
                {description}
              </TooltipContent>
            </Tooltip>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={contentClassName ?? "h-[320px]"}>
        {children}
      </CardContent>
    </Card>
  );
}
