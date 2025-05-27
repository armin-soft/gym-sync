
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Pill, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoryCardProps {
  category: { id: string | number; name: string; type: 'supplement' | 'vitamin' };
  isSelected: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onClick,
  onEdit,
  onDelete,
  count
}) => {
  const Icon = category.type === 'supplement' ? Pill : ShieldCheck;
  const isAllCategory = category.id === 'all';

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 border p-3 text-center hover:shadow-md",
        isSelected 
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md" 
          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2">
        <div className={cn(
          "p-2 rounded-full",
          isSelected 
            ? "bg-indigo-100 dark:bg-indigo-800/50" 
            : "bg-gray-100 dark:bg-gray-800"
        )}>
          <Icon className={cn(
            "h-4 w-4",
            isSelected 
              ? "text-indigo-600 dark:text-indigo-400" 
              : "text-gray-600 dark:text-gray-400"
          )} />
        </div>
        
        <div>
          <h4 className="text-xs font-medium line-clamp-2 min-h-[2rem] flex items-center justify-center">
            {category.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {toPersianNumbers(count)} مورد
          </p>
        </div>

        {!isAllCategory && (onEdit || onDelete) && (
          <div className="flex gap-1 mt-2">
            {onEdit && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
