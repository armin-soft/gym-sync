
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  const tabs = [
    {
      value: "exercise",
      label: "برنامه تمرینی",
      icon: Dumbbell,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      value: "diet",
      label: "برنامه غذایی", 
      icon: UtensilsCrossed,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      value: "supplement",
      label: "مکمل و ویتامین",
      icon: Pill,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-full flex flex-col text-right" dir="rtl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col" dir="rtl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-3 w-full bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-2xl shadow-inner backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            {tabs.map((tab, index) => (
              <motion.div key={tab.value} variants={tabVariants}>
                <TabsTrigger
                  value={tab.value}
                  className={cn(
                    "relative w-full py-3 px-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-sm",
                    "data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400",
                    "hover:scale-105 active:scale-95",
                    activeTab === tab.value 
                      ? `bg-gradient-to-r ${tab.color} ${tab.bgColor}` 
                      : "bg-transparent hover:bg-white/60 dark:hover:bg-gray-700/30"
                  )}
                >
                  <div className="flex items-center justify-center gap-2 text-right" dir="rtl">
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                  </div>
                  
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentProgramTabs;
