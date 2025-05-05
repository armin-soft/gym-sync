
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Pill, Edit, Trash2, Calendar, Clock, MoreVertical } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Supplement } from "@/types/supplement";

interface SupplementTableProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementTable: React.FC<SupplementTableProps> = ({
  supplements,
  onEdit,
  onDelete,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Get color scheme based on active tab
  const getColorScheme = (type: 'supplement' | 'vitamin') => {
    if (type === 'supplement') {
      return {
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        badgeBg: 'bg-purple-100 dark:bg-purple-900/30',
        badgeText: 'text-purple-700 dark:text-purple-400',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
      };
    } else {
      return {
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
        badgeText: 'text-blue-700 dark:text-blue-400',
        badgeBorder: 'border-blue-200 dark:border-blue-800',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
      };
    }
  };
  
  return (
    <div className="w-full overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[40%] font-medium">نام</TableHead>
            <TableHead className="font-medium">دسته‌بندی</TableHead>
            <TableHead className="font-medium">مقدار مصرف</TableHead>
            <TableHead className="font-medium">زمان مصرف</TableHead>
            <TableHead className="font-medium text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {supplements.map(supplement => {
              const colorScheme = getColorScheme(supplement.type as 'supplement' | 'vitamin');
              
              return (
                <motion.tr 
                  key={supplement.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`border-b border-muted/30 ${colorScheme.hoverBg} transition-colors group`}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorScheme.iconBg}`}>
                        {supplement.type === 'supplement' ? (
                          <FlaskConical className={`h-4 w-4 ${colorScheme.iconColor}`} />
                        ) : (
                          <Pill className={`h-4 w-4 ${colorScheme.iconColor}`} />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">{supplement.name}</span>
                        <div className="text-xs text-muted-foreground mt-0.5">کد: {supplement.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className={`${colorScheme.badgeBg} ${colorScheme.badgeText} border ${colorScheme.badgeBorder}`}>
                      {supplement.category}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-sm">
                    {supplement.dosage || "-"}
                  </TableCell>
                  
                  <TableCell className="text-sm">
                    {supplement.timing || "-"}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(supplement)}
                              className="h-8 w-8 opacity-70 group-hover:opacity-100"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>ویرایش</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(supplement.id)}
                              className="h-8 w-8 text-destructive opacity-70 group-hover:opacity-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>حذف</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[160px]">
                          <DropdownMenuItem onClick={() => onEdit(supplement)}>
                            <Edit className="h-4 w-4 ml-2" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onDelete(supplement.id)} className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};
