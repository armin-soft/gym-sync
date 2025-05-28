
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../supplement-selector";
import { Pill, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const tabs = [
    {
      id: 'supplement',
      label: 'مکمل‌ها',
      icon: Pill,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
      count: selectedSupplements.length
    },
    {
      id: 'vitamin', 
      label: 'ویتامین‌ها',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
      count: selectedVitamins.length
    }
  ];

  return (
    <TabsContent value="supplement" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className={cn(
            "border-0 bg-gradient-to-r p-4 sm:p-6 rounded-2xl shadow-sm",
            activeTab === 'supplement' 
              ? 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20'
              : 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
          )}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-r",
                  activeTab === 'supplement' ? 'from-purple-500 to-violet-600' : 'from-orange-500 to-amber-600'
                )}>
                  {activeTab === 'supplement' ? (
                    <Pill className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  ) : (
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 text-right mb-1">
                    {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها و مواد معدنی'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
                    {activeTab === 'supplement' ? 'تقویت عملکرد ورزشی' : 'تامین نیازهای بدن'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-right" dir="rtl">
                <div className="text-center">
                  <div className={cn(
                    "flex items-center gap-1",
                    activeTab === 'supplement' ? 'text-purple-600 dark:text-purple-400' : 'text-orange-600 dark:text-orange-400'
                  )}>
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-medium">انتخاب شده</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {toPersianNumbers(activeTab === 'supplement' ? selectedSupplements.length : selectedVitamins.length)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-2">
            <div className="flex bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'supplement' | 'vitamin')}
                  variant="ghost"
                  className={cn(
                    "flex-1 relative py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300",
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : "text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/30"
                  )}
                >
                  <div className="flex items-center justify-center gap-2 text-right" dir="rtl">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <Badge variant="secondary" className={cn(
                        "text-xs px-1.5 py-0.5 mr-1",
                        activeTab === tab.id 
                          ? "bg-white/20 text-white border-white/30" 
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      )}>
                        {toPersianNumbers(tab.count)}
                      </Badge>
                    )}
                  </div>
                  
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="supplementTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card className="h-full border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-4 h-full">
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
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
