
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Supplement } from "@/types/supplement";
import { CategorySelector } from "@/components/nutrition/supplements/CategorySelector";
import SupplementSearch from "./SupplementSearch";
import ActiveFilters from "./ActiveFilters";
import SupplementGrid from "./SupplementGrid";
import SupplementStatistics from "./SupplementStatistics";

interface StudentSupplementSelectorProps {
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  activeTab: 'supplement' | 'vitamin';
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  dayLabel?: string;
  dayNumber?: number;
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
  dayLabel,
  dayNumber
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract unique categories for the current tab
  const categories = React.useMemo(() => {
    const categorySet = new Set<string>();
    
    supplements
      .filter(item => item.type === activeTab)
      .forEach(item => {
        if (item.category) categorySet.add(item.category);
      });
    
    return Array.from(categorySet).sort();
  }, [supplements, activeTab]);
  
  // Create category objects for our selector
  const categoryObjects = React.useMemo(() => {
    return categories.map((name, index) => ({
      id: index + 1,
      name,
      type: activeTab
    }));
  }, [categories, activeTab]);

  // Get currently selected items based on activeTab
  const selectedItems = activeTab === 'supplement' ? selectedSupplements : selectedVitamins;
  const setSelectedItems = activeTab === 'supplement' ? setSelectedSupplements : setSelectedVitamins;

  // Filter supplements based on activeTab, search query, and category
  const filteredItems = React.useMemo(() => {
    return supplements.filter(item => {
      // Filter by tab type
      if (item.type !== activeTab) return false;
      
      // Filter by search
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Filter by category if selected
      if (selectedCategory && item.category !== selectedCategory) return false;
      
      return true;
    });
  }, [supplements, activeTab, searchQuery, selectedCategory]);

  // Toggle selection of an item
  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  // Reset search when tab changes
  useEffect(() => {
    setSearchQuery("");
  }, [activeTab]);

  return (
    <div className="h-full flex flex-col text-right" dir="rtl">
      {dayLabel && (
        <div className="mb-4 text-center" dir="rtl">
          <h3 className="text-lg font-semibold text-indigo-700 text-right">
            {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} - {dayLabel}
          </h3>
        </div>
      )}
      
      {/* Category Selection */}
      <div className="p-3 space-y-2 mb-4 border rounded-lg text-right" dir="rtl">
        <h4 className="text-sm font-medium text-right">دسته‌بندی</h4>
        <div className="flex justify-end" dir="rtl">
          <CategorySelector 
            categories={categoryObjects}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            activeTab={activeTab}
          />
        </div>
      </div>

      {/* Search */}
      <div dir="rtl">
        <SupplementSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
        />
      </div>

      {/* Display active filters */}
      <div dir="rtl">
        <ActiveFilters 
          selectedCategory={selectedCategory} 
          clearCategory={() => setSelectedCategory(null)} 
        />
      </div>

      {/* Item Grid */}
      <ScrollArea className="flex-1" dir="rtl">
        <div dir="rtl">
          <SupplementGrid 
            filteredItems={filteredItems}
            selectedItems={selectedItems}
            toggleItem={toggleItem}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            clearFilters={clearFilters}
          />
        </div>
      </ScrollArea>
      
      {/* Selected count */}
      <div dir="rtl">
        <SupplementStatistics 
          filteredItemsCount={filteredItems.length}
          selectedItemsCount={selectedItems.length}
          activeTab={activeTab}
          dayLabel={dayLabel}
        />
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
