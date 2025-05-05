
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Pill, Layers } from "lucide-react";
import { motion } from "framer-motion";
import type { Supplement } from "@/types/supplement";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SupplementEmptyState } from "./SupplementEmptyState";

interface SupplementListViewProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  deviceInfo: any;
}

export const SupplementListView = ({ 
  supplements, 
  onEdit, 
  onDelete, 
  deviceInfo 
}: SupplementListViewProps) => {
  return (
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
              <SupplementEmptyState isTable deviceInfo={deviceInfo} />
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
  );
};
