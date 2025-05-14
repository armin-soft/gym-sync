
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface FiltersPanelProps {
  showFilters: boolean;
}

export const FiltersPanel = ({ showFilters }: FiltersPanelProps) => {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-b border-gray-200 dark:border-gray-800 pb-3 sm:pb-4 mb-3 sm:mb-4 overflow-hidden"
        >
          <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl">
            <h4 className="text-xs sm:text-sm font-medium mb-2">فیلترها</h4>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                همه
              </Badge>
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                پروتئین
              </Badge>
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                کراتین
              </Badge>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
