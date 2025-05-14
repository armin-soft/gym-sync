
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Supplement } from "@/types/supplement";
import { 
  ContentHeader, 
  SearchAndFilters, 
  SupplementListContainer 
} from "./supplement-content/components";

interface SupplementContentProps {
  type: 'supplement' | 'vitamin';
  supplements: Supplement[];
  onAdd: () => void;
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementContent = ({
  type,
  supplements,
  onAdd,
  onEdit,
  onDelete,
}: SupplementContentProps) => {
  const deviceInfo = useDeviceInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter supplements based on search query
  const filteredSupplements = supplements.filter(item => {
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <Card className="overflow-hidden border-none shadow-xl backdrop-blur-sm rounded-xl sm:rounded-2xl h-full flex flex-col w-full">
      <ContentHeader type={type} onAdd={onAdd} />

      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-3 sm:p-4 md:p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-1 overflow-hidden flex flex-col"
        >
          <SearchAndFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            type={type}
            isMobile={deviceInfo.isMobile}
          />

          <SupplementListContainer
            filteredSupplements={filteredSupplements}
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            type={type}
            viewMode={deviceInfo.isMobile ? "grid" : viewMode}
          />
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};
