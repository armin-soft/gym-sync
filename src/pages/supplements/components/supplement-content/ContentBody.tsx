
import { motion } from "framer-motion";
import { SupplementList } from "@/components/supplements/list";
import { Supplement } from "@/types/supplement";
import { cn } from "@/lib/utils";

interface ContentBodyProps {
  filteredSupplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  deviceInfo: any;
  viewMode?: "grid" | "list";
}

export const ContentBody = ({
  filteredSupplements,
  onEdit,
  onDelete,
  deviceInfo,
  viewMode = "list"
}: ContentBodyProps) => {
  // Get appropriate padding based on device size
  const getPadding = () => {
    if (deviceInfo.isMobile) return "px-1 py-1";
    if (deviceInfo.isTablet) return "px-2 py-2";
    return "px-3 py-3";
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "flex-1 overflow-hidden w-full",
        getPadding()
      )}
      style={{
        // Apply scaling based on screen size with better performance
        transform: deviceInfo.isMobile ? "scale(0.98)" : "none",
        transformOrigin: "top center"
      }}
    >
      <div className="h-full overflow-auto">
        <SupplementList 
          supplements={filteredSupplements}
          categories={[]} // Pass empty array as we don't need categories here
          onEditSupplement={onEdit}
          onDeleteSupplement={onDelete}
          type={filteredSupplements[0]?.type || 'supplement'}
          selectedCategory=""
          setSelectedCategory={() => {}}
          viewMode={viewMode}
        />
      </div>
    </motion.div>
  );
};
