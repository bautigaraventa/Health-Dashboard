import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  title: string;
  description: string;
}

export function ChartTitleWithTooltip({ title, description }: Props) {
  return (
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
  );
}
