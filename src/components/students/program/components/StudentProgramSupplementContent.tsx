
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../supplement-selector";
import { Pill, Tablets, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
  currentDay: number;
  setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
}

const StudentProgramSupplementContent: React.FC<StudentProgramSupplementContentProps> = ({
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  supplements,
  currentDay,
  setCurrentDay,
}) => {
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  
  const getTotalSelected = () => {
    return selectedSupplements.length + selectedVitamins.length;
  };

  const getCurrentTabSelected = () => {
    return activeTab === 'supplement' ? selectedSupplements.length : selectedVitamins.length;
  };

  return (
    <TabsContent value="supplement" className="m-0 h-full" style={{ direction: "rtl" }} dir="rtl">
      <div className="h-full flex flex-col p-6 text-right">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  مکمل و ویتامین
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    انتخاب مکمل‌ها و ویتامین‌های مورد نیاز
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-xl">
              <Tablets className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {toPersianNumbers(getTotalSelected())} مورد انتخاب شده
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Tab Selector for Supplement vs Vitamin */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">انتخاب نوع محصول</h4>
            <div className="flex bg-gray-100/80 dark:bg-gray-700/80 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('supplement')}
                className={cn(
                  "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all text-center",
                  activeTab === 'supplement'
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Pill className="w-4 h-4" />
                  <span>مکمل‌ها</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {toPersianNumbers(selectedSupplements.length)}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('vitamin')}
                className={cn(
                  "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all text-center",
                  activeTab === 'vitamin'
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Tablets className="w-4 h-4" />
                  <span>ویتامین‌ها</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {toPersianNumbers(selectedVitamins.length)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            >
              <div className="h-full p-4" style={{ direction: "rtl" }} dir="rtl">
                <StudentSupplementSelector 
                  supplements={supplements}
                  selectedSupplements={selectedSupplements}
                  setSelectedSupplements={setSelectedSupplements}
                  selectedVitamins={selectedVitamins}
                  setSelectedVitamins={setSelectedVitamins}
                  activeTab={activeTab}
                  selectedCategory={null}
                  setSelectedCategory={() => {}}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
