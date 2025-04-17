
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
import { Edit, Trash2, Pill, Layers } from "lucide-react";
import { Supplement } from "@/types/supplement";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SupplementListProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
}

export const SupplementList = ({ supplements, onEdit, onDelete }: SupplementListProps) => {
  return (
    <Card className="p-6 shadow-md border border-muted/40" dir="rtl">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] text-right">نام مکمل</TableHead>
              <TableHead className="text-right">دسته‌بندی</TableHead>
              <TableHead className="text-right">نوع</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Pill className="h-8 w-8 mb-2 opacity-40" />
                    <p className="font-medium">هیچ موردی یافت نشد</p>
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
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        supplement.type === "supplement" 
                          ? "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400" 
                          : "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                      )}>
                        {supplement.type === "supplement" ? (
                          <Pill className="h-4 w-4" />
                        ) : (
                          <Layers className="h-4 w-4" />
                        )}
                      </div>
                      <span>{supplement.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-full font-normal",
                        supplement.type === "supplement" 
                          ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-400" 
                          : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                      )}
                    >
                      {supplement.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "rounded-full",
                        supplement.type === "supplement" 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-950/40 dark:text-purple-400" 
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400"
                      )}
                    >
                      {supplement.type === "supplement" ? "مکمل" : "ویتامین"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(supplement)}
                        className="h-8 w-8 bg-background border-muted hover:bg-muted/10"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(supplement.id)}
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-500 dark:hover:border-red-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
