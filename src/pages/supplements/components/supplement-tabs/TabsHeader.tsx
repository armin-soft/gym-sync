
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface TabsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  return (
    <div className="p-3 sm:p-4 md:p-6 border-b border-indigo-100/50 dark:border-indigo-900/30 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
      <TabsList className="grid w-full grid-cols-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-indigo-100 dark:border-indigo-800 shadow-sm">
        <TabsTrigger 
          value="supplement" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 gap-2"
        >
          <motion.div
            initial={false}
            animate={activeTab === 'supplement' ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Pill className="h-4 w-4" />
          </motion.div>
          مکمل‌ها
        </TabsTrigger>
        
        <TabsTrigger 
          value="vitamin" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 gap-2"
        >
          <motion.div
            initial={false}
            animate={activeTab === 'vitamin' ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ShieldCheck className="h-4 w-4" />
          </motion.div>
          ویتامین‌ها
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
