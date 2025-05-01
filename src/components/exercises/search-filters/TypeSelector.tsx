
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TypeSelectorProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  types: string[];
  isMobile: boolean;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  setSelectedType,
  types,
  isMobile
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Select
              value={selectedType || "all-types"}
              onValueChange={(value) => {
                setSelectedType(value === "all-types" ? "" : value);
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-11 text-sm border rounded-xl transition-all duration-300",
                  selectedType 
                    ? "border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                    : "bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50",
                  isMobile ? "min-w-[110px]" : "min-w-[160px]"
                )}
              >
                <SelectValue placeholder="نوع تمرین" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]" position="popper" side="bottom" sideOffset={5}>
                <SelectGroup>
                  <SelectLabel className="text-xs font-medium text-muted-foreground">نوع تمرین</SelectLabel>
                  <SelectItem value="all-types" className="flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <span>همه انواع</span>
                      {!selectedType && <Check className="h-4 w-4 opacity-70" />}
                    </div>
                  </SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type} className="flex items-center">
                      <div className="flex items-center justify-between w-full">
                        <span>{type}</span>
                        {selectedType === type && <Check className="h-4 w-4 opacity-70" />}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedType && (
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          انتخاب نوع تمرین
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
