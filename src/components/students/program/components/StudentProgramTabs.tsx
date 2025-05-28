
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dumbbell, Utensils, Pill } from "lucide-react";
import { motion } from "framer-motion";

interface StudentProgramTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  children: React.ReactNode;
}

const StudentProgramTabs: React.FC<StudentProgramTabsProps> = ({
  activeTab,
  setActiveTab,
  currentDay,
  setCurrentDay,
  children
}) => {
  return (
    <div className="h-full flex flex-col" style={{ direction: "rtl" }} dir="rtl">
      <Tabs defaultValue="exercise" value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
        <div className="bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 border-b border-gray-200/50 dark:border-gray-700/50 p-6">
          <TabsList className="grid grid-cols-3 gap-2 bg-gray-100/80 dark:bg-gray-800/80 p-2 rounded-xl backdrop-blur-sm">
            <TabsTrigger 
              value="exercise" 
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Dumbbell className="h-5 w-5" />
              <span className="font-medium">برنامه تمرینی</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diet" 
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Utensils className="h-5 w-5" />
              <span className="font-medium">برنامه غذایی</span>
            </TabsTrigger>
            <TabsTrigger 
              value="supplement" 
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Pill className="h-5 w-5" />
              <span className="font-medium">مکمل و ویتامین</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentProgramTabs;
