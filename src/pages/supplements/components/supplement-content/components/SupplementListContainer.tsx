
import { motion } from "framer-motion";
import { SupplementList } from "@/components/supplements/list/SupplementList";
import type { Supplement } from "@/types/supplement";

interface SupplementListContainerProps {
  filteredSupplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  type: 'supplement' | 'vitamin';
  viewMode: "grid" | "list";
}

export const SupplementListContainer = ({
  filteredSupplements,
  onEdit,
  onDelete,
  onAdd,
  type,
  viewMode
}: SupplementListContainerProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex-1 overflow-hidden w-full"
    >
      <div className="h-full overflow-auto">
        <SupplementList
          supplements={filteredSupplements.filter(s => s.type === type)}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          viewMode={viewMode}
        />
      </div>
    </motion.div>
  );
};
