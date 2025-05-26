import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

interface DateRangePickerProps {
  date: DateRange | undefined;
  setDate: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ date, setDate }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} –{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4 space-y-2">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />

        <div className="flex justify-end pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDate(undefined)}
            className="text-red-500 hover:text-red-700"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
