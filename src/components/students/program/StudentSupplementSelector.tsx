
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Pill, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

// تعریف مراحل انتخاب سلسله مراتبی
type SelectionStage = 'type' | 'category' | 'items';

interface StudentSupplementSelectorProps {
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [currentStage, setCurrentStage] = useState<SelectionStage>('type');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // تجمیع دسته‌بندی‌ها از لیست مکمل‌ها و ویتامین‌ها
  const getCategories = (type: "supplements" | "vitamins") => {
    const items = supplements.filter(s => 
      type === "supplements" ? s.type === "supplement" : s.type === "vitamin"
    );
    
    const categories = Array.from(new Set(items.map(item => item.category || "سایر")));
    return categories.sort();
  };
  
  // ایجاد لیست فیلتر شده بر اساس نوع و دسته‌بندی
  const getFilteredItems = (type: "supplements" | "vitamins", category: string | null) => {
    if (!category) return [];
    
    return supplements.filter(s => {
      const matchesType = type === "supplements" ? s.type === "supplement" : s.type === "vitamin";
      const matchesCategory = (s.category || "سایر") === category;
      const matchesSearch = searchQuery === "" || 
                           s.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesCategory && matchesSearch;
    });
  };
  
  // انتخاب یا حذف مکمل یا ویتامین
  const toggleItem = (itemId: number) => {
    if (activeTab === "supplements") {
      if (selectedSupplements.includes(itemId)) {
        setSelectedSupplements(prev => prev.filter(id => id !== itemId));
      } else {
        setSelectedSupplements(prev => [...prev, itemId]);
      }
    } else {
      if (selectedVitamins.includes(itemId)) {
        setSelectedVitamins(prev => prev.filter(id => id !== itemId));
      } else {
        setSelectedVitamins(prev => [...prev, itemId]);
      }
    }
  };
  
  // بررسی وضعیت انتخاب یک آیتم
  const isItemSelected = (itemId: number) => {
    return activeTab === "supplements" 
      ? selectedSupplements.includes(itemId)
      : selectedVitamins.includes(itemId);
  };
  
  // بازگشت به مرحله قبل
  const goBack = () => {
    if (currentStage === 'items') {
      setCurrentStage('category');
    } else if (currentStage === 'category') {
      setCurrentStage('type');
      setSelectedCategory(null);
    }
  };
  
  // انتخاب دسته‌بندی
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentStage('items');
  };
  
  // دریافت تعداد موارد انتخاب شده
  const getSelectedCount = () => {
    return activeTab === "supplements" 
      ? selectedSupplements.length 
      : selectedVitamins.length;
  };
  
  // نمایش مرحله انتخاب نوع (مکمل یا ویتامین)
  const renderTypeSelection = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8 space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          انتخاب نوع
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          <Button
            onClick={() => {
              setActiveTab("supplements");
              setCurrentStage('category');
            }}
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-32 space-y-2 border-2 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <Pill className="h-12 w-12 text-amber-500" />
            <span className="text-lg font-medium">مکمل‌ها</span>
            <span className="text-xs text-muted-foreground">
              {toPersianNumbers(selectedSupplements.length)} مورد انتخاب شده
            </span>
          </Button>
          
          <Button
            onClick={() => {
              setActiveTab("vitamins");
              setCurrentStage('category');
            }}
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-32 space-y-2 border-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Pill className="h-12 w-12 text-purple-500" />
            <span className="text-lg font-medium">ویتامین‌ها</span>
            <span className="text-xs text-muted-foreground">
              {toPersianNumbers(selectedVitamins.length)} مورد انتخاب شده
            </span>
          </Button>
        </div>
      </div>
    );
  };
  
  // نمایش مرحله انتخاب دسته‌بندی
  const renderCategorySelection = () => {
    const categories = getCategories(activeTab);
    const typeTitle = activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها";
    const typeColor = activeTab === "supplements" ? "text-amber-500" : "text-purple-500";
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4 pb-2 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2" 
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            <span>بازگشت</span>
          </Button>
          <h3 className={`text-lg font-semibold ${typeColor}`}>
            انتخاب دسته‌بندی {typeTitle}
          </h3>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(category => (
              <div
                key={category}
                onClick={() => selectCategory(category)}
                className={cn(
                  "cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-200 h-28",
                  activeTab === "supplements" 
                    ? "hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-900/20" 
                    : "hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full mb-2",
                  activeTab === "supplements" ? "bg-amber-100 text-amber-600" : "bg-purple-100 text-purple-600"
                )}>
                  <Pill className="h-5 w-5" />
                </div>
                <span className="text-base font-medium text-center">{category}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {toPersianNumbers(
                    supplements.filter(s => 
                      (activeTab === "supplements" ? s.type === "supplement" : s.type === "vitamin") && 
                      (s.category || "سایر") === category
                    ).length
                  )} مورد
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  // نمایش مرحله انتخاب آیتم‌ها
  const renderItemsSelection = () => {
    const filteredItems = getFilteredItems(activeTab, selectedCategory);
    const typeTitle = activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها";
    const typeColor = activeTab === "supplements" ? "text-amber-500" : "text-purple-500";
    const selectedItems = activeTab === "supplements" ? selectedSupplements : selectedVitamins;
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-2 pb-2 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2" 
            onClick={goBack}
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            <span>بازگشت</span>
          </Button>
          <h3 className={`text-lg font-semibold ${typeColor}`}>
            {selectedCategory} ({typeTitle})
          </h3>
        </div>
        
        <div className="mb-3">
          <Input
            placeholder={`جستجو در ${selectedCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-900"
          />
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="h-full shadow-sm">
            <CardContent className="p-4 h-full flex flex-col">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Pill className={cn("h-4 w-4", activeTab === "supplements" ? "text-amber-500" : "text-purple-500")} />
                <span>موارد انتخاب شده</span>
                <Badge variant="outline" className={cn(
                  "mr-1", 
                  activeTab === "supplements" 
                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                    : "bg-purple-50 text-purple-700 border-purple-200"
                )}>
                  {toPersianNumbers(getSelectedCount())}
                </Badge>
              </h4>
              
              <ScrollArea className="flex-1 pr-4">
                {selectedItems.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground">
                    هنوز موردی انتخاب نشده است.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedItems.map(itemId => {
                      const itemInfo = supplements.find(s => s.id === itemId);
                      if (!itemInfo) return null;
                      
                      return (
                        <div key={itemId} className="border rounded-md p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{itemInfo.name}</div>
                              {itemInfo.category && (
                                <Badge variant="outline" className={cn(
                                  "text-xs mt-1",
                                  activeTab === "supplements" 
                                    ? "bg-amber-50 text-amber-700 border-amber-200" 
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                )}>
                                  {itemInfo.category}
                                </Badge>
                              )}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              onClick={() => toggleItem(itemId)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {itemInfo.description && (
                            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                              {itemInfo.description}
                            </div>
                          )}
                          
                          {(itemInfo.dosage || itemInfo.timing) && (
                            <div className="flex gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                              {itemInfo.dosage && <span>دوز: {itemInfo.dosage}</span>}
                              {itemInfo.timing && <span>زمان: {itemInfo.timing}</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="h-full shadow-sm">
            <CardContent className="p-4 h-full flex flex-col">
              <h4 className="font-medium mb-3">لیست موجود</h4>
              
              {filteredItems.length === 0 ? (
                searchQuery ? (
                  <div className="text-center p-6 text-muted-foreground">
                    موردی با عبارت جستجو شده یافت نشد.
                  </div>
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    در این دسته‌بندی موردی یافت نشد.
                  </div>
                )
              ) : (
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-2">
                    {filteredItems.map(item => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800",
                          isItemSelected(item.id) 
                            ? activeTab === "supplements" 
                              ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" 
                              : "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : ""
                        )}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={isItemSelected(item.id)}
                            className={cn(
                              activeTab === "supplements" 
                                ? "data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500" 
                                : "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                            )}
                          />
                          <div className="font-medium">{item.name}</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(item.id);
                          }}
                        >
                          {isItemSelected(item.id) ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  // نمایش مرحله فعلی
  const renderStage = () => {
    switch (currentStage) {
      case 'type':
        return renderTypeSelection();
      case 'category':
        return renderCategorySelection();
      case 'items':
        return renderItemsSelection();
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            موارد انتخاب شده: 
          </span>
          <Badge variant="outline" className="mr-2 bg-white dark:bg-gray-700">
            مکمل: {toPersianNumbers(selectedSupplements.length)}
          </Badge>
          <Badge variant="outline" className="mr-1 bg-white dark:bg-gray-700">
            ویتامین: {toPersianNumbers(selectedVitamins.length)}
          </Badge>
        </div>
        
        <div className="flex-shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentStage('type')}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            شروع مجدد
          </Button>
        </div>
      </div>
      
      <Card className="flex-1 shadow-sm">
        <CardContent className="p-4 h-full">
          {renderStage()}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSupplementSelector;
