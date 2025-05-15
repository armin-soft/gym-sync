import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Grid2X2, 
  LayoutGrid, 
  LayoutList, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SelectionControls } from "./selection-controls";
import { ExerciseGrid } from "../exercise-grid";
import { ExerciseList } from "../exercise-list";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Add these states and handlers to fix the build errors
const ExercisesStage = ({ 
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  exercises,
  onSelect,
  initialSelection = [],
  maxSelection = 5
}) => {
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <TabsContent 
      value="all" 
      className="rounded-lg relative flex-1 overflow-hidden flex flex-col bg-card"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center gap-2 p-3 sm:p-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی تمرین..."
              className="rounded-full pr-9 text-sm h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={sortOrder === "asc" ? "opacity-70" : ""}
              onClick={toggleSortOrder}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            
            <div className={cn(
              "flex rounded-full overflow-hidden border",
              deviceInfo.isMobile ? "hidden" : "block"
            )}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none h-9 w-9",
                  viewMode === "grid" ? "bg-muted text-foreground" : ""
                )}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none h-9 w-9",
                  viewMode === "list" ? "bg-muted text-foreground" : ""
                )}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full h-9 w-9",
                showFilters ? "bg-muted text-foreground" : ""
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.div
              key="filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-3 sm:p-4 border-b"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.id)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex-1 overflow-hidden">
          {viewMode === "grid" ? (
            <ExerciseGrid
              exercises={exercises}
              onSelect={onSelect}
              initialSelection={initialSelection}
              maxSelection={maxSelection}
            />
          ) : (
            <ExerciseList
              exercises={exercises}
              onSelect={onSelect}
              initialSelection={initialSelection}
              maxSelection={maxSelection}
            />
          )}
        </div>
      </motion.div>
    </TabsContent>
  );
};

export default ExercisesStage;
