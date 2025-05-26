import { Button } from "@/components/ui";

interface ClearFiltersButtonProps {
  onClearFilters: () => void;
}

export function ClearFiltersButton({
  onClearFilters,
}: ClearFiltersButtonProps) {
  return (
    <Button
      variant="outline"
      className="self-end h-10 cursor-pointer"
      onClick={onClearFilters}
    >
      Clear Filters
    </Button>
  );
}
