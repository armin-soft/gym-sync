
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Plus, 
  ArrowUpDown, 
  Filter, 
  LayoutGrid, 
  ListOrdered,
  Trash2 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExercisesTabHeaderProps {
  filteredCategories: ExerciseCategory[];
  categories: ExerciseCategory[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercisesCount: number;
  onAddExercise: () => void;
  onDeleteAll: () => void;
}

export const ExercisesTabHeader = ({
  filteredCategories,
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  sortOrder,
  toggleSortOrder,
  viewMode,
  setViewMode,
  filteredExercisesCount,
  onAddExercise,
  onDeleteAll
}: ExercisesTabHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-pink-500" />
          حرکات تمرینی
        </h3>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSortOrder}
            className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
          >
            <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>فیلتر دسته‌بندی</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setSelectedCategoryId(null)}
                className={!selectedCategoryId ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
              >
                همه دسته‌بندی‌ها
              </DropdownMenuItem>
              
              {filteredCategories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="hover:bg-indigo-50 text-indigo-600 transition-all duration-300"
          >
            {viewMode === "grid" ? (
              <ListOrdered className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>

          {filteredExercisesCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteAll}
              className="transition-all duration-300 hover:scale-105"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              حذف همه ({toPersianNumbers(filteredExercisesCount)})
            </Button>
          )}

          <Button
            onClick={onAddExercise}
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white shadow-indigo-200 shadow-lg transition-all duration-300 hover:scale-105"
            size="sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            افزودن حرکت
          </Button>
        </div>
      </div>

      {selectedCategoryId && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
            {categories.find(c => c.id === selectedCategoryId)?.name}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedCategoryId(null)}
            className="h-6 text-xs"
          >
            حذف فیلتر
          </Button>
        </div>
      )}
    </>
  );
};
