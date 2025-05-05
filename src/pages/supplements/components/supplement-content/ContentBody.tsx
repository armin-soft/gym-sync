
import { motion } from "framer-motion";
import { SupplementList } from "@/components/supplements/SupplementList";
import { Supplement } from "@/types/supplement";

interface ContentBodyProps {
  filteredSupplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  deviceInfo: any;
}

export const ContentBody = ({
  filteredSupplements,
  onEdit,
  onDelete,
  deviceInfo
}: ContentBodyProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex-1 overflow-hidden w-full"
    >
      <div className="h-full overflow-auto">
        <SupplementList
          supplements={filteredSupplements}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </motion.div>
  );
};
