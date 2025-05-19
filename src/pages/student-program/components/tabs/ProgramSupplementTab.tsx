
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentSupplementSelector from "@/components/students/program/StudentSupplementSelector";

interface ProgramSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramSupplementTab: React.FC<ProgramSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements
}) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load initial data
  useEffect(() => {
    if (student.supplements) {
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }
    
    if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSaveSupplements({
        supplements: selectedSupplements,
        vitamins: selectedVitamins
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          مکمل و ویتامین
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-1 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
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
        <StudentSupplementSelector 
          supplements={supplements}
          selectedSupplements={selectedSupplements}
          setSelectedSupplements={setSelectedSupplements}
          selectedVitamins={selectedVitamins}
          setSelectedVitamins={setSelectedVitamins}
        />
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-2 flex justify-center gap-4">
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
          <span>{toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده</span>
        </span>
        
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="h-2 w-2 rounded-full bg-violet-500"></span>
          <span>{toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده</span>
        </span>
      </div>
    </div>
  );
};

export default ProgramSupplementTab;
