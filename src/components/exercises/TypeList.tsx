
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Dumbbell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExerciseType } from "@/types/exercise";

interface TypeListProps {
  types: ExerciseType[];
  selectedType: ExerciseType;
  onTypeSelect: (type: ExerciseType) => void;
  onAddType: () => void;
  onEditType: (type: string) => void;
  onDeleteType: (type: string) => void;
}

export function TypeList({
  types,
  selectedType,
  onTypeSelect,
  onAddType,
  onEditType,
  onDeleteType
}: TypeListProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">انواع حرکت</h3>
        </div>
        <Button onClick={onAddType} className="bg-blue-600 hover:bg-blue-700" size="sm">
          <Plus className="w-4 h-4 ml-1" />
          افزودن نوع حرکت
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {types.map(type => (
          <div key={type} className="flex items-center gap-2 group relative">
            <Button
              onClick={() => onTypeSelect(type)}
              variant={selectedType === type ? "default" : "outline"}
              className={cn(
                "min-w-max transition-all duration-300",
                selectedType === type 
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105" 
                  : "hover:scale-105"
              )}
            >
              {type}
            </Button>
            <div className="absolute right-full mr-2 hidden group-hover:flex gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1 animate-fade-in">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditType(type);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteType(type);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
