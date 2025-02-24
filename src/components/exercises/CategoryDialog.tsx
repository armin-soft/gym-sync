
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExerciseType } from "@/types/exercise";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseTypes: ExerciseType[];
  selectedType: ExerciseType;
  formData: { name: string };
  onFormDataChange: (data: { name: string }) => void;
  onTypeChange: (type: ExerciseType) => void;
  onSave: () => void;
}

export function CategoryDialog({
  isOpen,
  onOpenChange,
  exerciseTypes = [],
  selectedType,
  formData,
  onFormDataChange,
  onTypeChange,
  onSave,
}: CategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            افزودن دسته‌بندی جدید
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نوع حرکت</Label>
            <Select 
              value={selectedType} 
              onValueChange={onTypeChange}
            >
              <SelectTrigger className="h-11 text-base focus-visible:ring-blue-400">
                <SelectValue placeholder="نوع حرکت را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {exerciseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base">نام دسته‌بندی</Label>
            <Input
              value={formData.name}
              onChange={(e) => onFormDataChange({ name: e.target.value })}
              placeholder="نام دسته‌بندی را وارد کنید"
              className="h-11 text-base focus-visible:ring-blue-400"
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
            onClick={onSave}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
