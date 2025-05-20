
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Check, Search, Pill, Clock, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  selectedCategory,
  setSelectedCategory
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

  // Check if an item is selected
  const isSelected = (id: number) => {
    return selectedItems.includes(id);
  };

  // Reset filters when tab changes
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory(null);
  }, [activeTab, setSelectedCategory]);

  return (
    <div className="h-full flex flex-col">
      {/* Category Selection */}
      <Card className="p-3 space-y-2 mb-4">
        <h4 className="text-sm font-medium">دسته‌بندی</h4>
        <ScrollArea className="h-10" orientation="horizontal">
          <div className="flex space-x-2 space-x-reverse">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className={cn(
                "whitespace-nowrap",
                selectedCategory === null && "bg-purple-600"
              )}
              onClick={() => setSelectedCategory(null)}
            >
              همه
              {selectedCategory === null && <Check className="mr-1 h-3 w-3" />}
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={cn(
                  "whitespace-nowrap",
                  selectedCategory === category && "bg-purple-600"
                )}
                onClick={() => setSelectedCategory(prev => prev === category ? null : category)}
              >
                {category}
                {selectedCategory === category && <Check className="mr-1 h-3 w-3" />}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={`جستجوی ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>

      {/* Display active filters */}
      {selectedCategory && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant="outline"
            className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            {selectedCategory}
            <button
              onClick={() => setSelectedCategory(null)}
              className="h-3.5 w-3.5 rounded-full bg-blue-200 text-blue-700 hover:bg-blue-300 inline-flex items-center justify-center"
            >
              <span className="sr-only">Remove</span>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.877075 0.877075L5.12292 5.12292M0.877075 5.12292L5.12292 0.877075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Badge>
        </div>
      )}

      {/* Item Grid */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className={cn(
                      "relative p-3 cursor-pointer border-2 hover:border-purple-300 transition-all overflow-hidden",
                      isSelected(item.id) && "border-purple-500 bg-purple-50"
                    )}
                    onClick={() => toggleItem(item.id)}
                  >
                    {isSelected(item.id) && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-purple-500 text-white flex items-center justify-center h-6 w-6 rounded-bl-md">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-1 pl-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Pill className="h-4 w-4 text-purple-500" />
                        <h5 className="font-medium text-sm">{item.name}</h5>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.category && (
                          <Badge variant="outline" className="text-xs bg-blue-50 border-blue-100 text-blue-700">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Display dosage and timing information */}
                      {(item.dosage || item.timing) && (
                        <div className="flex flex-col gap-1 mt-3 text-xs text-gray-600">
                          {item.dosage && (
                            <div className="flex items-center gap-1">
                              <List className="h-3 w-3 text-purple-500" />
                              <span className="font-medium">دوز مصرف:</span>
                              <span>{item.dosage}</span>
                            </div>
                          )}
                          {item.timing && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-purple-500" />
                              <span className="font-medium">زمان مصرف:</span>
                              <span>{item.timing}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center p-8">
                <div className="flex justify-center mb-3">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Pill className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-1">موردی یافت نشد</h3>
                <p className="text-muted-foreground text-sm">
                  با تغییر معیارهای جستجو یا فیلتر، موارد بیشتری را مشاهده کنید
                </p>
                {(searchQuery || selectedCategory) && (
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    پاک کردن فیلترها
                  </Button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
      
      {/* Selected count */}
      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
        <span>
          {toPersianNumbers(filteredItems.length)} {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} نمایش داده شده
        </span>
        <span>
          {toPersianNumbers(selectedItems.length)} مورد انتخاب شده
        </span>
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
