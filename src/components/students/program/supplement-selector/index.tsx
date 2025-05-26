
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Supplement } from "@/types/supplement";
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
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  activeTab,
}) => {
  // Get currently selected items based on activeTab
  const selectedItems = activeTab === 'supplement' ? selectedSupplements : selectedVitamins;
  const setSelectedItems = activeTab === 'supplement' ? setSelectedSupplements : setSelectedVitamins;

  // Filter supplements based on activeTab only
  const filteredItems = React.useMemo(() => {
    return supplements.filter(item => item.type === activeTab);
  }, [supplements, activeTab]);

  // Toggle selection of an item
  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="h-full flex flex-col text-right" dir="rtl">
      <div className="mb-4 text-center" dir="rtl">
        <h3 className="text-lg font-semibold text-indigo-700 text-right">
          {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
        </h3>
      </div>

      {/* Item Grid */}
      <ScrollArea className="flex-1" dir="rtl">
        <div dir="rtl">
          <SupplementGrid 
            filteredItems={filteredItems}
            selectedItems={selectedItems}
            toggleItem={toggleItem}
            searchQuery=""
            selectedCategory={null}
            clearFilters={() => {}}
          />
        </div>
      </ScrollArea>
      
      {/* Selected count */}
      <div dir="rtl">
        <SupplementStatistics 
          filteredItemsCount={filteredItems.length}
          selectedItemsCount={selectedItems.length}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
