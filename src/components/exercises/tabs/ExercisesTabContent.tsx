
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Plus, 
  Search, 
  ArrowUpDown, 
  Filter, 
  LayoutGrid, 
  ListOrdered,
  Dumbbell,
  FolderTree 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ExerciseTableMain from "@/components/exercises/table/ExerciseTableMain";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface ExercisesTabContentProps {
  filteredCategories: ExerciseCategory[];
  categories: ExerciseCategory[];
  filteredExercises: Exercise[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onAddExercise: () => void;
  onEditExercise: (exercise: Exercise) => void;
  onDeleteExercises: (ids: number[]) => boolean;
  isAscending: boolean;
  onSort: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const ExercisesTabContent = ({
  filteredCategories,
  categories,
  filteredExercises,
  selectedCategoryId,
  setSelectedCategoryId,
  searchQuery,
  setSearchQuery,
  sortOrder,
  toggleSortOrder,
  viewMode,
  setViewMode,
  onAddExercise,
  onEditExercise,
  onDeleteExercises,
  isAscending,
  onSort
}: ExercisesTabContentProps) => {
  const { toast } = useToast();
  const hasCategories = filteredCategories.length > 0;

  const handleAddExercise = () => {
    if (filteredCategories.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید یک دسته بندی ایجاد کنید"
      });
      return;
    }
    onAddExercise();
  };

  if (!hasCategories) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
        <FolderTree className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
        <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی ایجاد نشده است</h3>
        <p className="text-muted-foreground text-sm mb-4">
          ابتدا باید دسته‌بندی‌های مورد نظر خود را ایجاد کنید.
        </p>
      </div>
    );
  }

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

          <Button
            onClick={handleAddExercise}
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500 text-white shadow-indigo-200 shadow-lg transition-all duration-300 hover:scale-105"
            size="sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            افزودن حرکت
          </Button>
        </div>
      </div>

      {/* جستجو و فیلتر */}
      <div className="flex flex-col xs:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی حرکت..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-3 pr-10"
          />
        </div>
        
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSearchQuery("")}
            className="text-xs"
          >
            پاک کردن
          </Button>
        )}
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

      <motion.div 
        className="flex-1 min-h-0 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {viewMode === "list" ? (
          <ExerciseTableMain
            exercises={filteredExercises}
            categories={categories}
            onAdd={handleAddExercise}
            onEdit={onEditExercise}
            onDelete={onDeleteExercises}
            onSort={onSort}
            isAscending={isAscending}
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <motion.div key={exercise.id} variants={itemVariants}>
                  <ExerciseCard 
                    exercise={exercise}
                    category={categories.find(cat => cat.id === exercise.categoryId)}
                    isSelected={false}
                    viewMode="grid"
                    onClick={() => onEditExercise(exercise)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {searchQuery ? "با معیارهای جستجوی فعلی حرکتی پیدا نشد." : "برای این دسته‌بندی هنوز حرکتی اضافه نشده است."}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    پاک کردن جستجو
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
