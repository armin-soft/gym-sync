
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypeSelectorProps {
  exerciseTypes: string[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  onAddType?: () => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  exerciseTypes,
  selectedType,
  onSelectType,
  onAddType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTypes = exerciseTypes.filter(type => 
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Reset search term when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-between bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-900"
      >
        <span>{selectedType || "انتخاب نوع تمرین"}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              انتخاب نوع تمرین
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی نوع تمرین..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10"
            />
          </div>
          
          <div className="overflow-y-auto max-h-[50vh]">
            {filteredTypes.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {filteredTypes.map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        console.log("Type selected in selector:", type);
                        onSelectType(type);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full justify-between transition-all duration-200",
                        selectedType === type && "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-700"
                      )}
                    >
                      <span>{type}</span>
                      {selectedType === type && <Check className="h-4 w-4 text-indigo-600" />}
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">هیچ نوع حرکتی یافت نشد</p>
                {onAddType && (
                  <Button onClick={() => {
                    onAddType();
                    setIsOpen(false);
                  }}>
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن نوع جدید
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {onAddType && (
            <div className="mt-4 text-center pt-4 border-t">
              <Button onClick={() => {
                onAddType();
                setIsOpen(false);
              }} variant="outline">
                <Plus className="h-4 w-4 ml-2" />
                افزودن نوع جدید
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
