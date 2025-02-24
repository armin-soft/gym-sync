
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Exercise } from "@/types/exercise";

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  formData: { name: string; category: Exercise["category"] };
  onFormDataChange: (data: { name: string; category: Exercise["category"] }) => void;
  onSave: () => void;
}

export function ExerciseDialog({
  isOpen,
  onOpenChange,
  selectedExercise,
  formData,
  onFormDataChange,
  onSave,
}: ExerciseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {selectedExercise ? "ویرایش حرکت" : "افزودن حرکت جدید"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نوع حرکت</Label>
            <select
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-shadow"
              value={formData.category}
              onChange={(e) => onFormDataChange({ ...formData, category: e.target.value as Exercise["category"] })}
            >
              <option value="دلتوئید خلفی">دلتوئید خلفی</option>
              <option value="دلتوئید جلویی">دلتوئید جلویی</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-base">نام حرکت</Label>
            <Input
              value={formData.name}
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
              placeholder="نام حرکت را وارد کنید"
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
