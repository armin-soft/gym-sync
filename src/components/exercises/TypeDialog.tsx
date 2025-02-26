
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

interface TypeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  typeName: string;
  onTypeNameChange: (name: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

export function TypeDialog({
  isOpen,
  onOpenChange,
  typeName,
  onTypeNameChange,
  onSave,
  isEditing
}: TypeDialogProps) {
  // اضافه کردن قابلیت Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen && typeName.trim()) {
        onSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, typeName, onSave]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isEditing ? "ویرایش نوع حرکت" : "افزودن نوع حرکت جدید"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نام نوع حرکت</Label>
            <Input
              value={typeName}
              onChange={(e) => onTypeNameChange(e.target.value)}
              placeholder="نام نوع حرکت را وارد کنید"
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
            onClick={onSave}
            disabled={!typeName.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all min-w-24"
          >
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
