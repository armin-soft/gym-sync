
import React from "react";
import { Check, Pill, Clock, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Supplement } from "@/types/supplement";

interface SupplementCardProps {
  item: Supplement;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  item,
  isSelected,
  onSelect
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "relative p-3 cursor-pointer border-2 hover:border-purple-300 transition-all overflow-hidden",
          isSelected && "border-purple-500 bg-purple-50"
        )}
        onClick={() => onSelect(item.id)}
      >
        {isSelected && (
          <div className="absolute top-0 right-0">
            <div className="bg-purple-500 text-white flex items-center justify-center h-6 w-6 rounded-bl-md">
              <Check className="h-3.5 w-3.5" />
            </div>
          </div>
        )}
        
        <div className="pt-1 pl-1">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="h-4 w-4 text-purple-500" />
            <h5 className="font-medium text-sm">{item.name}</h5>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {item.category && (
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-100 text-blue-700">
                {item.category}
              </Badge>
            )}
          </div>
          
          {/* Display dosage and timing information */}
          {(item.dosage || item.timing) && (
            <div className="flex flex-col gap-1 mt-3 text-xs text-gray-600">
              {item.dosage && (
                <div className="flex items-center gap-1">
                  <List className="h-3 w-3 text-purple-500" />
                  <span className="font-medium">دوز مصرف:</span>
                  <span>{item.dosage}</span>
                </div>
              )}
              {item.timing && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-purple-500" />
                  <span className="font-medium">زمان مصرف:</span>
                  <span>{item.timing}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default SupplementCard;
