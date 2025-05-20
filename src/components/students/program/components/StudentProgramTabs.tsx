
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
    <Tabs 
      defaultValue="exercise" 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full flex-1 flex flex-col"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm py-3 px-4 rounded-lg mb-4 shadow-sm">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger 
            value="exercise" 
            className="flex items-center gap-2 data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
          >
            <Dumbbell className="h-4 w-4" />
            <span>برنامه تمرینی</span>
          </TabsTrigger>
          <TabsTrigger 
            value="diet" 
            className="flex items-center gap-2 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300"
          >
            <Utensils className="h-4 w-4" />
            <span>برنامه غذایی</span>
          </TabsTrigger>
          <TabsTrigger 
            value="supplement" 
            className="flex items-center gap-2 data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
          >
            <Pill className="h-4 w-4" />
            <span>مکمل و ویتامین</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <motion.div 
        className="flex-1 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </Tabs>
  );
};

export default StudentProgramTabs;
