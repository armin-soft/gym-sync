
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Supplement } from "@/types/supplement";
import SupplementCard from "./SupplementCard";

interface StudentSupplementSelectorProps {
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  activeTab: 'supplement' | 'vitamin';
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  activeTab,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);

  useEffect(() => {
    let filtered = supplements.filter(item => 
      item.type === (activeTab === 'supplement' ? 'supplement' : 'vitamin')
    );

    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [supplements, activeTab, searchQuery, selectedCategory]);

  const handleToggleItem = (id: number) => {
    if (activeTab === 'supplement') {
      setSelectedSupplements(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    }
  };

  const isSelected = (id: number) => {
    return activeTab === 'supplement' 
      ? selectedSupplements.includes(id)
      : selectedVitamins.includes(id);
  };

  const getUniqueCategories = () => {
    const categories = filteredItems
      .map(item => item.category)
      .filter((category, index, self) => category && self.indexOf(category) === index);
    return categories;
  };

  return (
    <div className="space-y-4 h-full flex flex-col text-right" dir="rtl">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-right"
            dir="rtl"
          />
        </div>

        {getUniqueCategories().length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-xs"
            >
              همه
            </Button>
            {getUniqueCategories().map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground">
              هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className={cn(
              "gap-3",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col"
            )}
          >
            <AnimatePresence>
              {filteredItems.map(item => (
                <SupplementCard
                  key={item.id}
                  item={item}
                  isSelected={isSelected(item.id)}
                  onSelect={handleToggleItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
