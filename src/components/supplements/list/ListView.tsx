
import React from "react";
import { motion } from "framer-motion";
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
import { Pencil, Trash2, Eye, Pill, Leaf, Syringe } from "lucide-react";

interface ListViewProps {
  supplements: any[];
}

export const ListView: React.FC<ListViewProps> = ({ supplements }) => {
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "protein":
        return <Syringe className="h-4 w-4" />;
      case "vitamins":
        return <Leaf className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };
  
  const getCategoryColor = (type: string) => {
    switch (type) {
      case "protein":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "creatine":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "preworkout":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "vitamins":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "recovery":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>نام مکمل</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead className="hidden sm:table-cell">توضیحات</TableHead>
            <TableHead className="w-[120px] text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplements.map((supplement, index) => (
            <TableRow key={supplement.id || index} className="group">
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{supplement.name}</TableCell>
              <TableCell>
                <Badge className={`${getCategoryColor(supplement.type)} px-2 py-0.5`}>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(supplement.type)}
                    <span>{supplement.type || "سایر"}</span>
                  </div>
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell line-clamp-1 max-w-[300px]">
                {supplement.description || "توضیحات موجود نیست"}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100/50">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-100/50">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100/50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {supplements.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                هیچ مکملی یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
