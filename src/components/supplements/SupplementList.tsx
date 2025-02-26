
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import type { Supplement } from "@/types/supplement";

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
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
          <Info className="h-8 w-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">هیچ مکملی یافت نشد</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در این دسته‌بندی هنوز هیچ مکملی ثبت نشده است. برای شروع، روی دکمه "افزودن مکمل" کلیک کنید.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 border-purple-100 hover:border-purple-200">
              <div className="relative p-5">
                <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(supplement)}
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ویرایش مکمل</p>
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
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>حذف مکمل</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-1 group-hover:text-purple-600 transition-colors">
                    {supplement.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 font-medium">
                      {supplement.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-1">مقدار مصرف:</div>
                    <p className="text-sm text-muted-foreground">
                      {supplement.dosage}
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">زمان مصرف:</div>
                    <p className="text-sm text-muted-foreground">
                      {supplement.timing}
                    </p>
                  </div>
                  {supplement.description && (
                    <div>
                      <div className="text-sm font-medium mb-1">توضیحات:</div>
                      <p className="text-sm text-muted-foreground">
                        {supplement.description}
                      </p>
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
