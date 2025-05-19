
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentDietSelector from "@/components/students/program/StudentDietSelector";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[]) => boolean;
}

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load initial data
  useEffect(() => {
    if (student.meals) {
      setSelectedMeals(student.meals);
    } else {
      setSelectedMeals([]);
    }
  }, [student]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSaveDiet(selectedMeals);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          برنامه غذایی
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-1 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>ذخیره</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <StudentDietSelector 
          meals={meals}
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
        />
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span>{toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده</span>
        </span>
      </div>
    </div>
  );
};

export default ProgramDietTab;
