
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExerciseCategory } from "@/types/exercise";
import { AdvancedSpeechInput } from "@/pages/exercises/hierarchical-view/components/exercises-stage/advanced-speech-input";

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
    <div className="space-y-4 text-right">
      <div>
        <Label className="text-base mb-2 block">نام حرکت</Label>
        <AdvancedSpeechInput 
          value={value}
          onChange={onChange}
          placeholder="نام حرکت را وارد کنید"
        />
      </div>
      
      <div>
        <Label className="text-base mb-2 block">دسته‌بندی تمرین</Label>
        <select
          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow text-right"
          value={categoryId}
          onChange={(e) => onCategoryChange(Number(e.target.value))}
          dir="rtl"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SingleExerciseForm;
