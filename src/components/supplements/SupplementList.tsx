
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Info, FileText, Grid2X2, LayoutList } from "lucide-react";
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
import { useState } from "react";

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
  const [localViewMode, setLocalViewMode] = useState<"grid" | "list">(viewMode);
  
  // تغییر حالت نمایش در دستگاه‌های کوچک به صورت خودکار
  const effectiveViewMode = deviceInfo.isMobile ? "grid" : localViewMode;
  
  const toggleViewMode = () => {
    setLocalViewMode(prevMode => prevMode === "grid" ? "list" : "grid");
  };

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

  // نمایش شبکه‌ای (Grid view)
  if (effectiveViewMode === "grid") {
    return (
      <div className="flex flex-col space-y-4">
        {!deviceInfo.isMobile && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={toggleViewMode}
            >
              <LayoutList className="h-4 w-4" />
              <span className="text-xs">نمایش لیستی</span>
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
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
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-purple-100/50 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 h-full">
                  <div className="relative p-3 sm:p-4 flex flex-col h-full">
                    <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(supplement)}
                              className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
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
                              className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>حذف</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="mb-2 sm:mb-3">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-lg font-medium",
                          supplement.type === "supplement" 
                            ? "bg-purple-50 text-purple-600" 
                            : "bg-blue-50 text-blue-600"
                        )}>
                          {supplement.category}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold mt-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {supplement.name}
                      </h4>
                    </div>

                    <div className="space-y-2 text-sm mt-auto">
                      {supplement.description && (
                        <div className="flex items-start gap-2 text-gray-600">
                          <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 shrink-0 mt-0.5" />
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
      </div>
    );
  }

  // نمایش لیستی (List view - حالت پیش‌فرض)
  return (
    <div className="flex flex-col space-y-4">
      {!deviceInfo.isMobile && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={toggleViewMode}
          >
            <Grid2X2 className="h-4 w-4" />
            <span className="text-xs">نمایش شبکه‌ای</span>
          </Button>
        </div>
      )}
      
      <Card className={cn(
        "shadow-md border border-muted/40",
        deviceInfo.isMobile ? "p-1" : deviceInfo.isTablet ? "p-3" : "p-4"
      )} dir="rtl">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={cn(
                  "w-[40%] text-right",
                  deviceInfo.isMobile ? "text-xs px-2 py-2" : deviceInfo.isTablet ? "text-sm" : "text-base"
                )}>
                  نام مکمل
                </TableHead>
                <TableHead className={cn(
                  "text-right",
                  deviceInfo.isMobile ? "text-xs px-2 py-2" : deviceInfo.isTablet ? "text-sm" : "text-base"
                )}>
                  دسته‌بندی
                </TableHead>
                <TableHead className={cn(
                  "text-right",
                  deviceInfo.isMobile ? "text-xs px-2 py-2" : deviceInfo.isTablet ? "text-sm" : "text-base"
                )}>
                  نوع
                </TableHead>
                <TableHead className={cn(
                  "text-center",
                  deviceInfo.isMobile ? "text-xs px-2 py-2" : deviceInfo.isTablet ? "text-sm" : "text-base"
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
                      deviceInfo.isMobile ? "py-1.5 text-[10px] px-2" : deviceInfo.isTablet ? "py-2.5 text-xs" : "py-3 text-sm"
                    )}>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={cn(
                          "rounded-full flex items-center justify-center",
                          deviceInfo.isMobile ? "w-4 h-4" : deviceInfo.isTablet ? "w-5 h-5" : "w-6 h-6",
                          supplement.type === "supplement" 
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400" 
                            : "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        )}>
                          {supplement.type === "supplement" ? (
                            <Pill className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} />
                          ) : (
                            <Layers className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} />
                          )}
                        </div>
                        <span className={cn(
                          deviceInfo.isMobile ? "text-[10px] line-clamp-1" : deviceInfo.isTablet ? "text-xs" : "text-sm",
                          "max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-none"
                        )}>
                          {supplement.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={deviceInfo.isMobile ? "py-1.5 px-2" : deviceInfo.isTablet ? "py-2.5" : "py-3"}>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "rounded-full font-normal whitespace-nowrap",
                          deviceInfo.isMobile ? "text-[8px] px-1.5 py-0" : "text-xs",
                          supplement.type === "supplement" 
                            ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                            : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                        )}
                      >
                        {supplement.category}
                      </Badge>
                    </TableCell>
                    <TableCell className={deviceInfo.isMobile ? "py-1.5 px-2" : deviceInfo.isTablet ? "py-2.5" : "py-3"}>
                      <Badge 
                        className={cn(
                          "rounded-full whitespace-nowrap",
                          deviceInfo.isMobile ? "text-[8px] px-1.5 py-0" : "text-xs",
                          supplement.type === "supplement" 
                            ? "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950/40 dark:text-purple-400" 
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400"
                        )}
                      >
                        {supplement.type === "supplement" ? "مکمل" : "ویتامین"}
                      </Badge>
                    </TableCell>
                    <TableCell className={deviceInfo.isMobile ? "py-1.5 px-2" : deviceInfo.isTablet ? "py-2.5" : "py-3"}>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(supplement)}
                          className={cn(
                            "bg-background border-muted hover:bg-muted/10",
                            deviceInfo.isMobile ? "h-5 w-5" : deviceInfo.isTablet ? "h-6 w-6" : "h-7 w-7"
                          )}
                        >
                          <Edit className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onDelete(supplement.id)}
                          className={cn(
                            "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-500 dark:hover:border-red-800",
                            deviceInfo.isMobile ? "h-5 w-5" : deviceInfo.isTablet ? "h-6 w-6" : "h-7 w-7"
                          )}
                        >
                          <Trash2 className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} />
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
    </div>
  );
};
