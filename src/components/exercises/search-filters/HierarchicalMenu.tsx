
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HierarchicalMenuProps {
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  filteredCategories: any[];
}

export const HierarchicalMenu: React.FC<HierarchicalMenuProps> = ({
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
      <div>
        <Select
          value={selectedExerciseType || ""}
          onValueChange={(value) => setSelectedExerciseType(value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نوع تمرین" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">همه انواع</SelectItem>
            {exerciseTypes.map((type, index) => (
              <SelectItem key={index} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={selectedCategoryId?.toString() || ""}
          onValueChange={(value) => setSelectedCategoryId(value ? parseInt(value) : null)}
          disabled={!selectedExerciseType}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">همه دسته‌ها</SelectItem>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
