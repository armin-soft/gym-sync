
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StudentSupplementSelectorProps {
  supplements: any[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  activeTab?: 'supplement' | 'vitamin';
  selectedTypes?: {[key: string]: boolean};
  setSelectedTypes?: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  activeTab = 'supplement',
  selectedTypes = {},
  setSelectedTypes = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  // فیلتر آیتم‌ها بر اساس نوع (supplement یا vitamin) و جستجو
  useEffect(() => {
    const filtered = supplements.filter(item => {
      // فیلتر بر اساس نوع (مکمل یا ویتامین)
      const typeMatch = activeTab === 'supplement' 
        ? item.type === 'supplement' 
        : item.type === 'vitamin';
      
      // فیلتر بر اساس عبارت جستجو
      const searchMatch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // فیلتر بر اساس دسته‌بندی انتخاب شده
      const hasSelectedCategories = Object.values(selectedTypes).some(selected => selected);
      const categoryMatch = !hasSelectedCategories || (item.category && selectedTypes[item.category]);
      
      return typeMatch && searchMatch && categoryMatch;
    });
    
    setFilteredItems(filtered);
  }, [supplements, searchQuery, activeTab, selectedTypes]);
  
  // استخراج دسته‌بندی‌های موجود
  useEffect(() => {
    const uniqueCategories = [...new Set(
      supplements
        .filter(item => activeTab === 'supplement' ? item.type === 'supplement' : item.type === 'vitamin')
        .map(item => item.category)
        .filter(Boolean)
    )];
    
    setCategories(uniqueCategories as string[]);
  }, [supplements, activeTab]);
  
  // انتخاب یا حذف یک آیتم
  const toggleItem = (id: number) => {
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
  
  // بررسی اینکه آیا آیتم انتخاب شده است
  const isSelected = (id: number) => {
    return activeTab === 'supplement' 
      ? selectedSupplements.includes(id)
      : selectedVitamins.includes(id);
  };
  
  // تغییر وضعیت فیلتر دسته‌بندی
  const toggleCategory = (category: string) => {
    setSelectedTypes(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  return (
    <div className="flex flex-col h-full space-y-4 text-right">
      {/* Search Bar */}
      <div className="flex items-center relative bg-muted/20 rounded-lg border border-input/20">
        <Search className="absolute right-3 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 pr-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute left-3 text-muted-foreground hover:text-foreground"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1 py-2">
          {categories.map(category => (
            <Chip
              key={category}
              variant={selectedTypes[category] ? "default" : "outline"}
              onClick={() => toggleCategory(category)}
              className={selectedTypes[category] ? "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200" : ""}
            >
              {category}
            </Chip>
          ))}
        </div>
      )}
      
      {/* Items List */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100%-2rem)] pr-4">
          {filteredItems.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                  }}
                >
                  <div 
                    className={cn(
                      "flex items-center p-3 rounded-lg cursor-pointer border transition-all",
                      isSelected(item.id) 
                        ? "bg-purple-50 border-purple-200 shadow-sm" 
                        : "bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="shrink-0 ml-3">
                      <div className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full",
                        isSelected(item.id) ? "bg-purple-100" : "bg-gray-100"
                      )}>
                        {isSelected(item.id) ? (
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <PlusCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 text-right">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.category && (
                        <Badge variant="outline" className="mt-1 bg-gray-50 text-xs font-normal">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8 rounded-xl bg-muted/10 border border-border/30 backdrop-blur-sm">
                <div className="mb-2 mx-auto w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} با این عبارت یافت نشد` 
                    : `هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} برای نمایش وجود ندارد`}
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
