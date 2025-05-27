
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Pill, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SupplementCardProps {
  supplement: {
    id: number;
    name: string;
    type: 'supplement' | 'vitamin';
    categoryId: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  onEdit,
  onDelete
}) => {
  const Icon = supplement.type === 'supplement' ? Pill : ShieldCheck;

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100 dark:border-indigo-800/50">
        <CardHeader className="p-3 pb-2 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50">
          <div className="flex items-center justify-between">
            <div className="bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full">
              <Icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-300">
              {supplement.type === 'supplement' ? 'مکمل' : 'ویتامین'}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 pt-2 text-center">
          <h4 className="font-medium line-clamp-2 min-h-[2.5rem]">{supplement.name}</h4>
        </CardContent>
        
        <CardFooter className="p-2 flex justify-center gap-2 border-t border-indigo-50 dark:border-indigo-900/50">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            onClick={onEdit}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
