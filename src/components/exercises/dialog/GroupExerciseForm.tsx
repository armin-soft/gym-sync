
import React, { useState, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { SpeechToText } from "@/components/ui/speech-to-text";
import { Mic, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [showSpeech, setShowSpeech] = useState(false);
  
  // اضافه کردن قابلیت اینتر برای رفتن به خط بعدی در حالت متنی
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const textAfterCursor = value.substring(cursorPosition);
      
      const newValue = textBeforeCursor + "\n" + textAfterCursor;
      onChange(newValue);
      
      // تنظیم مجدد موقعیت مکان‌نما پس از اضافه کردن خط جدید
      setTimeout(() => {
        const textarea = e.currentTarget;
        textarea.selectionStart = cursorPosition + 1;
        textarea.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };
  
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
          <Mic className="h-3.5 w-3.5" />
          {showSpeech ? "حالت متنی" : "گفتار به نوشتار"}
        </Button>
        <Label className="text-base">نام حرکت‌ها (هر حرکت در یک خط)</Label>
      </div>
      
      {showSpeech ? (
        <SpeechToText
          value={value}
          onTranscriptChange={onChange}
          placeholder="برای افزودن حرکات با صدا، روی آیکون میکروفون کلیک کنید. برای افزودن حرکت جدید، کلید Enter را فشار دهید یا بگویید 'حرکت بعدی'"
          className="min-h-[250px]"
          multiLine={true} // حالت چند خطی برای گروهی
        />
      ) : (
        <>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <ArrowDown className="h-3.5 w-3.5 inline-block rotate-180" />
            <span>برای خط جدید از Ctrl+Enter استفاده کنید</span>
          </div>
          <Textarea
            value={value}
            placeholder="هر حرکت را در یک خط وارد کنید
مثال:
نشر از جلو دمبل
پرس سرشانه هالتر
نشر از جانب"
            className="min-h-[250px] focus-visible:ring-blue-400 text-right"
            onChange={(e) => onChange(e.target.value)}
            dir="rtl"
            onKeyDown={handleKeyDown}
          />
        </>
      )}
      
      {isSaving && (
        <div className="text-sm text-gray-600 text-right">
          در حال ذخیره حرکت {toPersianNumbers(currentSaveIndex + 1)} از {toPersianNumbers(totalToSave)}...
        </div>
      )}

      {skippedExercises.length > 0 && (
        <div className="mt-2 text-right">
          <div className="text-sm text-red-600 font-medium mb-2">
            حرکات زیر تکراری بوده و رد شدند:
          </div>
          <ul className="text-sm text-red-500 list-disc pr-5 text-right">
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
