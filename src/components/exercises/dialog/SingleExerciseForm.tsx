
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExerciseCategory } from "@/types/exercise";

interface SingleExerciseFormProps {
  value: string;
  onChange: (value: string) => void;
  categories: ExerciseCategory[];
  categoryId: number;
  onCategoryChange: (id: number) => void;
}

export const SingleExerciseForm: React.FC<SingleExerciseFormProps> = ({
  value,
  onChange,
  categories,
  categoryId,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-base">نام حرکت</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="نام حرکت را وارد کنید"
        className="h-11 text-base focus-visible:ring-blue-400"
      />
      <Label className="text-base">دسته‌بندی تمرین</Label>
      <select
        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow"
        value={categoryId}
        onChange={(e) => onCategoryChange(Number(e.target.value))}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleExerciseForm;
