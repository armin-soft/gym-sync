
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentSupplementSelector from "@/components/students/program/StudentSupplementSelector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill } from "lucide-react";

interface ProgramSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
  currentDay?: number;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramSupplementTab: React.FC<ProgramSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements
}) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedTypes, setSelectedTypes] = useState<{[key: string]: boolean}>({});
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-semibold text-center">مکمل و ویتامین</h3>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {toPersianNumbers(selectedSupplements.length + selectedVitamins.length)} مورد
            </Badge>
          </div>
        </motion.div>
        
        {/* Tab Selector for Supplement vs Vitamin - Centered */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex bg-muted/20 rounded-lg p-1 w-full max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('supplement')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'supplement'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              مکمل‌ها
            </button>
            <button
              onClick={() => setActiveTab('vitamin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'vitamin'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              ویتامین‌ها
            </button>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1">
          <Card className="border border-border/40 bg-white/90 backdrop-blur-sm shadow-sm h-full">
            <div className="p-4 h-full">
              <StudentSupplementSelector 
                supplements={supplements}
                selectedSupplements={selectedSupplements}
                setSelectedSupplements={setSelectedSupplements}
                selectedVitamins={selectedVitamins}
                setSelectedVitamins={setSelectedVitamins}
                activeTab={activeTab}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              <span>{toPersianNumbers(selectedSupplements.length)} مکمل</span>
            </span>
            
            <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              <span className="h-2 w-2 rounded-full bg-violet-500"></span>
              <span>{toPersianNumbers(selectedVitamins.length)} ویتامین</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProgramSupplementTab;
