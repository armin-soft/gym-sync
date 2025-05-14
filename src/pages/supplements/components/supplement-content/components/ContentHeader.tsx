
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ContentHeaderProps {
  type: 'supplement' | 'vitamin';
  onAdd: () => void;
}

export const ContentHeader = ({ type, onAdd }: ContentHeaderProps) => {
  const deviceInfo = useDeviceInfo();
  
  const getHeaderBgClass = () => {
    return cn(
      "p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 rounded-t-xl sm:rounded-t-2xl",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600/10 to-violet-500/10 dark:from-purple-900/30 dark:to-violet-800/30" 
        : "bg-gradient-to-r from-blue-600/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-800/30"
    );
  };
  
  const getMainIconClass = () => {
    return cn(
      "p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg bg-gradient-to-br",
      type === 'supplement'
        ? "from-purple-500 to-violet-600"
        : "from-blue-500 to-indigo-600"
    );
  };
  
  const getAddButtonClass = () => {
    return cn(
      "gap-1.5 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg sm:rounded-xl",
      deviceInfo.isMobile ? "text-xs px-2 py-1" : "text-sm",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
    );
  };

  return (
    <div className={getHeaderBgClass()}>
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={getMainIconClass()}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white">
            {type === 'supplement' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31" />
                <path d="M14 9.3V1.99" />
                <path d="M8.5 2h7" />
                <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
                <path d="M5.58 16.5h12.85" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z" />
              </svg>
            )}
          </div>
        </motion.div>
        <div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
            {type === 'supplement' ? 'مکمل های ورزشی' : 'ویتامین ها'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {type === 'supplement' 
              ? 'لیست تمام مکمل های ورزشی شما' 
              : 'لیست تمام ویتامین های شما'}
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onAdd}
        className={getAddButtonClass()}
        size={deviceInfo.isMobile ? "sm" : "default"}
      >
        <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
      </Button>
    </div>
  );
};
