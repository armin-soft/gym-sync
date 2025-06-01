
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-l from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Folder className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {mode === 'add' ? 'افزودن' : 'ویرایش'} دسته‌بندی
                </DialogTitle>
                <p className="text-white/80 mt-1">
                  نام دسته‌بندی را وارد کنید
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-lg font-medium text-gray-800">
              نام دسته‌بندی
            </Label>
            <Input
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: پروتئین، ویتامین، آمینو اسید"
              className="h-14 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl text-lg"
              dir="rtl"
              required
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl border-gray-300 hover:bg-gray-50"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <Save className="w-5 h-5 ml-2" />
              {mode === 'add' ? 'افزودن' : 'ویرایش'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
