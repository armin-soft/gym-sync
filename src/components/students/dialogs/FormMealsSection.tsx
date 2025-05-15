
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react"; // Use Utensils icon from lucide

interface FormMealsSectionProps {
  active: boolean;
  meals: any[];
  setMeals: React.Dispatch<React.SetStateAction<any[]>>;
  mealsDialogOpen: boolean;
  setMealsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormMealsSection: React.FC<FormMealsSectionProps> = ({
  active,
  meals,
  setMealsDialogOpen,
}) => {
  if (!active) return null;

  return (
    <Card className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50 h-full">
        <Utensils />
        <h3 className="mt-4 text-lg font-medium">برنامه غذایی</h3>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          برنامه غذایی برای شاگرد
        </p>
        <Button 
          variant="default" 
          className="mt-4" 
          onClick={() => setMealsDialogOpen(true)}
        >
          افزودن غذا
        </Button>
        
        <div className="mt-4 w-full">
          <p className="text-sm text-muted-foreground text-center">
            {meals.length > 0 
              ? `${meals.length} غذا انتخاب شده است` 
              : "هیچ غذایی انتخاب نشده"}
          </p>
        </div>
      </div>
    </Card>
  );
};
