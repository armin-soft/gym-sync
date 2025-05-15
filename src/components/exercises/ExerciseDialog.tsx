
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpeechToText from "@/components/ui/speech-to-text";
import { OfflineSpeechInput } from "@/components/ui/offline-speech/OfflineSpeechInput";
import { useAutoSpeechMode } from "@/hooks/speech/useAutoSpeechMode";

interface Category {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  categoryId: number;
}

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: Category[];
  formData: { name: string; categoryId: number };
  onFormChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  isEditing?: boolean;
}

export function ExerciseDialog({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormChange,
  onSave,
  isEditing = false
}: ExerciseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { inputMode, setInputMode, isOffline } = useAutoSpeechMode();

  const handleInputChange = (name: string) => {
    onFormChange({ ...formData, name });
  };
  
  const handleCategoryChange = (categoryId: string) => {
    onFormChange({ ...formData, categoryId: parseInt(categoryId) });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving exercise:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "ویرایش حرکت" : "افزودن حرکت جدید"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex flex-col gap-3">
            {/* انتخاب نحوه ورود متن */}
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
                <div className="space-y-2">
                  <Label htmlFor="speech-input" className="text-right block">
                    نام حرکت (تشخیص گفتار آنلاین)
                  </Label>
                  <SpeechToText
                    onTranscriptChange={handleInputChange}
                    value={formData.name}
                    placeholder="برای شروع ضبط صدا، روی آیکون میکروفون کلیک کنید"
                    className="compact-speech"
                    multiLine={false}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="offline" className="mt-0">
                <div className="space-y-2">
                  <Label htmlFor="offline-speech-input" className="text-right block">
                    نام حرکت (تشخیص گفتار آفلاین)
                  </Label>
                  <OfflineSpeechInput 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="برای تشخیص گفتار آفلاین، ابتدا مدل را دانلود کنید"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="mt-0">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right block">
                    نام حرکت
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="نام حرکت را وارد کنید"
                    className="text-right"
                    dir="rtl"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-right block">
                دسته‌بندی
              </Label>
              <Select
                value={formData.categoryId.toString()}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category" className="text-right" dir="rtl">
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
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              انصراف
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.name.trim() || !formData.categoryId || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "در حال ذخیره..." : isEditing ? "ویرایش" : "افزودن"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
