
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../supplement-selector";
import { Pill, Capsule, Heart, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      key: 'supplement',
      label: 'مکمل‌ها',
      icon: Pill,
      count: selectedSupplements.length,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50',
      darkBgGradient: 'from-purple-900/20 to-indigo-900/20'
    },
    {
      key: 'vitamin',
      label: 'ویتامین‌ها',
      icon: Heart,
      count: selectedVitamins.length,
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      darkBgGradient: 'from-pink-900/20 to-rose-900/20'
    }
  ];

  return (
    <div className="h-full p-6 text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-full flex flex-col"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  مکمل و ویتامین روز {toPersianNumbers(currentDay)}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>{getDayLabel(currentDay)}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200/50 dark:border-purple-700/50">
                <CardContent className="p-3 text-center">
                  <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-purple-600 dark:text-purple-400">مکمل</p>
                  <p className="text-sm font-bold text-purple-800 dark:text-purple-300">
                    {toPersianNumbers(selectedSupplements.length)}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200/50 dark:border-pink-700/50">
                <CardContent className="p-3 text-center">
                  <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400 mx-auto mb-1" />
                  <p className="text-xs text-pink-600 dark:text-pink-400">ویتامین</p>
                  <p className="text-sm font-bold text-pink-800 dark:text-pink-300">
                    {toPersianNumbers(selectedVitamins.length)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
        
        {/* Day Selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex bg-muted/20 rounded-xl p-1 w-full justify-center">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  
                  return (
                    <motion.button
                      key={tab.key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.key as 'supplement' | 'vitamin')}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                        isActive
                          ? `bg-gradient-to-r ${tab.bgGradient} dark:bg-gradient-to-r dark:${tab.darkBgGradient} text-gray-800 dark:text-gray-100 shadow-sm border border-white/50`
                          : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4",
                        isActive 
                          ? `text-transparent bg-gradient-to-r ${tab.gradient} bg-clip-text` 
                          : ""
                      )} />
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs",
                            isActive 
                              ? "bg-white/80 text-gray-700" 
                              : "bg-gray-200 text-gray-600"
                          )}
                        >
                          {toPersianNumbers(tab.count)}
                        </Badge>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Speech to Text */}
        <motion.div variants={itemVariants} className="mb-6">
          <ProgramSpeechToText
            onSave={handleSpeechSave}
            title={`افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} با گفتار`}
            placeholder={`نام ${activeTab === 'supplement' ? 'مکمل‌های' : 'ویتامین‌های'} مورد نظر را بگویید`}
          />
        </motion.div>
        
        {/* Supplement Content */}
        <motion.div variants={itemVariants} className="flex-1 overflow-hidden">
          <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <CardContent className="p-0 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-day-${currentDay}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
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
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentProgramSupplementContent;
