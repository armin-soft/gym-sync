
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FlaskConical, Pill, X, Save } from "lucide-react";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: { supplements: number[]; vitamins: number[] }) => void;
  initialSupplements?: number[];
  initialVitamins?: number[];
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
}: StudentSupplementDialogProps) {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialSupplements);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialVitamins);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");

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

  useEffect(() => {
    setSelectedSupplements(initialSupplements);
    setSelectedVitamins(initialVitamins);
  }, [initialSupplements, initialVitamins]);

  const handleSaveSelections = () => {
    onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins,
    });
    onOpenChange(false);
  };

  const toggleItem = (id: number, type: "supplement" | "vitamin") => {
    if (type === "supplement") {
      setSelectedSupplements((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const filteredSupplements = supplements.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = s.type === (activeTab === "supplements" ? "supplement" : "vitamin");
    return matchesSearch && matchesType;
  });

  const getSelectedItems = () =>
    activeTab === "supplements" ? selectedSupplements : selectedVitamins;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-[98vw] h-[98vh] max-h-[98vh] flex flex-col overflow-hidden p-0" dir="rtl">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              {activeTab === "supplements" ? (
                <FlaskConical className="h-5 w-5 text-purple-600" />
              ) : (
                <Pill className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <span>انتخاب مکمل و ویتامین برای {studentName}</span>
          </DialogTitle>
          <DialogDescription>
            مکمل ها و ویتامین های مورد نیاز را انتخاب کنید
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 flex flex-col h-full overflow-hidden">
          <Tabs
            defaultValue="supplements"
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "supplements" | "vitamins")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="supplements" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                مکمل ها
              </TabsTrigger>
              <TabsTrigger value="vitamins" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                ویتامین ها
              </TabsTrigger>
            </TabsList>

            <div className="relative mb-6 flex-shrink-0">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`جستجو در ${
                  activeTab === "supplements" ? "مکمل ها" : "ویتامین ها"
                }...`}
                className="pl-3 pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <TabsContent value="supplements" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(98vh-300px)]">
                {filteredSupplements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <FlaskConical className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="font-medium text-lg">هیچ مکملی یافت نشد</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      مکمل مورد نظر شما موجود نیست یا هنوز هیچ مکملی ثبت نشده است
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
                    {filteredSupplements.map((supplement) => (
                      <div
                        key={supplement.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedSupplements.includes(supplement.id)
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                        onClick={() => toggleItem(supplement.id, "supplement")}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                              selectedSupplements.includes(supplement.id)
                                ? "border-purple-500 bg-purple-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedSupplements.includes(supplement.id) && (
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
                          <div>
                            <div className="flex justify-between">
                              <h4 className="font-medium">{supplement.name}</h4>
                              {supplement.category && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                  {supplement.category}
                                </span>
                              )}
                            </div>
                            {supplement.description && (
                              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                {supplement.description}
                              </p>
                            )}
                            {supplement.dosage && (
                              <p className="text-xs text-gray-600 mt-2">
                                دوز مصرفی: {supplement.dosage}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="vitamins" className="mt-0 flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(98vh-300px)]">
                {filteredSupplements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Pill className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="font-medium text-lg">هیچ ویتامینی یافت نشد</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      ویتامین مورد نظر شما موجود نیست یا هنوز هیچ ویتامینی ثبت نشده است
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4">
                    {filteredSupplements.map((vitamin) => (
                      <div
                        key={vitamin.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedVitamins.includes(vitamin.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleItem(vitamin.id, "vitamin")}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                              selectedVitamins.includes(vitamin.id)
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedVitamins.includes(vitamin.id) && (
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
                          <div>
                            <div className="flex justify-between">
                              <h4 className="font-medium">{vitamin.name}</h4>
                              {vitamin.category && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                  {vitamin.category}
                                </span>
                              )}
                            </div>
                            {vitamin.description && (
                              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                {vitamin.description}
                              </p>
                            )}
                            {vitamin.dosage && (
                              <p className="text-xs text-gray-600 mt-2">
                                دوز مصرفی: {vitamin.dosage}
                              </p>
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
          
          <div className="border-t mt-auto pt-4 flex justify-between items-center">
            <div className="text-sm font-medium">
              {activeTab === "supplements" ? "مکمل" : "ویتامین"}های انتخاب شده:{" "}
              <span className={activeTab === "supplements" ? "text-purple-600" : "text-blue-600"}>
                {toPersianNumbers(getSelectedItems().length)}
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
                onClick={handleSaveSelections}
                className={`gap-2 ${
                  activeTab === "supplements"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    : "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700"
                }`}
              >
                <Save className="h-4 w-4" />
                ذخیره {activeTab === "supplements" ? "مکمل ها" : "ویتامین ها"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
