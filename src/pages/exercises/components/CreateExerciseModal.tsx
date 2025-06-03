
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  exerciseTypes: string[];
}

export const CreateExerciseModal: React.FC<CreateExerciseModalProps> = ({
  isOpen,
  onClose,
  categories,
  exerciseTypes
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    targetMuscle: "",
    equipment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Exercise data:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            ایجاد تمرین جدید
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">نام تمرین</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="نام تمرین را وارد کنید"
                className="text-right"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-right">دسته‌بندی</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetMuscle" className="text-right">عضله هدف</Label>
              <Input
                id="targetMuscle"
                value={formData.targetMuscle}
                onChange={(e) => setFormData(prev => ({ ...prev, targetMuscle: e.target.value }))}
                placeholder="عضله هدف"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment" className="text-right">تجهیزات</Label>
              <Input
                id="equipment"
                value={formData.equipment}
                onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                placeholder="تجهیزات مورد نیاز"
                className="text-right"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-right">توضیحات</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="توضیحات تمرین"
              className="text-right min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
            >
              ایجاد تمرین
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
