
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Heart, Save, X } from "lucide-react";
import { Supplement, SupplementCategory } from "@/types/supplement";

interface ModernSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Supplement, 'id'>) => void;
  defaultValues?: Supplement;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: "supplement" | "vitamin";
}

export const ModernSupplementDialog: React.FC<ModernSupplementDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
  type,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosage: "",
    timing: "",
    description: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name || "",
        category: defaultValues.category || "",
        dosage: defaultValues.dosage || "",
        timing: defaultValues.timing || "",
        description: defaultValues.description || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        dosage: "",
        timing: "",
        description: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              type === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              {type === 'supplement' ? (
                <Pill className="w-5 h-5 text-green-600" />
              ) : (
                <Heart className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                {mode === 'add' ? 'افزودن' : 'ویرایش'} {type === 'supplement' ? 'مکمل' : 'ویتامین'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                نام {type === 'supplement' ? 'مکمل' : 'ویتامین'}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={`نام ${type === 'supplement' ? 'مکمل' : 'ویتامین'}`}
                className="text-right"
                dir="rtl"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                دسته‌بندی
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="text-right" dir="rtl">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dosage */}
            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-sm font-medium">
                دوز مصرف
              </Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                placeholder="مثال: ۲ عدد در روز"
                className="text-right"
                dir="rtl"
              />
            </div>

            {/* Timing */}
            <div className="space-y-2">
              <Label htmlFor="timing" className="text-sm font-medium">
                زمان مصرف
              </Label>
              <Input
                id="timing"
                value={formData.timing}
                onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
                placeholder="مثال: صبح ناشتا"
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              توضیحات
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="توضیحات اضافی..."
              className="text-right min-h-[80px] resize-none"
              dir="rtl"
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
              className={`flex-1 ${
                type === 'supplement'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-purple-500 hover:bg-purple-600'
              } text-white`}
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
