
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface FormFieldsProps {
  formData: {
    name: string;
    category: string;
    dosage: string;
    timing: string;
  };
  onFormDataChange: (data: Partial<FormFieldsProps['formData']>) => void;
  categories: SupplementCategory[];
  type: "supplement" | "vitamin";
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  onFormDataChange,
  categories,
  type,
}) => {
  const handleDosageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFormDataChange({ dosage: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
          نام {type === "supplement" ? "مکمل" : "ویتامین"}
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFormDataChange({ name: e.target.value })}
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
        <Select value={formData.category} onValueChange={(value) => onFormDataChange({ category: value })}>
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
          onChange={(e) => onFormDataChange({ timing: e.target.value })}
          placeholder="مثال: صبح ناشتا"
          className="text-right border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
          dir="rtl"
        />
      </div>
    </div>
  );
};
