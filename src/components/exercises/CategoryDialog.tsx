
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseTypes: string[];
  selectedType: string;
  formData: { name: string; type?: string };
  onFormDataChange: (data: { name: string; type: string }) => void;
  onTypeChange: (type: string) => void;
  onSave: (data?: { name: string; type: string }) => Promise<void> | void;
}

export function CategoryDialog({
  isOpen,
  onOpenChange,
  exerciseTypes,
  selectedType,
  formData,
  onFormDataChange,
  onTypeChange,
  onSave
}: CategoryDialogProps) {
  // اضافه کردن قابلیت Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen && formData.name.trim() && selectedType) {
        onSave({ name: formData.name, type: selectedType });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, formData.name, selectedType, onSave]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            افزودن دسته بندی جدید
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نوع حرکت</Label>
            <select
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              {exerciseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">نام دسته بندی</Label>
            <Input
              value={formData.name}
              onChange={(e) => onFormDataChange({ name: e.target.value, type: selectedType })}
              placeholder="نام دسته بندی را وارد کنید"
              className="h-11 text-base focus-visible:ring-blue-400"
              autoFocus
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/50 transition-colors"
          >
            انصراف
          </Button>
          <Button 
            onClick={() => onSave({ name: formData.name, type: selectedType })}
            disabled={!formData.name.trim() || !selectedType}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
