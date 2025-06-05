
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
          {filteredCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {filteredCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategoryId === category.id ? "default" : "outline"}
                  className={cn(
                    "text-sm h-8",
                    selectedCategoryId === category.id
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-white hover:bg-slate-100"
                  )}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </Button>
              ))}
              {onAddCategory && (
                <Button
                  variant="outline"
                  className="text-sm h-8 border-dashed border-muted-foreground/30"
                  onClick={onAddCategory}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  افزودن
                </Button>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center">
              هیچ دسته‌بندی برای این نوع تمرین یافت نشد
            </div>
          )}
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
