
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Pill } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {supplements: number[], vitamins: number[]}) => boolean;
  initialSupplements?: number[];
  initialVitamins?: number[];
}

interface Supplement {
  id: number;
  name: string;
  description: string;
  dosage: string;
  type: 'supplement' | 'vitamin';
  category?: string;
  imageUrl?: string;
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
}: StudentSupplementDialogProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialSupplements);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialVitamins);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [currentTab, setCurrentTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("supplements");
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setSupplements(Array.isArray(parsedItems) ? parsedItems : []);
      }
    } catch (error) {
      console.error("Error loading supplements:", error);
      setSupplements([]);
    }
  }, []);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(
        supplements
          .filter((item) => item.category)
          .map((item) => item.category as string)
      )
    );
    setCategories(uniqueCategories);
  }, [supplements]);

  useEffect(() => {
    let filtered = supplements.filter(
      (item) => item.type === currentTab
    );
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchQuery, supplements, currentTab, selectedCategory]);

  const toggleItem = (itemId: number) => {
    if (currentTab === 'supplement') {
      setSelectedSupplements((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedVitamins((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  const handleSave = () => {
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    
    if (success) {
      onOpenChange(false);
    }
  };

  const handleChangeTab = (value: string) => {
    setCurrentTab(value as 'supplement' | 'vitamin');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 flex flex-col overflow-hidden m-0 rounded-none" dir="rtl">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Pill className="h-5 w-5 text-purple-600" />
            </div>
            <span>مکمل‌ها و ویتامین‌های {studentName}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs 
          defaultValue="supplement" 
          className="flex-1 flex flex-col overflow-hidden p-6"
          onValueChange={handleChangeTab}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 shrink-0">
            <TabsList className="h-10">
              <TabsTrigger value="supplement" className="px-4">مکمل‌ها</TabsTrigger>
              <TabsTrigger value="vitamin" className="px-4">ویتامین‌ها</TabsTrigger>
            </TabsList>
            
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`جستجو در ${currentTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}`}
                className="pl-3 pr-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {categories.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs h-8"
                >
                  همه دسته‌بندی‌ها
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs h-8"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <TabsContent value="supplement" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ScrollArea className="flex-1">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                    <Pill className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="font-medium text-lg">هیچ مکملی یافت نشد</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pr-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedSupplements.includes(item.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                            selectedSupplements.includes(item.id)
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedSupplements.includes(item.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            {item.category && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                            )}
                          </div>
                          {item.dosage && (
                            <div className="mt-2 text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">دوز مصرف</span>
                              <span>{item.dosage}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="vitamin" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
            <ScrollArea className="flex-1">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Pill className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-medium text-lg">هیچ ویتامینی یافت نشد</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pr-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedVitamins.includes(item.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                            selectedVitamins.includes(item.id)
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedVitamins.includes(item.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            {item.category && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                            )}
                          </div>
                          {item.dosage && (
                            <div className="mt-2 text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">دوز مصرف</span>
                              <span>{item.dosage}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t py-4 px-6 mt-auto shrink-0">
          <div className="text-sm font-medium mr-auto">
            {currentTab === 'supplement' ? 'مکمل‌های' : 'ویتامین‌های'} انتخاب شده:{" "}
            <span className="text-purple-600">{toPersianNumbers(
              currentTab === 'supplement' ? selectedSupplements.length : selectedVitamins.length
            )}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              <Save className="h-4 w-4" />
              ذخیره برنامه
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
