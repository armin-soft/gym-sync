
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface GroupExerciseFormProps {
  value: string;
  onChange: (value: string) => void;
  isSaving: boolean;
  currentSaveIndex: number;
  totalToSave: number;
  skippedExercises: string[];
}

export const GroupExerciseForm: React.FC<GroupExerciseFormProps> = ({
  value,
  onChange,
  isSaving,
  currentSaveIndex,
  totalToSave,
  skippedExercises,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-base">نام حرکت‌ها (هر حرکت در یک خط)</Label>
      <Textarea
        value={value}
        placeholder="هر حرکت را در یک خط وارد کنید
مثال:
نشر از جلو دمبل
پرس سرشانه هالتر
نشر از جانب"
        className="min-h-[150px] focus-visible:ring-blue-400"
        onChange={(e) => onChange(e.target.value)}
        dir="rtl"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
          }
        }}
      />
      
      {isSaving && (
        <div className="text-sm text-gray-600">
          در حال ذخیره حرکت {toPersianNumbers(currentSaveIndex + 1)} از {toPersianNumbers(totalToSave)}...
        </div>
      )}

      {skippedExercises.length > 0 && (
        <div className="mt-2">
          <div className="text-sm text-red-600 font-medium mb-2">
            حرکات زیر تکراری بوده و رد شدند:
          </div>
          <ul className="text-sm text-red-500 list-disc pr-5">
            {skippedExercises.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupExerciseForm;
