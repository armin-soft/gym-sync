
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    setFormData({
      name: "",
      category: "",
      dosage: "",
      timing: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden" dir="rtl">
        {/* Header */}
        <div className={`px-8 py-6 ${
          type === 'supplement' 
            ? 'bg-gradient-to-l from-green-500 to-emerald-600' 
            : 'bg-gradient-to-l from-purple-500 to-pink-600'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                {type === 'supplement' ? (
                  <Pill className="w-6 h-6" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {mode === 'add' ? 'افزودن' : 'ویرایش'} {type === 'supplement' ? 'مکمل' : 'ویتامین'}
                </DialogTitle>
                <p className="text-white/80 mt-1">
                  اطلاعات {type === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium text-gray-800">
                نام {type === 'supplement' ? 'مکمل' : 'ویتامین'}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={`نام ${type === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید`}
                className="h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                dir="rtl"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-lg font-medium text-gray-800">
                دسته‌بندی
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="h-12 text-right border-gray-300 focus:border-purple-500 rounded-xl" dir="rtl">
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
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
              <Label htmlFor="dosage" className="text-lg font-medium text-gray-800">
                دوز مصرف
              </Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                placeholder="مثال: ۲ عدد در روز"
                className="h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                dir="rtl"
              />
            </div>

            {/* Timing */}
            <div className="space-y-2">
              <Label htmlFor="timing" className="text-lg font-medium text-gray-800">
                زمان مصرف
              </Label>
              <Input
                id="timing"
                value={formData.timing}
                onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
                placeholder="مثال: صبح ناشتا"
                className="h-12 text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                dir="rtl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-medium text-gray-800">
              توضیحات
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="توضیحات اضافی در مورد این مکمل..."
              className="min-h-[100px] text-right border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl resize-none"
              dir="rtl"
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
              className={`flex-1 h-12 ${
                type === 'supplement'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
              } text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl`}
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
