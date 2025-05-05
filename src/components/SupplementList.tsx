
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Info, FileText, Beaker, Pill, Clock, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import type { Supplement } from "@/types/supplement";
import { cn } from "@/lib/utils";

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
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-blue-50 flex items-center justify-center mx-auto mb-4">
          <Info className="h-8 w-8 text-violet-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">هیچ موردی یافت نشد</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در این دسته‌بندی هنوز هیچ موردی ثبت نشده است. برای شروع، روی دکمه "افزودن" کلیک کنید.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {supplements.map((supplement) => (
          <motion.div
            key={supplement.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className={cn(
              "group overflow-hidden transition-all duration-500 h-full",
              "border-transparent hover:border-slate-200 dark:hover:border-slate-700/70",
              "hover:shadow-xl backdrop-blur-sm",
              supplement.type === "supplement" 
                ? "bg-gradient-to-br from-white via-violet-50/10 to-violet-100/20 hover:from-violet-50/30 hover:to-violet-100/30 dark:from-slate-900 dark:via-slate-900 dark:to-violet-900/5 dark:hover:to-violet-900/10" 
                : "bg-gradient-to-br from-white via-blue-50/10 to-blue-100/20 hover:from-blue-50/30 hover:to-blue-100/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-900/5 dark:hover:to-blue-900/10"
            )}>
              <div className="relative p-5 flex flex-col h-full">
                <div className="absolute top-3 right-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    supplement.type === "supplement"
                      ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  )}>
                    {supplement.type === "supplement" ? (
                      <Beaker className="h-4 w-4" />
                    ) : (
                      <Pill className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(supplement)}
                          className="h-7 w-7 rounded-lg hover:bg-white/80 hover:text-violet-600 transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
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
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>حذف</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="mb-3 mt-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-md font-medium",
                      supplement.type === "supplement" 
                        ? "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      {supplement.category}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold mt-1 mb-1 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                    {supplement.name}
                  </h4>
                  
                  {supplement.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-3">
                      {supplement.description}
                    </p>
                  )}
                </div>

                {(supplement.dosage || supplement.timing) && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    {supplement.dosage && (
                      <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <HelpCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{supplement.dosage}</span>
                      </div>
                    )}
                    {supplement.timing && (
                      <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{supplement.timing}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
