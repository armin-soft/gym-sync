
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Info } from "lucide-react";
import { Supplement } from "@/types/supplement";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementList = ({ supplements, onEdit, onDelete }: SupplementListProps) => {
  return (
    <Card className="p-6 overflow-hidden shadow-md">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold">نام مکمل</TableHead>
              <TableHead className="font-bold">دسته‌بندی</TableHead>
              <TableHead className="font-bold">دوز مصرف</TableHead>
              <TableHead className="font-bold">زمان مصرف</TableHead>
              <TableHead className="font-bold">نوع</TableHead>
              <TableHead className="font-bold">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements.map((supplement) => (
              <motion.tr
                key={supplement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b hover:bg-muted/30 transition-colors duration-200"
              >
                <TableCell className="font-medium">{supplement.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
                  >
                    {supplement.category}
                  </Badge>
                </TableCell>
                <TableCell>{supplement.dosage}</TableCell>
                <TableCell>{supplement.timing}</TableCell>
                <TableCell>
                  <Badge 
                    className={supplement.type === "supplement" 
                      ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800" 
                      : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
                    }
                  >
                    {supplement.type === "supplement" ? "مکمل" : "ویتامین"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onEdit(supplement)}
                            className="h-8 w-8 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                          >
                            <Edit className="h-3.5 w-3.5 text-purple-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">ویرایش</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onDelete(supplement.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">حذف</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {supplement.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-xs">{supplement.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
            
            {supplements.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  هیچ موردی یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
