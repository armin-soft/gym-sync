
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Supplement } from "../hooks/useSupplementManagement";
import { 
  Pill, 
  Heart, 
  Edit2, 
  Trash2, 
  Clock, 
  Beaker,
  Tag,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementCardProps {
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      dir="rtl"
    >
      <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl rounded-2xl">
        {/* Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              {supplement.type === 'supplement' ? (
                <div className="w-12 h-12 bg-gradient-to-l from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                  <Pill className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-l from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="text-right min-w-0 flex-1">
                <h3 className="font-bold text-lg text-gray-800 leading-tight mb-1 truncate">
                  {supplement.name}
                </h3>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-gradient-to-l from-blue-50 to-indigo-50 border-blue-200 text-blue-700"
                >
                  <Tag className="w-3 h-3 ml-1" />
                  {supplement.category}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 space-y-3">
          {/* Description */}
          {supplement.description && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {supplement.description}
            </p>
          )}

          {/* Dosage */}
          {supplement.dosage ? (
            <div className="flex items-center justify-end gap-2 p-3 bg-gradient-to-l from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
              <span className="text-sm text-gray-700 font-medium">
                {toPersianNumbers(supplement.dosage)}
              </span>
              <span className="text-xs text-green-700 font-medium">
                دوز مصرف:
              </span>
              <Beaker className="w-4 h-4 text-green-600" />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200/50">
              <span className="text-sm text-gray-400">
                تعریف نشده
              </span>
              <span className="text-xs text-gray-500 font-medium">
                دوز مصرف:
              </span>
              <Beaker className="w-4 h-4 text-gray-400" />
            </div>
          )}

          {/* Timing */}
          {supplement.timing ? (
            <div className="flex items-center justify-end gap-2 p-3 bg-gradient-to-l from-orange-50 to-amber-50 rounded-lg border border-orange-200/50">
              <span className="text-sm text-gray-700 font-medium">
                {supplement.timing}
              </span>
              <span className="text-xs text-orange-700 font-medium">
                زمان مصرف:
              </span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200/50">
              <span className="text-sm text-gray-400">
                تعریف نشده
              </span>
              <span className="text-xs text-gray-500 font-medium">
                زمان مصرف:
              </span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
          )}

          {/* Benefits */}
          {supplement.benefits && supplement.benefits.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-green-700 font-medium">
                <CheckCircle className="w-3 h-3" />
                <span>فواید:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {supplement.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                    {benefit}
                  </Badge>
                ))}
                {supplement.benefits.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200 text-gray-600">
                    +{toPersianNumbers(supplement.benefits.length - 3)} مورد دیگر
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Side Effects */}
          {supplement.sideEffects && supplement.sideEffects.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-orange-700 font-medium">
                <AlertTriangle className="w-3 h-3" />
                <span>نکات مهم:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {supplement.sideEffects.slice(0, 2).map((effect, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-orange-50 border-orange-200 text-orange-700">
                    {effect}
                  </Badge>
                ))}
                {supplement.sideEffects.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200 text-gray-600">
                    +{toPersianNumbers(supplement.sideEffects.length - 2)} مورد دیگر
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Type Indicator */}
        <div className={cn(
          "absolute top-0 right-0 w-1 h-full",
          supplement.type === 'supplement' 
            ? "bg-gradient-to-b from-green-500 to-emerald-600" 
            : "bg-gradient-to-b from-purple-500 to-pink-600"
        )} />
      </Card>
    </motion.div>
  );
};
