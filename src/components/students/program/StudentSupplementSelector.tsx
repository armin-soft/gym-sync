
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Check, Search, Pill, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Supplement } from "@/types/supplement";

interface StudentSupplementSelectorProps {
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  activeTab: 'supplement' | 'vitamin';
  selectedTypes: {[key: string]: boolean};
  setSelectedTypes: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  activeTab,
  selectedTypes,
  setSelectedTypes
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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

  // Extract unique types for the current tab
  const types = React.useMemo(() => {
    const typeSet = new Set<string>();
    
    supplements
      .filter(item => item.type === activeTab)
      .forEach(item => {
        if (item.supplementType) typeSet.add(item.supplementType);
      });
    
    return Array.from(typeSet).sort();
  }, [supplements, activeTab]);

  // Get currently selected items based on activeTab
  const selectedItems = activeTab === 'supplement' ? selectedSupplements : selectedVitamins;
  const setSelectedItems = activeTab === 'supplement' ? setSelectedSupplements : setSelectedVitamins;

  // Filter supplements based on activeTab, search query, type filters, and category
  const filteredItems = React.useMemo(() => {
    return supplements.filter(item => {
      // Filter by tab type
      if (item.type !== activeTab) return false;
      
      // Filter by search
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Filter by category if selected
      if (selectedCategory && item.category !== selectedCategory) return false;
      
      // Filter by selected types
      if (Object.values(selectedTypes).some(v => v)) {
        return item.supplementType && selectedTypes[item.supplementType];
      }
      
      return true;
    });
  }, [supplements, activeTab, searchQuery, selectedTypes, selectedCategory]);

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
    setSelectedTypes({});
    setSelectedCategory(null);
  }, [activeTab]);

  return (
    <div className="h-full flex flex-col">
      {/* Type and Category Selection */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Type Selection */}
        <Card className="p-3 space-y-2">
          <h4 className="text-sm font-medium">نوع {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</h4>
          <ScrollArea className="h-10" orientation="horizontal">
            <div className="flex space-x-2 space-x-reverse">
              {types.map(type => (
                <Button 
                  key={type}
                  variant={selectedTypes[type] ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "whitespace-nowrap",
                    selectedTypes[type] && "bg-purple-600"
                  )}
                  onClick={() => setSelectedTypes(prev => ({
                    ...prev,
                    [type]: !prev[type]
                  }))}
                >
                  {type}
                  {selectedTypes[type] && <Check className="mr-1 h-3 w-3" />}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>
        
        {/* Category Selection */}
        <Card className="p-3 space-y-2">
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
      </div>

      {/* Search and Filter */}
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
      {(Object.values(selectedTypes).some(v => v) || selectedCategory) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(selectedTypes)
            .filter(([_, isSelected]) => isSelected)
            .map(([type]) => (
              <Badge 
                key={type}
                variant="outline"
                className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
              >
                {type}
                <button
                  onClick={() => setSelectedTypes(prev => ({...prev, [type]: false}))}
                  className="h-3.5 w-3.5 rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 inline-flex items-center justify-center"
                >
                  <span className="sr-only">Remove</span>
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.877075 0.877075L5.12292 5.12292M0.877075 5.12292L5.12292 0.877075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Badge>
            ))}
            
          {selectedCategory && (
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
          )}
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
                        {item.supplementType && (
                          <Badge variant="outline" className="text-xs bg-purple-50 border-purple-100 text-purple-700">
                            {item.supplementType}
                          </Badge>
                        )}
                        
                        {item.category && (
                          <Badge variant="outline" className="text-xs bg-blue-50 border-blue-100 text-blue-700">
                            {item.category}
                          </Badge>
                        )}
                      </div>
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
                {(searchQuery || Object.values(selectedTypes).some(v => v) || selectedCategory) && (
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTypes({});
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
          {filteredItems.length} {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} نمایش داده شده
        </span>
        <span>
          {selectedItems.length} مورد انتخاب شده
        </span>
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
