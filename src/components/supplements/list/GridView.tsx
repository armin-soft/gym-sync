
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Leaf, Info, MoreHorizontal, Syringe } from "lucide-react";

interface GridViewProps {
  supplements: any[];
}

export const GridView: React.FC<GridViewProps> = ({ supplements }) => {
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
        return "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case "creatine":
        return "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      case "preworkout":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "vitamins":
        return "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "recovery":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {supplements.map((supplement, index) => (
        <motion.div
          key={supplement.id || index}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
          className="group"
        >
          <Card className="overflow-hidden h-full hover:shadow-md transition-all border-slate-200/80 dark:border-slate-800/80">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={`${getCategoryColor(supplement.type)} px-2 py-1`}>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(supplement.type)}
                    <span>{supplement.type || "سایر"}</span>
                  </div>
                </Badge>
                
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <CardTitle className="text-lg mt-2 truncate">{supplement.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-1">
              <div className="text-sm text-muted-foreground h-16 line-clamp-3">
                {supplement.description || "توضیحات موجود نیست"}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {supplement.tags && supplement.tags.map((tag: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                
                {(!supplement.tags || supplement.tags.length === 0) && (
                  <Badge variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800/50">
                    مکمل
                  </Badge>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end p-4 pt-0">
              <Button size="sm" variant="outline" className="w-full">
                <Info className="mr-1 h-4 w-4" /> مشاهده جزئیات
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
