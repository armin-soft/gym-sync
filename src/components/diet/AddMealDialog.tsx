
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Save, 
  X, 
  Utensils, 
  Plus,
  Coffee,
  Sun,
  Sunset,
  Moon,
  ChefHat
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Meal } from "./types";
import { WEEK_DAYS } from "./utils";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal?: Meal | null;
  onSave: (meal: Omit<Meal, 'id'>) => void;
}

const MEAL_TYPES = [
  { id: 'صبحانه', name: 'صبحانه', icon: Coffee, gradient: 'from-amber-400 to-orange-500' },
  { id: 'میان وعده صبح', name: 'میان وعده صبح', icon: Sun, gradient: 'from-yellow-400 to-amber-500' },
  { id: 'ناهار', name: 'ناهار', icon: Utensils, gradient: 'from-emerald-400 to-green-500' },
  { id: 'میان وعده عصر', name: 'میان وعده عصر', icon: Sunset, gradient: 'from-pink-400 to-rose-500' },
  { id: 'شام', name: 'شام', icon: ChefHat, gradient: 'from-blue-400 to-indigo-500' },
  { id: 'میان وعده شام', name: 'میان وعده شام', icon: Moon, gradient: 'from-violet-400 to-purple-500' }
];

export const AddMealDialog: React.FC<AddMealDialogProps> = ({
  open,
  onOpenChange,
  meal,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Meal, 'id'>>({
    name: '',
    type: 'صبحانه',
    day: 'شنبه'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بارگذاری داده‌های وعده در صورت ویرایش
  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || '',
        type: meal.type || 'صبحانه',
        day: meal.day || 'شنبه'
      });
    } else {
      setFormData({
        name: '',
        type: 'صبحانه',
        day: 'شنبه'
      });
    }
  }, [meal, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "نام وعده غذایی الزامی است"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      onSave(formData);
      toast({
        title: meal ? "ویرایش موفق" : "افزودن موفق",
        description: meal 
          ? "وعده غذایی با موفقیت ویرایش شد"
          : "وعده غذایی جدید با موفقیت اضافه شد"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ذخیره‌سازی پیش آمد"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMealType = MEAL_TYPES.find(type => type.id === formData.type);
  const IconComponent = selectedMealType?.icon || Utensils;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-2xl max-h-[90vh] overflow-hidden p-0 w-[95vw] sm:w-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-gray-900 dark:to-teal-950 rounded-lg overflow-hidden"
        >
          {/* هدر */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 sm:p-6">
            <DialogHeader>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {meal ? <Utensils className="h-5 w-5 sm:h-6 sm:w-6" /> : <Plus className="h-5 w-5 sm:h-6 sm:w-6" />}
                </div>
                <div>
                  <DialogTitle className="text-lg sm:text-2xl font-black">
                    {meal ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
                  </DialogTitle>
                  <DialogDescription className="text-emerald-100 mt-1 text-sm sm:text-base">
                    {meal 
                      ? "اطلاعات وعده غذایی را ویرایش کنید"
                      : "وعده غذایی جدید به برنامه اضافه کنید"
                    }
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* محتوا */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <Card className="border-emerald-200 dark:border-emerald-800 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center gap-2">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  اطلاعات وعده غذایی
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      نام وعده غذایی
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="مثال: املت با نان سبوس‌دار"
                      className="mt-2 h-10 sm:h-12 text-sm sm:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      نوع وعده غذایی
                    </Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                      required
                    >
                      <SelectTrigger className="mt-2 h-10 sm:h-12 text-sm sm:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {MEAL_TYPES.map((type) => {
                          const TypeIcon = type.icon;
                          return (
                            <SelectItem key={type.id} value={type.id} className="text-right p-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${type.gradient} flex items-center justify-center`}>
                                  <TypeIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </div>
                                <span className="font-medium text-sm sm:text-base">{type.name}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="day" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      روز هفته
                    </Label>
                    <Select 
                      value={formData.day} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}
                      required
                    >
                      <SelectTrigger className="mt-2 h-10 sm:h-12 text-sm sm:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {WEEK_DAYS.map((day) => (
                          <SelectItem key={day} value={day} className="text-right">
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* دکمه‌های عملیات */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 h-auto font-bold border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                disabled={isSubmitting}
              >
                <X className="ml-2 h-4 w-4" />
                انصراف
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 h-auto font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                <Save className="ml-2 h-4 w-4" />
                {isSubmitting 
                  ? "در حال ذخیره..." 
                  : meal 
                    ? "ذخیره تغییرات" 
                    : "افزودن وعده غذایی"
                }
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
