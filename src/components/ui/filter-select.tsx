import {
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  includeAll?: boolean;
  className?: string;
}

export function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  includeAll = true,
  className,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(val) => onChange(val)}>
        <SelectTrigger className={`${className} w-[180px]`}>
          <SelectValue
            placeholder={placeholder || `All ${label.toLowerCase()}s`}
          />
        </SelectTrigger>
        <SelectContent>
          {includeAll && <SelectItem value="all">All</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
