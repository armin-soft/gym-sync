
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentDietSelector from "../StudentDietSelector";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // به تاخیر انداختن ذخیره‌سازی برای نمایش وضعیت بارگذاری
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "ذخیره موفق",
        description: "برنامه غذایی با موفقیت ذخیره شد"
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
    <TabsContent value="diet" className="m-0 h-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <h3 className="font-semibold text-lg">
            برنامه غذایی
          </h3>
          
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
            <span>ذخیره برنامه</span>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1 overflow-auto">
          <Card className="border border-border/40 bg-white/90 backdrop-blur-sm shadow-sm h-full">
            <div className="p-4 h-full">
              <StudentDietSelector 
                meals={meals}
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
              />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
