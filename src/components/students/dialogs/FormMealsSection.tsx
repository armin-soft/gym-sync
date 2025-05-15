
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UtensilsIcon } from "lucide-react";

interface FormMealsSectionProps {
  active: boolean;
  meals: any[];
  setMeals: React.Dispatch<React.SetStateAction<any[]>>;
  mealsDialogOpen: boolean;
  setMealsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Custom utensils icon
const UtensilsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

export const FormMealsSection: React.FC<FormMealsSectionProps> = ({
  active,
  meals,
  setMealsDialogOpen,
}) => {
  if (!active) return null;

  return (
    <Card className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50 h-full">
        <UtensilsIcon />
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
