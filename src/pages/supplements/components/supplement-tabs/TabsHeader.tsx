
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TabsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  return (
    <div className="p-4 border-b border-indigo-100/50 dark:border-indigo-900/30 bg-white/30 dark:bg-gray-950/30 backdrop-blur-sm" dir="rtl">
      <TabsList className="grid w-full grid-cols-2 bg-white/60 dark:bg-gray-900/60 border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg backdrop-blur-sm">
        <TabsTrigger 
          value="supplement" 
          className="relative overflow-hidden data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
          dir="rtl"
        >
          <motion.div
            className="flex items-center gap-2 justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FlaskConical className="h-5 w-5" />
            <span className="font-medium">مکمل‌ها</span>
          </motion.div>
          {activeTab === 'supplement' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="vitamin" 
          className="relative overflow-hidden data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300"
          dir="rtl"
        >
          <motion.div
            className="flex items-center gap-2 justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pill className="h-5 w-5" />
            <span className="font-medium">ویتامین‌ها</span>
          </motion.div>
          {activeTab === 'vitamin' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
