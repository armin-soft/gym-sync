import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Save, X, FlaskConical, Pill } from "lucide-react";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (supplementIds: {supplements: number[], vitamins: number[]}) => void;
  initialData: {supplements: number[], vitamins: number[]};
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialData = {supplements: [], vitamins: []},
}: StudentSupplementDialogProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialData.supplements || []);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialData.vitamins || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [currentTab, setCurrentTab] = useState<"supplements" | "vitamins">("supplements");
  const [currentCategory, setCurrentCategory] = useState<string | "all">("all");
  const [categories, setCategories] = useState<{[key: string]: string[]}>({
    supplements: [],
    vitamins: []
  });

  // Load supplements from localStorage
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem("supplements");
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        setSupplements(Array.isArray(parsedSupplements) ? parsedSupplements : []);
      }
    } catch (error) {
      console.error("Error loading supplements:", error);
      setSupplements([]);
    }
  }, []);

  // Extract categories
  useEffect(() => {
    const supplementCategories = Array.from(
      new Set(
        supplements
          .filter(item => item.type === 'supplement')
          .map(item => item.category)
      )
    );
    
    const vitaminCategories = Array.from(
      new Set(
        supplements
          .filter(item => item.type === 'vitamin')
          .map(item => item.category)
      )
    );
    
    setCategories({
      supplements: supplementCategories,
      vitamins: vitaminCategories
    });
  }, [supplements]);

  // Filter supplements based on search query and category
  useEffect(() => {
    // Fix: Match item.type with the corresponding value based on currentTab
    let filtered = supplements.filter(item => 
      currentTab === "supplements" ? item.type === "supplement" : item.type === "vitamin"
    );
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (currentCategory !== "all") {
      filtered = filtered.filter((item) => item.category === currentCategory);
    }

    setFilteredItems(filtered);
  }, [searchQuery, supplements, currentTab, currentCategory]);

  const toggleItem = (itemId: number) => {
    if (currentTab === "supplements") {
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
    onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    onOpenChange(false);
  };

  const getCategoryChipColor = (category: string) => {
    const colorMap: {[key: string]: string} = {
      "پروتئین": "bg-blue-100 text-blue-700",
      "کربوهیدرات": "bg-yellow-100 text-yellow-700",
      "چربی": "bg-red-100 text-red-700",
      "آمینو اسید": "bg-green-100 text-green-700",
      "مولتی ویتامین": "bg-purple-100 text-purple-700",
      "اسید چرب": "bg-orange-100 text-orange-700",
      "ویتامین محلول در آب": "bg-cyan-100 text-cyan-700",
      "ویتامین محلول در چربی": "bg-rose-100 text-rose-700",
      "مینرال": "bg-emerald-100 text-emerald-700",
    };
    
    return colorMap[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] h-[750px] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-lg">
                {currentTab === "supplements" ? <FlaskConical className="h-5 w-5" /> : <Pill className="h-5 w-5" />}
              </span>
            </div>
            <span>
              {currentTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"} برای {studentName}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs 
          defaultValue="supplements" 
          className="w-full"
          onValueChange={(value) => setCurrentTab(value as "supplements" | "vitamins")}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="supplements" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              مکمل‌ها
            </TabsTrigger>
            <TabsTrigger value="vitamins" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              ویتامین‌ها
            </TabsTrigger>
          </TabsList>

          <div className="relative mb-4 flex-shrink-0">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`جستجو در ${currentTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
              className="pl-3 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-4 flex-shrink-0 overflow-x-auto">
            <div className="flex space-x-2 space-x-reverse">
              <Button
                variant={currentCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentCategory("all")}
                className="flex-shrink-0"
              >
                همه دسته‌ها
              </Button>
              {categories[currentTab].map((category) => (
                <Button
                  key={category}
                  variant={currentCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentCategory(category)}
                  className="flex-shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="supplements" className="mt-0">
            <ScrollArea className="flex-grow h-[450px] overflow-y-auto pr-4">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                    <FlaskConical className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="font-medium text-lg">مکملی یافت نشد</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    مکمل مورد نظر شما موجود نیست یا هنوز هیچ مکملی ثبت نشده است
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                        selectedSupplements.includes(item.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
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
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <span className={`text-xs ${getCategoryChipColor(item.category)} px-2 py-0.5 rounded mr-1`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="font-medium">مقدار مصرف:</span>
                          <span className="mr-1">{item.dosage}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="font-medium">زمان مصرف:</span>
                          <span className="mr-1">{item.timing}</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="vitamins" className="mt-0">
            <ScrollArea className="flex-grow h-[450px] overflow-y-auto pr-4">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Pill className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-lg">ویتامینی یافت نشد</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    ویتامین مورد نظر شما موجود نیست یا هنوز هیچ ویتامینی ثبت نشده است
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                        selectedVitamins.includes(item.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                          selectedVitamins.includes(item.id)
                            ? "border-blue-500 bg-blue-500"
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
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <span className={`text-xs ${getCategoryChipColor(item.category)} px-2 py-0.5 rounded mr-1`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="font-medium">مقدار مصرف:</span>
                          <span className="mr-1">{item.dosage}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="font-medium">زمان مصرف:</span>
                          <span className="mr-1">{item.timing}</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="border-t pt-4 mt-auto flex justify-between items-center flex-shrink-0">
          <div className="text-sm font-medium">
            {currentTab === "supplements" ? "مکمل‌های" : "ویتامین‌های"} انتخاب شده:{" "}
            <span className={currentTab === "supplements" ? "text-purple-600" : "text-blue-600"}>
              {toPersianNumbers(
                currentTab === "supplements" 
                  ? selectedSupplements.length 
                  : selectedVitamins.length
              )}
            </span>
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
              className={`gap-2 bg-gradient-to-r ${
                currentTab === "supplements"
                  ? "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  : "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
            >
              <Save className="h-4 w-4" />
              ذخیره {currentTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
