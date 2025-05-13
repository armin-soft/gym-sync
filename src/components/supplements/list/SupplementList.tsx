
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List } from "lucide-react";
import { SupplementGridView } from "./SupplementGridView";
import { SupplementListView } from "./SupplementListView";
import { SupplementEmptyState } from "./SupplementEmptyState";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementListProps {
  supplements: Supplement[];
  categories: SupplementCategory[];
  onAddSupplement?: () => void;
  onEditSupplement?: (supplement: Supplement) => void;
  onDeleteSupplement?: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isLoading?: boolean;
  type: 'supplement' | 'vitamin';
}

export const SupplementList: React.FC<SupplementListProps> = ({
  supplements,
  categories,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
  isLoading = false,
  type,
}) => {
  const deviceInfo = useDeviceInfo();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSupplements = supplements.filter(item => 
    searchTerm ? 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : true
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? "" : categoryId);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex flex-col xs:flex-row gap-3 justify-between items-start xs:items-center">
        <div className="flex items-center gap-2 pb-1 overflow-x-auto max-w-full scrollbar-none pr-4">
          <Button
            variant={selectedCategory === "" ? "default" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={() => setSelectedCategory("")}
          >
            همه
          </Button>
          
          {categories
            .filter(cat => cat.type === type)
            .map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="shrink-0"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-8 w-8"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="جستجوی سریع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {!isLoading && filteredSupplements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="empty-state"
              className="h-full"
            >
              <SupplementEmptyState
                type={type}
                onAddClick={onAddSupplement}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                deviceInfo={deviceInfo}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="content"
              className="h-full pb-4"
            >
              <Tabs value={viewMode} className="h-full">
                <TabsContent value="grid" className="mt-0 h-full">
                  <SupplementGridView
                    supplements={filteredSupplements}
                    onEdit={onEditSupplement}
                    onDelete={onDeleteSupplement}
                    isLoading={isLoading}
                    type={type}
                    deviceInfo={deviceInfo}
                  />
                </TabsContent>
                <TabsContent value="list" className="mt-0 h-full">
                  <SupplementListView
                    supplements={filteredSupplements}
                    onEdit={onEditSupplement}
                    onDelete={onDeleteSupplement}
                    isLoading={isLoading}
                    type={type}
                    deviceInfo={deviceInfo}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SupplementList;
