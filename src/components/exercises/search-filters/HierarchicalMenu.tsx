
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
          value={selectedExerciseType || "all-types"}
          onValueChange={(value) => setSelectedExerciseType(value === "all-types" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نوع تمرین" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">همه انواع</SelectItem>
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
          value={selectedCategoryId?.toString() || "all-categories"}
          onValueChange={(value) => setSelectedCategoryId(value === "all-categories" ? null : parseInt(value))}
          disabled={!selectedExerciseType}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">همه دسته‌ها</SelectItem>
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
