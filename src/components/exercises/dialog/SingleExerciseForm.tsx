
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAutoSpeechMode } from "@/hooks/speech/useAutoSpeechMode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { OfflineSpeechInput } from "@/components/ui/offline-speech/OfflineSpeechInput";
import SpeechToText from "@/components/ui/speech-to-text";

interface ExerciseCategory {
  id: number;
  name: string;
}

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
  const { inputMode, setInputMode, isOffline } = useAutoSpeechMode();

  return (
    <div className="space-y-4 text-right">
      <div className="space-y-3">
        <Label className="text-base mb-2 block">نام حرکت</Label>
        
        {/* انتخاب نحوه ورود متن با تشخیص خودکار حالت آنلاین/آفلاین */}
        <Tabs 
          value={inputMode} 
          onValueChange={(value) => setInputMode(value as 'speech' | 'offline' | 'text')}
          className="w-full"
        >
          <div className="flex items-center justify-center mb-3">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="speech" disabled={isOffline}>
                {isOffline ? "آفلاین هستید" : "تشخیص آنلاین"}
              </TabsTrigger>
              <TabsTrigger value="offline">تشخیص آفلاین</TabsTrigger>
              <TabsTrigger value="text">متن</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="speech" className="mt-0">
            <SpeechToText
              onTranscriptChange={onChange}
              value={value}
              placeholder="برای شروع ضبط صدا، روی آیکون میکروفون کلیک کنید"
              className="compact-speech"
              multiLine={false}
            />
          </TabsContent>
          
          <TabsContent value="offline" className="mt-0">
            <OfflineSpeechInput 
              value={value}
              onChange={onChange}
              placeholder="برای تشخیص گفتار آفلاین، ابتدا مدل را دانلود کنید"
            />
          </TabsContent>
          
          <TabsContent value="text" className="mt-0">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="نام حرکت را وارد کنید"
              className="text-right"
              dir="rtl"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <Label className="text-base mb-2 block">دسته‌بندی تمرین</Label>
        <Select
          value={categoryId.toString()}
          onValueChange={(value) => onCategoryChange(Number(value))}
        >
          <SelectTrigger className="text-right" dir="rtl">
            <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id.toString()}
                className="text-right"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SingleExerciseForm;
