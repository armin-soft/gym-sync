
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Pill, MoreVertical, Edit, Trash2, Calendar, Clock } from "lucide-react";
import type { Supplement } from "@/types/supplement";

interface SupplementGridProps {
  supplements: Supplement[];
  onEdit: (supplement: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementGrid: React.FC<SupplementGridProps> = ({
  supplements,
  onEdit,
  onDelete,
  activeTab
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants for grid items
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Get color scheme based on active tab
  const getColorScheme = (type: 'supplement' | 'vitamin') => {
    if (type === 'supplement') {
      return {
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        badgeBg: 'bg-purple-100 dark:bg-purple-900/30',
        badgeText: 'text-purple-700 dark:text-purple-400',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
      };
    } else {
      return {
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
        badgeText: 'text-blue-700 dark:text-blue-400',
        badgeBorder: 'border-blue-200 dark:border-blue-800',
      };
    }
  };
  
  return (
    <motion.div 
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {supplements.map(supplement => {
        const colorScheme = getColorScheme(supplement.type as 'supplement' | 'vitamin');
        
        return (
          <motion.div key={supplement.id} variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-muted/70 hover:border-muted group">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorScheme.iconBg}`}>
                      {supplement.type === 'supplement' ? (
                        <FlaskConical className={`h-5 w-5 ${colorScheme.iconColor}`} />
                      ) : (
                        <Pill className={`h-5 w-5 ${colorScheme.iconColor}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-base">{supplement.name}</h3>
                      <Badge variant="outline" className={`mt-1 text-xs ${colorScheme.badgeBg} ${colorScheme.badgeText} border ${colorScheme.badgeBorder}`}>
                        {supplement.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-70 group-hover:opacity-100">
                        <MoreVertical className="h-4 w-4" />
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
                
                {(supplement.dosage || supplement.timing) && (
                  <div className="mt-4 pt-3 border-t text-sm text-muted-foreground space-y-2">
                    {supplement.dosage && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span>{supplement.dosage}</span>
                      </div>
                    )}
                    
                    {supplement.timing && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span>{supplement.timing}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                <span>کد: {supplement.id}</span>
                <span className="font-medium">
                  {supplement.type === 'supplement' ? 'مکمل' : 'ویتامین'}
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
