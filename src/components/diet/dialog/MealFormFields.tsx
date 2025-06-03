
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Sun, Sunset, Moon, ChefHat, Utensils } from "lucide-react";
import { WEEK_DAYS } from "../utils";
import { MealFormData } from "./MealFormData";

interface MealFormFieldsProps {
  formData: MealFormData;
  onFormDataChange: (data: MealFormData) => void;
}

const MEAL_TYPES = [
  { id: 'صبحانه', name: 'صبحانه', icon: Coffee, gradient: 'from-amber-400 to-orange-500' },
  { id: 'میان وعده صبح', name: 'میان وعده صبح', icon: Sun, gradient: 'from-yellow-400 to-amber-500' },
  { id: 'ناهار', name: 'ناهار', icon: Utensils, gradient: 'from-emerald-400 to-green-500' },
  { id: 'میان وعده عصر', name: 'میان وعده عصر', icon: Sunset, gradient: 'from-pink-400 to-rose-500' },
  { id: 'شام', name: 'شام', icon: ChefHat, gradient: 'from-blue-400 to-indigo-500' },
  { id: 'میان وعده شام', name: 'میان وعده شام', icon: Moon, gradient: 'from-violet-400 to-purple-500' }
];

export const MealFormFields: React.FC<MealFormFieldsProps> = ({
  formData,
  onFormDataChange
}) => {
  const selectedMealType = MEAL_TYPES.find(type => type.id === formData.type);
  const IconComponent = selectedMealType?.icon || Utensils;

  return (
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
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
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
              onValueChange={(value) => onFormDataChange({ ...formData, type: value })}
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
              onValueChange={(value) => onFormDataChange({ ...formData, day: value })}
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
  );
};
