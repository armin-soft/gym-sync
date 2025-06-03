
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Edit2, Trash2, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ItemCardProps {
  item: Supplement;
  onEdit: (item: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: "supplement" | "vitamin";
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  activeTab,
}) => {
  const getGradientColors = () => {
    return activeTab === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  const getIconColors = () => {
    return activeTab === "supplement"
      ? "text-emerald-600"
      : "text-cyan-600";
  };

  const getBgColors = () => {
    return activeTab === "supplement"
      ? "bg-emerald-50 hover:bg-emerald-100"
      : "bg-cyan-50 hover:bg-cyan-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={`p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 ${getBgColors()}`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${getGradientColors()} rounded-xl`}>
            {activeTab === "supplement" ? (
              <Pill className="w-6 h-6 text-white" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-9 w-9 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-xl"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600 rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
          
          {item.category && (
            <Badge variant="outline" className={`mb-3 ${getIconColors()} border-current`}>
              {item.category}
            </Badge>
          )}

          <div className="space-y-2">
            {item.dosage && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clipboard className={`w-4 h-4 ${getIconColors()}`} />
                <span className="font-medium">دوز:</span>
                <span>{toPersianNumbers(item.dosage)}</span>
              </div>
            )}

            {item.timing && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className={`w-4 h-4 ${getIconColors()}`} />
                <span className="font-medium">زمان:</span>
                <span>{toPersianNumbers(item.timing)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
