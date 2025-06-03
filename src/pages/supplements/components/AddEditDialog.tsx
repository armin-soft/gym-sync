
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Heart, Save, X } from "lucide-react";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface AddEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Supplement, 'id'>) => void;
  defaultValues?: Supplement;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: "supplement" | "vitamin";
}

export const AddEditDialog: React.FC<AddEditDialogProps> = ({
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
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name || "",
        category: defaultValues.category || "",
        dosage: defaultValues.dosage || "",
        timing: defaultValues.timing || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        dosage: "",
        timing: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
    });
    onOpenChange(false);
  };

  const handleDosageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, dosage: value }));
  };

  const getGradientColors = () => {
    return type === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${getGradientColors()} rounded-2xl`}>
              {type === "supplement" ? (
                <Pill className="w-6 h-6 text-white" />
              ) : (
                <Heart className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {mode === "add" ? "افزودن" : "ویرایش"} {type === "supplement" ? "مکمل" : "ویتامین"}
              </DialogTitle>
              <p className="text-gray-500">
                {mode === "add" ? "اطلاعات جدید را وارد کنید" : "اطلاعات موجود را ویرایش کنید"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                نام {type === "supplement" ? "مکمل" : "ویتامین"}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder={`نام ${type === "supplement" ? "مکمل" : "ویتامین"} را وارد کنید`}
                className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
                dir="rtl"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                دسته‌بندی
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12" dir="rtl">
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
              <Label htmlFor="dosage" className="text-sm font-semibold text-gray-700">
                دوز مصرف
              </Label>
              <Input
                id="dosage"
                value={toPersianNumbers(formData.dosage)}
                onChange={handleDosageChange}
                placeholder="مثال: ۲ عدد در روز"
                className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
                dir="rtl"
              />
            </div>

            {/* Timing */}
            <div className="space-y-2">
              <Label htmlFor="timing" className="text-sm font-semibold text-gray-700">
                زمان مصرف
              </Label>
              <Input
                id="timing"
                value={formData.timing}
                onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
                placeholder="مثال: صبح ناشتا"
                className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
                dir="rtl"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
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
              className={`flex-1 h-12 bg-gradient-to-r ${getGradientColors()} hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg rounded-xl`}
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
