
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../supplement-selector";
import { Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import useDayManagement from "./exercise/useDayManagement";
import DaySelector from "./exercise/DaySelector";
import ProgramSpeechToText from "./ProgramSpeechToText";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
  currentDay: number;
  setCurrentDay: (day: number) => void;
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Use our custom hook for day management with fixed 5 days
  const {
    days,
    dayLabels,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    setShowAddDayDialog,
    setShowDeleteDayDialog,
    confirmDeleteDay,
    maxDays,
    getDayLabel,
  } = useDayManagement({
    initialDays: [1, 2, 3, 4, 5],
    initialDayLabels: {
      1: "روز اول",
      2: "روز دوم",
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
    },
    onDayChange: setCurrentDay
  });

  const handleSpeechSave = (transcript: string) => {
    // Parse the transcript to extract supplement/vitamin names
    const itemNames = transcript
      .split(/[،,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (itemNames.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} در متن گفتاری یافت نشد`
      });
      return;
    }

    // Find matching supplements/vitamins
    const matchedItems: number[] = [];
    const targetType = activeTab === 'supplement' ? 'supplement' : 'vitamin';
    
    itemNames.forEach(name => {
      const foundItem = supplements.find(item => 
        item.type === targetType && (item.name.includes(name) || name.includes(item.name))
      );
      
      if (foundItem) {
        const currentSelected = activeTab === 'supplement' ? selectedSupplements : selectedVitamins;
        if (!currentSelected.includes(foundItem.id)) {
          matchedItems.push(foundItem.id);
        }
      }
    });

    if (matchedItems.length > 0) {
      if (activeTab === 'supplement') {
        setSelectedSupplements(prev => [...prev, ...matchedItems]);
      } else {
        setSelectedVitamins(prev => [...prev, ...matchedItems]);
      }
      
      toast({
        title: "افزودن موفق",
        description: `${toPersianNumbers(matchedItems.length)} ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} از گفتار شما اضافه شد`
      });
    } else {
      toast({
        variant: "destructive",
        title: `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد`,
        description: `لطفا نام ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} را واضح‌تر بیان کنید`
      });
    }
  };
  
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
    <TabsContent value="supplement" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col text-right"
        dir="rtl"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between mb-4 gap-2 text-right" dir="rtl">
          <h3 className="font-semibold text-lg text-right">
            مکمل و ویتامین روز {toPersianNumbers(currentDay)}
          </h3>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-right" dir="rtl">
          <DaySelector 
            days={days}
            dayLabels={dayLabels}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            editingDay={editingDay}
            setEditingDay={setEditingDay}
            tempDayLabel={tempDayLabel}
            setTempDayLabel={setTempDayLabel}
            setShowAddDayDialog={setShowAddDayDialog}
            confirmDeleteDay={confirmDeleteDay}
            maxDays={maxDays}
          />
        </motion.div>
        
        {/* Tab Selector for Supplement vs Vitamin */}
        <motion.div variants={itemVariants} className="mb-4 text-right" dir="rtl">
          <div className="flex bg-muted/20 rounded-lg p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('supplement')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === 'supplement'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              مکمل‌ها
            </button>
            <button
              onClick={() => setActiveTab('vitamin')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                activeTab === 'vitamin'
                  ? "bg-white text-purple-700 shadow-sm" 
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              ویتامین‌ها
            </button>
          </div>
        </motion.div>

        {/* Speech to Text for Supplement/Vitamin Input */}
        <motion.div variants={itemVariants} className="mb-4">
          <ProgramSpeechToText
            onSave={handleSpeechSave}
            title={`افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} با گفتار`}
            placeholder={`نام ${activeTab === 'supplement' ? 'مکمل‌های' : 'ویتامین‌های'} مورد نظر را بگویید`}
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-auto text-right" dir="rtl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-day-${currentDay}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full text-right"
              dir="rtl"
            >
              <Card className="border border-border/40 bg-white/90 backdrop-blur-sm shadow-sm h-full text-right" dir="rtl">
                <div className="p-4 h-full text-right" dir="rtl">
                  <StudentSupplementSelector 
                    supplements={supplements}
                    selectedSupplements={selectedSupplements}
                    setSelectedSupplements={setSelectedSupplements}
                    selectedVitamins={selectedVitamins}
                    setSelectedVitamins={setSelectedVitamins}
                    activeTab={activeTab}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    dayLabel={getDayLabel(currentDay)}
                    dayNumber={currentDay}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-muted-foreground text-sm text-center" dir="rtl">
          <div className="flex items-center justify-center gap-2" dir="rtl">
            <Pill className="h-4 w-4" />
            <span className="text-right">
              {activeTab === 'supplement' 
                ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده برای ${getDayLabel(currentDay)}` 
                : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده برای ${getDayLabel(currentDay)}`}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
