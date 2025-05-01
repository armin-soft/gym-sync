
import React, { useState } from "react";
import { Menu } from "lucide-react";
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

interface HierarchicalMenuProps {
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
}

export const HierarchicalMenu: React.FC<HierarchicalMenuProps> = ({
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع حرکت";
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
              "انتخاب نوع حرکت"
            )}
          </span>
        </div>
      </div>
      
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-8 px-2 hover:bg-indigo-50 text-indigo-600"
          >
            {selectedExerciseType ? "تغییر" : "انتخاب"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>انتخاب نوع حرکت</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {exerciseTypes.map(type => (
            <DropdownMenuItem 
              key={type}
              className={cn(selectedExerciseType === type ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
              onClick={() => {
                setSelectedExerciseType(type);
                if (selectedExerciseType !== type) {
                  setSelectedCategoryId(null);
                }
              }}
            >
              {type}
            </DropdownMenuItem>
          ))}
          
          {selectedExerciseType && filteredCategories.length > 0 && (
            <>
              <DropdownMenuLabel className="mt-2">انتخاب دسته‌بندی</DropdownMenuLabel>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};
