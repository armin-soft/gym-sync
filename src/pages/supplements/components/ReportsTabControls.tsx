
import { Card } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, Wallet, ChartPieIcon, Sparkles } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReportsTabControlsProps {
  onTabChange: (value: string) => void;
  activeTab?: string;
}

export const ReportsTabControls = ({ onTabChange, activeTab = "overview" }: ReportsTabControlsProps) => {
  return (
    <Card className="p-1 backdrop-blur-sm bg-card/95 border-border/60 overflow-hidden">
      <TabsList className="w-full justify-start sm:justify-center grid grid-cols-3 h-12">
        <TabsTrigger 
          value="overview" 
          className={cn(
            "gap-1 sm:gap-2 rounded-lg relative overflow-hidden",
            "transition-all duration-300 ease-out",
            "data-[state=active]:text-primary-foreground",
            activeTab === "overview" ? (
              "bg-gradient-to-r from-blue-500 to-indigo-600"
            ) : (
              "hover:bg-blue-50 dark:hover:bg-blue-950/20"
            )
          )}
          onClick={() => onTabChange("overview")}
        >
          {activeTab === "overview" && (
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                background: "linear-gradient(120deg, #ffffff00 40%, #ffffff80 50%, #ffffff00 60%)",
                backgroundSize: "200% 200%"
              }}
            />
          )}
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-1 sm:gap-2"
          >
            <ChartBarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">نمای کلی</span>
            
            {activeTab === "overview" && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-0 right-0 -mt-1 -mr-1"
              >
                <Sparkles className="h-2.5 w-2.5 text-yellow-300" />
              </motion.div>
            )}
          </motion.div>
        </TabsTrigger>
        
        <TabsTrigger 
          value="income" 
          className={cn(
            "gap-1 sm:gap-2 rounded-lg relative overflow-hidden",
            "transition-all duration-300 ease-out",
            "data-[state=active]:text-primary-foreground",
            activeTab === "income" ? (
              "bg-gradient-to-r from-green-500 to-emerald-600"
            ) : (
              "hover:bg-green-50 dark:hover:bg-green-950/20"
            )
          )}
          onClick={() => onTabChange("income")}
        >
          {activeTab === "income" && (
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                background: "linear-gradient(120deg, #ffffff00 40%, #ffffff80 50%, #ffffff00 60%)",
                backgroundSize: "200% 200%"
              }}
            />
          )}
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-1 sm:gap-2"
          >
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">درآمد</span>
            
            {activeTab === "income" && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-0 right-0 -mt-1 -mr-1"
              >
                <Sparkles className="h-2.5 w-2.5 text-yellow-300" />
              </motion.div>
            )}
          </motion.div>
        </TabsTrigger>
        
        <TabsTrigger 
          value="activities" 
          className={cn(
            "gap-1 sm:gap-2 rounded-lg relative overflow-hidden",
            "transition-all duration-300 ease-out",
            "data-[state=active]:text-primary-foreground",
            activeTab === "activities" ? (
              "bg-gradient-to-r from-purple-500 to-violet-600"
            ) : (
              "hover:bg-purple-50 dark:hover:bg-purple-950/20"
            )
          )}
          onClick={() => onTabChange("activities")}
        >
          {activeTab === "activities" && (
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                background: "linear-gradient(120deg, #ffffff00 40%, #ffffff80 50%, #ffffff00 60%)",
                backgroundSize: "200% 200%"
              }}
            />
          )}
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-1 sm:gap-2"
          >
            <ChartPieIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">فعالیت‌ها</span>
            
            {activeTab === "activities" && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-0 right-0 -mt-1 -mr-1"
              >
                <Sparkles className="h-2.5 w-2.5 text-yellow-300" />
              </motion.div>
            )}
          </motion.div>
        </TabsTrigger>
      </TabsList>
    </Card>
  );
};
