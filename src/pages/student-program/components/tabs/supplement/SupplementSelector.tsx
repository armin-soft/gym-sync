
import React from "react";
import { Supplement } from "@/types/supplement";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SupplementSelectorProps {
  supplements: Supplement[];
  selectedIds: number[];
  onChange: (newSelected: number[]) => void;
}

const SupplementSelector: React.FC<SupplementSelectorProps> = ({
  supplements,
  selectedIds,
  onChange
}) => {
  const toggleSupplement = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(sid => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-right" dir="rtl">
      {supplements.map(supplement => (
        <motion.div
          key={supplement.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleSupplement(supplement.id)}
          className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 transition-colors text-right ${
            selectedIds.includes(supplement.id)
              ? "bg-green-50 border-green-300"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
          dir="rtl"
        >
          <div className="flex-grow text-right">
            <p className="font-medium text-sm text-right">{supplement.name}</p>
            {supplement.dosage && <p className="text-xs text-gray-500 text-right">{supplement.dosage}</p>}
          </div>
          <div className={`flex-shrink-0 ${selectedIds.includes(supplement.id) ? "text-green-500" : "text-gray-300"}`}>
            <CheckCircle className="h-5 w-5" />
          </div>
        </motion.div>
      ))}
      {supplements.length === 0 && (
        <div className="p-4 text-center text-gray-500 col-span-2 bg-gray-50 rounded-lg text-right" dir="rtl">
          هیچ مکملی یافت نشد
        </div>
      )}
    </div>
  );
};

export default SupplementSelector;
