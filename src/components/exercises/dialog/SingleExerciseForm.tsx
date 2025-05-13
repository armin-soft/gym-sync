
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExerciseCategory } from "@/types/exercise";
import { SpeechToText } from "@/components/ui/speech-to-text";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showSpeech, setShowSpeech] = useState(false);

  return (
    <div className="space-y-2 text-right">
      <div className="flex justify-between items-center">
        <Button
          type="button"
          size="sm" 
          variant={showSpeech ? "default" : "ghost"}
          onClick={() => setShowSpeech(!showSpeech)}
          className={`text-xs h-8 flex items-center gap-1.5 ${showSpeech ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
        >
          <Mic className="h-3.5 w-3.5 ml-1.5" />
          {showSpeech ? "حالت متنی" : "گفتار به نوشتار"}
        </Button>
        <Label className="text-base">نام حرکت</Label>
      </div>
      
      {showSpeech ? (
        <SpeechToText
          value={value}
          onTranscriptChange={onChange}
          placeholder="برای افزودن حرکت با صدا، روی آیکون میکروفون کلیک کنید"
          multiLine={false} // حالت تکی - فقط یک خط
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="نام حرکت را وارد کنید"
          className="h-11 text-base focus-visible:ring-blue-400 text-right"
          dir="rtl"
        />
      )}
      
      <Label className="text-base">دسته‌بندی تمرین</Label>
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
  );
};

export default SingleExerciseForm;
