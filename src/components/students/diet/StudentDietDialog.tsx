
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[], dayNumber?: number) => boolean;
  meals: any[];
  initialMeals?: number[];
  initialMealsDay1?: number[];
  initialMealsDay2?: number[];
  initialMealsDay3?: number[];
  initialMealsDay4?: number[];
}

const StudentDietDialog: React.FC<StudentDietDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  meals,
  initialMeals = [],
  initialMealsDay1 = [],
  initialMealsDay2 = [],
  initialMealsDay3 = [],
  initialMealsDay4 = [],
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [selectedMealsDay1, setSelectedMealsDay1] = useState<number[]>(initialMealsDay1);
  const [selectedMealsDay2, setSelectedMealsDay2] = useState<number[]>(initialMealsDay2);
  const [selectedMealsDay3, setSelectedMealsDay3] = useState<number[]>(initialMealsDay3);
  const [selectedMealsDay4, setSelectedMealsDay4] = useState<number[]>(initialMealsDay4);

  const handleToggleMeal = (id: number, day?: string) => {
    if (day === "day1") {
      if (selectedMealsDay1.includes(id)) {
        setSelectedMealsDay1(selectedMealsDay1.filter(item => item !== id));
      } else {
        setSelectedMealsDay1([...selectedMealsDay1, id]);
      }
    } else if (day === "day2") {
      if (selectedMealsDay2.includes(id)) {
        setSelectedMealsDay2(selectedMealsDay2.filter(item => item !== id));
      } else {
        setSelectedMealsDay2([...selectedMealsDay2, id]);
      }
    } else if (day === "day3") {
      if (selectedMealsDay3.includes(id)) {
        setSelectedMealsDay3(selectedMealsDay3.filter(item => item !== id));
      } else {
        setSelectedMealsDay3([...selectedMealsDay3, id]);
      }
    } else if (day === "day4") {
      if (selectedMealsDay4.includes(id)) {
        setSelectedMealsDay4(selectedMealsDay4.filter(item => item !== id));
      } else {
        setSelectedMealsDay4([...selectedMealsDay4, id]);
      }
    } else {
      // General day
      if (selectedMeals.includes(id)) {
        setSelectedMeals(selectedMeals.filter(item => item !== id));
      } else {
        setSelectedMeals([...selectedMeals, id]);
      }
    }
  };

  const handleSave = () => {
    let success = false;
    
    if (activeTab === "general") {
      success = onSave(selectedMeals);
    } else if (activeTab === "day1") {
      success = onSave(selectedMealsDay1, 1);
    } else if (activeTab === "day2") {
      success = onSave(selectedMealsDay2, 2);
    } else if (activeTab === "day3") {
      success = onSave(selectedMealsDay3, 3);
    } else if (activeTab === "day4") {
      success = onSave(selectedMealsDay4, 4);
    }
    
    if (success) {
      toast({
        title: "برنامه غذایی ذخیره شد",
        description: `برنامه غذایی برای ${studentName} با موفقیت ذخیره شد.`,
      });
      onOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "خطا در ذخیره برنامه",
        description: "متأسفانه ذخیره برنامه غذایی با خطا مواجه شد.",
      });
    }
  };
  
  const getSelectedMealsForActiveTab = () => {
    switch (activeTab) {
      case "day1": return selectedMealsDay1;
      case "day2": return selectedMealsDay2;
      case "day3": return selectedMealsDay3;
      case "day4": return selectedMealsDay4;
      default: return selectedMeals;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogTitle>برنامه غذایی - {studentName}</DialogTitle>
        <DialogDescription>
          برنامه غذایی برای {studentName} را تنظیم کنید.
        </DialogDescription>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="general">عمومی</TabsTrigger>
            <TabsTrigger value="day1">روز اول</TabsTrigger>
            <TabsTrigger value="day2">روز دوم</TabsTrigger>
            <TabsTrigger value="day3">روز سوم</TabsTrigger>
            <TabsTrigger value="day4">روز چهارم</TabsTrigger>
          </TabsList>
          
          {["general", "day1", "day2", "day3", "day4"].map((day) => (
            <TabsContent key={day} value={day}>
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-4">
                  {meals.map((meal) => (
                    <div key={meal.id} className="flex items-center space-x-2 p-4 border rounded-md">
                      <Checkbox 
                        id={`${day}-meal-${meal.id}`} 
                        checked={
                          day === "general" 
                            ? selectedMeals.includes(meal.id)
                            : day === "day1" 
                              ? selectedMealsDay1.includes(meal.id)
                              : day === "day2"
                                ? selectedMealsDay2.includes(meal.id)
                                : day === "day3"
                                  ? selectedMealsDay3.includes(meal.id)
                                  : selectedMealsDay4.includes(meal.id)
                        }
                        onCheckedChange={() => handleToggleMeal(meal.id, day !== "general" ? day : undefined)}
                      />
                      <label htmlFor={`${day}-meal-${meal.id}`} className="mr-2 font-medium">
                        {meal.name}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>انصراف</Button>
          <Button onClick={handleSave}>
            ذخیره برنامه {activeTab === "general" ? "عمومی" : `روز ${parseInt(activeTab.replace("day", ""))}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDietDialog;
