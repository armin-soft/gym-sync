
import { FlaskConical, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface TabHeaderProps {
  activeTab: 'supplement' | 'vitamin';
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab }) => {
  const deviceInfo = useDeviceInfo();
  
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-4 h-4";
    if (deviceInfo.isTablet) return "w-5 h-5";
    return "w-6 h-6";
  };
  
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-4 md:mb-6"
    >
      <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 md:h-16 overflow-hidden rounded-2xl shadow-lg border border-white/20 dark:border-gray-800/50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
        <TabsTrigger 
          value="supplement" 
          className={cn(
            "relative gap-2 sm:gap-3 text-base sm:text-lg font-medium",
            "transition-all duration-300 ease-in-out",
            "data-[state=active]:text-white data-[state=active]:shadow-inner",
            "hover:bg-purple-50 dark:hover:bg-purple-950/20",
            "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-full flex items-center justify-center",
              activeTab === "supplement" ? "bg-white/20" : "bg-purple-100 dark:bg-purple-900/40",
              deviceInfo.isMobile ? "p-1" : "p-2"
            )}
          >
            <FlaskConical className={cn(
              getIconSize(),
              activeTab === "supplement" ? "text-white" : "text-purple-600 dark:text-purple-400"
            )} />
          </motion.div>
          مکمل ها
        </TabsTrigger>
        <TabsTrigger 
          value="vitamin" 
          className={cn(
            "relative gap-2 sm:gap-3 text-base sm:text-lg font-medium",
            "transition-all duration-300 ease-in-out",
            "data-[state=active]:text-white data-[state=active]:shadow-inner",
            "hover:bg-blue-50 dark:hover:bg-blue-950/20",
            "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-full flex items-center justify-center",
              activeTab === "vitamin" ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900/40",
              deviceInfo.isMobile ? "p-1" : "p-2"
            )}
          >
            <Pill className={cn(
              getIconSize(),
              activeTab === "vitamin" ? "text-white" : "text-blue-600 dark:text-blue-400"
            )} />
          </motion.div>
          ویتامین ها
        </TabsTrigger>
      </TabsList>
    </motion.div>
  );
};
