
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (mealIds: number[]) => boolean;
  studentName: string;
  initialMeals?: number[];
}

export function AddMealDialog({
  open,
  onOpenChange,
  onSave,
  studentName,
  initialMeals = []
}: AddMealDialogProps) {
  const deviceInfo = useDeviceInfo();
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);

  const handleSave = () => {
    const success = onSave(selectedMeals);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col" dir="rtl">
        <DialogTitle className="sr-only">انتخاب غذاها برای {studentName}</DialogTitle>
        
        <div className="border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">انتخاب غذا برای {studentName}</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">
              این بخش در حال توسعه است و به زودی قابل استفاده خواهد بود.
            </p>
          </div>
        </div>
        
        <div className="border-t bg-muted/20 p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedMeals.length} غذا انتخاب شده
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button onClick={handleSave}>
                ذخیره
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
