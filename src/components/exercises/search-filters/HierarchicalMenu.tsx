
import React, { useState } from "react";
import { Menu, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypeSelector } from "./TypeSelector";

interface HierarchicalMenuProps {
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
  onAddType?: () => void;
  onAddCategory?: () => void;
}

export const HierarchicalMenu: React.FC<HierarchicalMenuProps> = ({
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  onAddType,
  onAddCategory
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع تمرین";
  };
  
  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = filteredCategories.find(cat => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">نوع تمرین</label>
        <TypeSelector 
          exerciseTypes={exerciseTypes}
          selectedType={selectedExerciseType}
          onSelectType={type => {
            setSelectedExerciseType(type);
            // Reset category when type changes
            setSelectedCategoryId(null);
          }}
          onAddType={onAddType}
        />
      </div>
      
      {selectedExerciseType && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">دسته‌بندی</label>
          <DropdownMenu open={isCategoryMenuOpen} onOpenChange={setIsCategoryMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-900"
                disabled={filteredCategories.length === 0}
              >
                <span>{getSelectedCategoryName()}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>انتخاب دسته‌بندی</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <DropdownMenuItem 
                    key={category.id}
                    className={cn(selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setIsCategoryMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="text-center py-2 px-2 text-sm text-muted-foreground">
                  هیچ دسته‌بندی یافت نشد
                </div>
              )}
              
              {onAddCategory && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      onAddCategory();
                      setIsCategoryMenuOpen(false);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن دسته‌بندی جدید
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <Menu className="h-3 w-3 ml-1" />
        <span>
          {selectedExerciseType && selectedCategoryId ? (
            `${getSelectedTypeName()} › ${getSelectedCategoryName()}`
          ) : selectedExerciseType ? (
            `${getSelectedTypeName()} › انتخاب دسته‌بندی`
          ) : (
            "لطفاً مسیر انتخاب را تکمیل کنید"
          )}
        </span>
      </div>
    </Card>
  );
};
