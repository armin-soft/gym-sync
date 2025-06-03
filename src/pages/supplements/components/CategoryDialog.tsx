
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, Save, X } from "lucide-react";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  mode: "add" | "edit";
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({
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
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {mode === "add" ? "افزودن" : "ویرایش"} دسته‌بندی
              </DialogTitle>
              <p className="text-gray-500">
                نام دسته‌بندی را وارد کنید
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-10 w-10 p-0 rounded-xl hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-sm font-semibold text-gray-700">
              نام دسته‌بندی
            </Label>
            <Input
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: پروتئین، ویتامین D، آمینو اسید"
              className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
              dir="rtl"
              required
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg rounded-xl"
            >
              <Save className="w-5 h-5 ml-2" />
              {mode === "add" ? "افزودن" : "ویرایش"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
