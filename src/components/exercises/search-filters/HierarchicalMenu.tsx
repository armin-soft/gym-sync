
import React, { useState } from "react";
import { Menu, Plus } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع تمرین";
  };
  
  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = filteredCategories.find(cat => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  return (
    <Card className="p-2 flex-1 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Menu className="text-muted-foreground h-4 w-4" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">مسیر انتخاب:</span>
          <span className="font-medium">
            {selectedExerciseType ? (
              <>
                {getSelectedTypeName()} 
                {selectedCategoryId && (
                  <> <span className="text-muted-foreground mx-1">{'›'}</span> {getSelectedCategoryName()}</>
                )}
              </>
            ) : (
              "انتخاب نوع تمرین"
            )}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <TypeSelector 
          exerciseTypes={exerciseTypes}
          selectedType={selectedExerciseType}
          onSelectType={setSelectedExerciseType}
          onAddType={onAddType}
        />
        
        {selectedExerciseType && filteredCategories.length > 0 && (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-8 px-3 hover:bg-indigo-50 text-indigo-600 min-w-32"
                disabled={!selectedExerciseType}
              >
                {selectedCategoryId ? getSelectedCategoryName() : "انتخاب دسته‌بندی"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>انتخاب دسته‌بندی</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {filteredCategories.map(category => (
                <DropdownMenuItem 
                  key={category.id}
                  className={cn(selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
              
              {onAddCategory && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      onAddCategory();
                      setIsMenuOpen(false);
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
        )}
      </div>
    </Card>
  );
};
