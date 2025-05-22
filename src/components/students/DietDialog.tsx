
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

interface DietDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mealIds: number[]) => void;
  student: Student;
  meals: any[];
}

export const DietDialog: React.FC<DietDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  student,
  meals
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(student.meals || []);
  
  const handleToggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter(id => id !== mealId));
    } else {
      setSelectedMeals([...selectedMeals, mealId]);
    }
  };
  
  const handleSave = () => {
    onSave(selectedMeals);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogTitle>برنامه غذایی - {student.name}</DialogTitle>
        <DialogDescription>
          برنامه غذایی برای {student.name} را تنظیم کنید.
        </DialogDescription>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="flex items-center space-x-2 p-4 border rounded-md">
                <Checkbox 
                  id={`meal-${meal.id}`} 
                  checked={selectedMeals.includes(meal.id)}
                  onCheckedChange={() => handleToggleMeal(meal.id)}
                />
                <label htmlFor={`meal-${meal.id}`} className="mr-2 font-medium">
                  {meal.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button onClick={handleSave}>ذخیره برنامه</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
