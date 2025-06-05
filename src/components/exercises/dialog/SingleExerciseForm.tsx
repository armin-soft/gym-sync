
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExerciseCategory } from "@/types/exercise";
import { SimpleSpeechInput } from "@/components/ui/simple-speech-input";
import { InputTypeSelector } from "./InputTypeSelector";
import { motion, AnimatePresence } from "framer-motion";

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
  const [inputType, setInputType] = useState<"speech" | "manual">("manual");

  return (
    <div className="space-y-6 text-right">
      <InputTypeSelector 
        selectedInputType={inputType}
        onInputTypeChange={setInputType}
      />
      
      <div>
        <Label className="text-base mb-3 block">نام حرکت</Label>
        
        <AnimatePresence mode="wait">
          {inputType === "speech" ? (
            <motion.div
              key="speech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SimpleSpeechInput 
                value={value}
                onChange={onChange}
                placeholder="روی میکروفون کلیک کنید و نام حرکت را بگویید..."
                className="text-right"
              />
            </motion.div>
          ) : (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="نام حرکت را تایپ کنید..."
                className="text-right"
                dir="rtl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div>
        <Label className="text-base mb-3 block">دسته‌بندی تمرین</Label>
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
