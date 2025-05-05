
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Supplement } from "@/types/supplement";
import { ContentHeader } from "./ContentHeader";
import { ContentFilters } from "./ContentFilters";
import { ContentBody } from "./ContentBody";

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
    <Card className="overflow-hidden border-none shadow-lg backdrop-blur-sm rounded-lg sm:rounded-xl h-full flex flex-col w-full">
      <ContentHeader 
        type={type} 
        onAdd={onAdd} 
        deviceInfo={deviceInfo} 
      />

      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-2 sm:p-3 md:p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-1 overflow-hidden flex flex-col"
        >
          <ContentFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            deviceInfo={deviceInfo}
          />

          <ContentBody 
            filteredSupplements={filteredSupplements.filter(s => s.type === type)}
            onEdit={onEdit}
            onDelete={onDelete}
            deviceInfo={deviceInfo}
          />
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};
