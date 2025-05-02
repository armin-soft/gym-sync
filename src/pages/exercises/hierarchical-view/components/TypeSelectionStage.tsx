
import React, { useState, useEffect } from "react";
import { Search, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useExerciseTypes } from "@/hooks/useExerciseTypes";

interface TypeSelectionStageProps {
  onTypeSelect: (typeId: string) => void;
}

export const TypeSelectionStage: React.FC<TypeSelectionStageProps> = ({ onTypeSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { exerciseTypes, isLoading } = useExerciseTypes();
  
  const filteredTypes = exerciseTypes.filter(type => 
    !searchTerm || type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری انواع تمرین...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="h-full flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی نوع تمرین..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredTypes.length > 0 ? (
            filteredTypes.map((type) => (
              <motion.div 
                key={type}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-full"
              >
                <Card
                  className="h-full cursor-pointer bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  onClick={() => onTypeSelect(type)}
                >
                  <div className="h-full flex flex-col">
                    <div className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 p-6 flex items-center justify-center text-white">
                      <Dumbbell className="h-10 w-10" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-primary transition-colors">
                        {type}
                      </h3>
                      <div className="mt-2 group-hover:bg-primary/10 text-xs text-center py-1 px-2 rounded-full transition-colors">
                        انتخاب این نوع
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ نوع حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                با عبارت جستجو شده هیچ نوع حرکتی پیدا نشد.
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  پاک کردن جستجو
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TypeSelectionStage;
