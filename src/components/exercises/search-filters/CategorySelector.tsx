
import React from "react";
import { Check, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExerciseCategory } from "@/types/exercise";

interface CategorySelectorProps {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  categories: ExerciseCategory[];
  isMobile: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
  isMobile
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Select
              value={selectedCategoryId?.toString() || "all-categories"}
              onValueChange={(value) =>
                setSelectedCategoryId(value === "all-categories" ? null : parseInt(value))
              }
              disabled={categories.length === 0}
            >
              <SelectTrigger
                className={cn(
                  "h-11 text-sm border rounded-xl transition-all duration-300",
                  selectedCategoryId 
                    ? "border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" 
                    : "bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50",
                  categories.length === 0 && "opacity-50 cursor-not-allowed",
                  isMobile ? "min-w-[110px]" : "min-w-[160px]"
                )}
              >
                <SelectValue placeholder="دسته‌بندی" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]" position="popper" side="bottom" sideOffset={5}>
                <SelectGroup>
                  <SelectLabel className="text-xs font-medium text-muted-foreground">دسته‌بندی</SelectLabel>
                  <SelectItem value="all-categories" className="flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <span>همه دسته‌بندی‌ها</span>
                      {!selectedCategoryId && <Check className="h-4 w-4 opacity-70" />}
                    </div>
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()} className="flex items-center">
                      <div className="flex items-center justify-between w-full">
                        <span>{category.name}</span>
                        {selectedCategoryId === category.id && <Check className="h-4 w-4 opacity-70" />}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedCategoryId && (
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          انتخاب دسته‌بندی
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
