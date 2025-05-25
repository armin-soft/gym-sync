
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { FlaskConical, Pill, Sparkles } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6 md:mb-8"
    >
      <TabsList className="grid w-full grid-cols-2 h-14 sm:h-16 md:h-18 overflow-hidden rounded-2xl shadow-xl border-0 backdrop-blur-sm bg-gradient-to-r from-slate-100/90 via-white/90 to-slate-100/90 dark:from-gray-800/90 dark:via-gray-700/90 dark:to-gray-800/90 p-1.5">
        <TabsTrigger 
          value="supplement" 
          className={cn(
            "relative gap-2 sm:gap-3 text-base sm:text-lg font-semibold rounded-xl",
            "transition-all duration-500 ease-in-out transform",
            "data-[state=active]:text-white data-[state=active]:shadow-2xl",
            "hover:bg-purple-50 dark:hover:bg-purple-950/20",
            "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-purple-600 data-[state=active]:to-violet-600",
            "data-[state=active]:scale-105"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-full flex items-center justify-center relative",
              activeTab === "supplement" ? "bg-white/20 p-2" : "bg-purple-100 dark:bg-purple-900/40 p-2",
              deviceInfo.isMobile ? "p-1.5" : "p-2"
            )}
          >
            <FlaskConical className={cn(
              deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6",
              activeTab === "supplement" ? "text-white" : "text-purple-600 dark:text-purple-400"
            )} />
            {activeTab === "supplement" && (
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
            )}
          </motion.div>
          <span className="font-bold">مکمل‌ها</span>
          {activeTab === "supplement" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            />
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="vitamin" 
          className={cn(
            "relative gap-2 sm:gap-3 text-base sm:text-lg font-semibold rounded-xl",
            "transition-all duration-500 ease-in-out transform",
            "data-[state=active]:text-white data-[state=active]:shadow-2xl",
            "hover:bg-blue-50 dark:hover:bg-blue-950/20",
            "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-blue-600 data-[state=active]:to-indigo-600",
            "data-[state=active]:scale-105"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-full flex items-center justify-center relative",
              activeTab === "vitamin" ? "bg-white/20 p-2" : "bg-blue-100 dark:bg-blue-900/40 p-2",
              deviceInfo.isMobile ? "p-1.5" : "p-2"
            )}
          >
            <Pill className={cn(
              deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5 md:w-6 md:h-6",
              activeTab === "vitamin" ? "text-white" : "text-blue-600 dark:text-blue-400"
            )} />
            {activeTab === "vitamin" && (
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
            )}
          </motion.div>
          <span className="font-bold">ویتامین‌ها</span>
          {activeTab === "vitamin" && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            />
          )}
        </TabsTrigger>
      </TabsList>
    </motion.div>
  );
};
