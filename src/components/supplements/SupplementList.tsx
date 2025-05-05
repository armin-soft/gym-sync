
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
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pill, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  viewMode?: "grid" | "list";
}

export const SupplementList = ({
  supplements,
  onEdit,
  onDelete,
  viewMode = "list",
}: SupplementListProps) => {
  const deviceInfo = useDeviceInfo();

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

  // Grid view display
  if (viewMode === "grid") {
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
  }

  // List view display (default)
  return (
    <Card className={cn(
      "shadow-md border border-muted/40",
      deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-4" : "p-6"
    )} dir="rtl">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={cn(
                "w-[40%] text-right",
                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
              )}>
                نام مکمل
              </TableHead>
              <TableHead className={cn(
                "text-right",
                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
              )}>
                دسته‌بندی
              </TableHead>
              <TableHead className={cn(
                "text-right",
                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
              )}>
                نوع
              </TableHead>
              <TableHead className={cn(
                "text-center",
                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
              )}>
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Pill className={cn(
                      "mb-2 opacity-40",
                      deviceInfo.isMobile ? "h-6 w-6" : deviceInfo.isTablet ? "h-7 w-7" : "h-8 w-8"
                    )} />
                    <p className={cn(
                      "font-medium",
                      deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : "text-lg"
                    )}>
                      هیچ موردی یافت نشد
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              supplements.map((supplement) => (
                <motion.tr
                  key={supplement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-muted/30 hover:bg-muted/5 transition-colors group"
                >
                  <TableCell className={cn(
                    "font-medium",
                    deviceInfo.isMobile ? "py-2 text-xs" : deviceInfo.isTablet ? "py-3 text-sm" : "py-4 text-base"
                  )}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={cn(
                        "rounded-full flex items-center justify-center",
                        deviceInfo.isMobile ? "w-6 h-6" : deviceInfo.isTablet ? "w-7 h-7" : "w-8 h-8",
                        supplement.type === "supplement" 
                          ? "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400" 
                          : "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      )}>
                        {supplement.type === "supplement" ? (
                          <Pill className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                        ) : (
                          <Layers className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                        )}
                      </div>
                      <span className={deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"}>
                        {supplement.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={deviceInfo.isMobile ? "py-2" : deviceInfo.isTablet ? "py-3" : "py-4"}>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-full font-normal text-xs",
                        supplement.type === "supplement" 
                          ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                          : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                      )}
                    >
                      {supplement.category}
                    </Badge>
                  </TableCell>
                  <TableCell className={deviceInfo.isMobile ? "py-2" : deviceInfo.isTablet ? "py-3" : "py-4"}>
                    <Badge 
                      className={cn(
                        "rounded-full text-xs",
                        supplement.type === "supplement" 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950/40 dark:text-purple-400" 
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400"
                      )}
                    >
                      {supplement.type === "supplement" ? "مکمل" : "ویتامین"}
                    </Badge>
                  </TableCell>
                  <TableCell className={deviceInfo.isMobile ? "py-2" : deviceInfo.isTablet ? "py-3" : "py-4"}>
                    <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(supplement)}
                        className={cn(
                          "bg-background border-muted hover:bg-muted/10",
                          deviceInfo.isMobile ? "h-6 w-6" : deviceInfo.isTablet ? "h-7 w-7" : "h-8 w-8"
                        )}
                      >
                        <Edit className={deviceInfo.isMobile ? "h-3 w-3" : "h-3.5 w-3.5"} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(supplement.id)}
                        className={cn(
                          "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-500 dark:hover:border-red-800",
                          deviceInfo.isMobile ? "h-6 w-6" : deviceInfo.isTablet ? "h-7 w-7" : "h-8 w-8"
                        )}
                      >
                        <Trash2 className={deviceInfo.isMobile ? "h-3 w-3" : "h-3.5 w-3.5"} />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
