
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square } from "lucide-react";

interface DietDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (mealIds: number[]) => boolean;
  studentName: string;
  initialMeals: number[];
  meals: any[];
}

export const DietDialog: React.FC<DietDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  studentName,
  initialMeals,
  meals
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedMeals(initialMeals || []);
    }
  }, [isOpen, initialMeals]);

  const handleToggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSave = () => {
    const success = onSave(selectedMeals);
    if (success) {
      onClose();
    }
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>انتخاب برنامه غذایی برای {studentName}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full p-2 mb-4 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="max-h-96 overflow-y-auto">
            {filteredMeals.length > 0 ? (
              <div className="space-y-2">
                {filteredMeals.map(meal => (
                  <div
                    key={meal.id}
                    className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleToggleMeal(meal.id)}
                  >
                    <div className="mr-2">
                      {selectedMeals.includes(meal.id) ? (
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-sm text-gray-500">{meal.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                وعده غذایی با این مشخصات یافت نشد
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="ml-2">
            انصراف
          </Button>
          <Button onClick={handleSave}>
            ذخیره برنامه غذایی
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
