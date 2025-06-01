
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, Save, X } from "lucide-react";

interface ModernCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  mode: "add" | "edit";
}

export const ModernCategoryDialog: React.FC<ModernCategoryDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValue,
  mode,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(defaultValue || "");
  }, [defaultValue, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Folder className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                {mode === 'add' ? 'افزودن' : 'ویرایش'} دسته‌بندی
              </DialogTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-sm font-medium">
              نام دسته‌بندی
            </Label>
            <Input
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: پروتئین، ویتامین، آمینو اسید"
              className="text-right"
              dir="rtl"
              required
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Save className="w-4 h-4 ml-2" />
              {mode === 'add' ? 'افزودن' : 'ویرایش'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
