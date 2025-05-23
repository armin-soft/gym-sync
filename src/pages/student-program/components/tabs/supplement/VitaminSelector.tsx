
import React from "react";
import { Supplement } from "@/types/supplement";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface VitaminSelectorProps {
  vitamins: Supplement[];
  selectedIds: number[];
  onChange: (newSelected: number[]) => void;
}

const VitaminSelector: React.FC<VitaminSelectorProps> = ({
  vitamins,
  selectedIds,
  onChange
}) => {
  const toggleVitamin = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(vid => vid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {vitamins.map(vitamin => (
        <motion.div
          key={vitamin.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleVitamin(vitamin.id)}
          className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 transition-colors ${
            selectedIds.includes(vitamin.id)
              ? "bg-blue-50 border-blue-300"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className={`flex-shrink-0 ${selectedIds.includes(vitamin.id) ? "text-blue-500" : "text-gray-300"}`}>
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="flex-grow">
            <p className="font-medium text-sm">{vitamin.name}</p>
            {vitamin.dosage && <p className="text-xs text-gray-500">{vitamin.dosage}</p>}
          </div>
        </motion.div>
      ))}
      {vitamins.length === 0 && (
        <div className="p-4 text-center text-gray-500 col-span-2 bg-gray-50 rounded-lg">
          هیچ ویتامینی یافت نشد
        </div>
      )}
    </div>
  );
};

export default VitaminSelector;
