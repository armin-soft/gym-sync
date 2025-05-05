
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlaskConical, Pill } from "lucide-react";

interface ContentHeaderProps {
  type: 'supplement' | 'vitamin';
  onAdd: () => void;
  deviceInfo: any;
}

export const ContentHeader = ({ type, onAdd, deviceInfo }: ContentHeaderProps) => {
  const getHeaderBgClass = () => {
    return cn(
      "p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 rounded-t-xl",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600/10 to-violet-500/10 dark:from-purple-900/30 dark:to-violet-800/30" 
        : "bg-gradient-to-r from-blue-600/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-800/30"
    );
  };
  
  const getMainIconClass = () => {
    return cn(
      "p-1.5 sm:p-2 md:p-3 rounded-lg shadow-lg bg-gradient-to-br",
      type === 'supplement'
        ? "from-purple-500 to-violet-600"
        : "from-blue-500 to-indigo-600"
    );
  };
  
  const getAddButtonClass = () => {
    return cn(
      "gap-1 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-lg",
      deviceInfo.isMobile ? "text-xs px-1.5 py-0.5" : "text-sm",
      type === 'supplement' 
        ? "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800" 
        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
    );
  };

  return (
    <div className={getHeaderBgClass()}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={getMainIconClass()}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white">
            {type === 'supplement' ? (
              <FlaskConical size="100%" />
            ) : (
              <Pill size="100%" />
            )}
          </div>
        </motion.div>
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-gray-100">
            {type === 'supplement' ? 'مکمل های ورزشی' : 'ویتامین ها'}
          </h3>
          <p className="text-2xs sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
      </Button>
    </div>
  );
};
