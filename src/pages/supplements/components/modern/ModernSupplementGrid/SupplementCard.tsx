
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementCardProps {
  supplement: Supplement;
  activeTab: "supplement" | "vitamin";
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  activeTab,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${
          activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
        }`}>
          {activeTab === 'supplement' ? (
            <Pill className="w-4 h-4 text-green-600" />
          ) : (
            <Heart className="w-4 h-4 text-purple-600" />
          )}
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(supplement)}
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
          >
            <Edit2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(supplement.id)}
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="text-right space-y-2">
        <h3 className="font-medium text-gray-800">
          {supplement.name}
        </h3>
        
        <Badge variant="secondary" className="text-xs">
          {supplement.category}
        </Badge>

        {supplement.dosage && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">دوز:</span> {toPersianNumbers(supplement.dosage)}
          </p>
        )}

        {supplement.timing && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">زمان:</span> {supplement.timing}
          </p>
        )}
      </div>
    </motion.div>
  );
};
