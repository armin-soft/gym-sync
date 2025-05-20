
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../StudentSupplementSelector";
import { Button } from "@/components/ui/button";
import { Save, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
  currentDay?: number;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const StudentProgramSupplementContent: React.FC<StudentProgramSupplementContentProps> = ({
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  supplements,
  currentDay = 1
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedTypes, setSelectedTypes] = useState<{[key: string]: boolean}>({});
  
  const handleSave = () => {
    setIsSaving(true);
    
    // به تاخیر انداختن ذخیره‌سازی برای نمایش وضعیت بارگذاری
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "ذخیره موفق",
        description: `برنامه مکمل و ویتامین روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شد`
      });
    }, 600);
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
    <TabsContent value="supplement" className="m-0 h-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <h3 className="font-semibold text-lg">
            مکمل و ویتامین (روز {toPersianNumbers(currentDay)})
          </h3>
          
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
            <span>ذخیره برنامه روز {toPersianNumbers(currentDay)}</span>
          </Button>
        </motion.div>
        
        {/* Day selector */}
        <motion.div variants={itemVariants} className="mb-4">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex items-center justify-start space-x-1 space-x-reverse pb-2">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  // onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg transition-all",
                    currentDay === day.id 
                      ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md" 
                      : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
        
        {/* Tab Selector for Supplement vs Vitamin */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex bg-muted/20 rounded-lg p-1 w-full sm:w-auto">
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
        
        <motion.div variants={itemVariants} className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
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
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 text-muted-foreground text-sm text-center">
          <div className="flex items-center justify-center gap-2">
            <Pill className="h-4 w-4" />
            <span>
              {activeTab === 'supplement' 
                ? `${toPersianNumbers(selectedSupplements.length)} مکمل انتخاب شده` 
                : `${toPersianNumbers(selectedVitamins.length)} ویتامین انتخاب شده`}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
