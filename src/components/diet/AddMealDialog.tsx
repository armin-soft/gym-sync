
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (selectedMeals: any[]) => void;
  studentName: string;
  initialMeals: any[];
}

export const AddMealDialog: React.FC<AddMealDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  studentName,
  initialMeals = []
}) => {
  const [meals, setMeals] = useState<any[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<any[]>(initialMeals);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load meals from localStorage
  useEffect(() => {
    try {
      const storedMeals = localStorage.getItem('meals');
      if (storedMeals) {
        const parsedMeals = JSON.parse(storedMeals);
        setMeals(parsedMeals);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading meals:', error);
      setIsLoading(false);
    }
  }, []);

  // Reset selection when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedMeals(initialMeals);
    }
  }, [open, initialMeals]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSave = () => {
    onSave(selectedMeals);
    onOpenChange(false);
  };

  const getMealById = (id: number) => {
    return meals.find(meal => meal.id === id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            انتخاب برنامه غذایی برای {studentName}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground">
            در حال بارگذاری...
          </div>
        ) : meals.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            هیچ برنامه غذایی پیدا نشد. لطفا ابتدا برنامه غذایی ایجاد کنید.
          </div>
        ) : (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 p-1">
              {meals.map(meal => (
                <div
                  key={meal.id}
                  className={cn(
                    "flex items-center p-3 rounded-lg border transition-colors cursor-pointer",
                    selectedMeals.includes(meal.id)
                      ? "bg-primary/5 border-primary/30"
                      : "hover:bg-muted"
                  )}
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{meal.name}</h4>
                    <p className="text-sm text-muted-foreground">{meal.type}</p>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center border-2",
                    selectedMeals.includes(meal.id)
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {selectedMeals.includes(meal.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DialogFooter className="sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedMeals.length} مورد انتخاب شده
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              ذخیره
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
