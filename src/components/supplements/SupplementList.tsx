
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Info, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import type { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementList = ({
  supplements,
  onEdit,
  onDelete,
}: SupplementListProps) => {
  if (supplements.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center mx-auto mb-4">
          <Info className="h-8 w-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">هیچ موردی یافت نشد</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در این دسته‌بندی هنوز هیچ موردی ثبت نشده است. برای شروع، روی دکمه "افزودن" کلیک کنید.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {supplements.map((supplement) => (
          <motion.div
            key={supplement.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-purple-100/50 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
              <div className="relative p-4">
                <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(supplement)}
                          className="h-7 w-7 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ویرایش</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(supplement.id)}
                          className="h-7 w-7 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>حذف</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-lg bg-purple-50 text-purple-600 font-medium">
                      {supplement.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold mt-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                    {supplement.name}
                  </h4>
                </div>

                <div className="space-y-2 text-sm">
                  {supplement.description && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <FileText className="h-4 w-4 text-purple-500 shrink-0 mt-1" />
                      <span className="line-clamp-2 text-xs">{supplement.description}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
