
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { FlaskConical, Pill, Zap, Target } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-slate-200/30 dark:border-slate-700/30">
        <TabsList className="grid w-full grid-cols-2 h-20 md:h-24 bg-transparent p-1 gap-2">
          <TabsTrigger 
            value="supplement" 
            className={cn(
              "relative rounded-2xl transition-all duration-500 ease-out transform group",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-600",
              "data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105",
              "data-[state=inactive]:hover:bg-emerald-50 dark:data-[state=inactive]:hover:bg-emerald-900/20",
              "data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300"
            )}
          >
            <div className="flex flex-col items-center gap-2 py-2">
              <div className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                activeTab === "supplement" 
                  ? "bg-white/20 backdrop-blur-sm" 
                  : "bg-emerald-100 dark:bg-emerald-900/40 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/60"
              )}>
                <FlaskConical className={cn(
                  "w-6 h-6 transition-all duration-300",
                  activeTab === "supplement" 
                    ? "text-white" 
                    : "text-emerald-600 dark:text-emerald-400"
                )} />
                {activeTab === "supplement" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </motion.div>
                )}
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">مکمل‌ها</div>
                <div className="text-xs opacity-80">Supplements</div>
              </div>
            </div>
            {activeTab === "supplement" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full"
              />
            )}
          </TabsTrigger>

          <TabsTrigger 
            value="vitamin" 
            className={cn(
              "relative rounded-2xl transition-all duration-500 ease-out transform group",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600",
              "data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105",
              "data-[state=inactive]:hover:bg-blue-50 dark:data-[state=inactive]:hover:bg-blue-900/20",
              "data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-300"
            )}
          >
            <div className="flex flex-col items-center gap-2 py-2">
              <div className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                activeTab === "vitamin" 
                  ? "bg-white/20 backdrop-blur-sm" 
                  : "bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60"
              )}>
                <Pill className={cn(
                  "w-6 h-6 transition-all duration-300",
                  activeTab === "vitamin" 
                    ? "text-white" 
                    : "text-blue-600 dark:text-blue-400"
                )} />
                {activeTab === "vitamin" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Target className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </motion.div>
                )}
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">ویتامین‌ها</div>
                <div className="text-xs opacity-80">Vitamins</div>
              </div>
            </div>
            {activeTab === "vitamin" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full"
              />
            )}
          </TabsTrigger>
        </TabsList>
      </div>
    </motion.div>
  );
};
