
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

interface StudentActionsProps {
  onAddStudent: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const StudentActions = ({
  onAddStudent,
  showFilters,
  onToggleFilters
}: StudentActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden"
        onClick={onToggleFilters}
      >
        <Filter className="h-4 w-4 mr-2" />
        فیلترها
      </Button>
      
      <Button
        onClick={onAddStudent}
        className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
      >
        <Plus className="h-4 w-4" />
        <span>افزودن شاگرد</span>
      </Button>
    </div>
  );
};
