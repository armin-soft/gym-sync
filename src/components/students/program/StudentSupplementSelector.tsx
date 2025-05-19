
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Pill } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Supplement } from "@/types/supplement";

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
  
  const toggleSupplement = (supplementId: number) => {
    if (selectedSupplements.includes(supplementId)) {
      setSelectedSupplements(prev => prev.filter(id => id !== supplementId));
    } else {
      setSelectedSupplements(prev => [...prev, supplementId]);
    }
  };
  
  const toggleVitamin = (vitaminId: number) => {
    if (selectedVitamins.includes(vitaminId)) {
      setSelectedVitamins(prev => prev.filter(id => id !== vitaminId));
    } else {
      setSelectedVitamins(prev => [...prev, vitaminId]);
    }
  };

  const filteredSupplements = searchQuery.trim() === "" 
    ? supplements.filter(s => s.type === "supplement")
    : supplements.filter(s => 
        s.type === "supplement" && (
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      
  const filteredVitamins = searchQuery.trim() === "" 
    ? supplements.filter(s => s.type === "vitamin")
    : supplements.filter(s => 
        s.type === "vitamin" && (
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );

  // Group supplements by category for better organization
  const supplementsByCategory: Record<string, Supplement[]> = {};
  filteredSupplements.forEach(supplement => {
    const category = supplement.category || "سایر";
    if (!supplementsByCategory[category]) {
      supplementsByCategory[category] = [];
    }
    supplementsByCategory[category].push(supplement);
  });
  
  // Group vitamins by category
  const vitaminsByCategory: Record<string, Supplement[]> = {};
  filteredVitamins.forEach(vitamin => {
    const category = vitamin.category || "سایر";
    if (!vitaminsByCategory[category]) {
      vitaminsByCategory[category] = [];
    }
    vitaminsByCategory[category].push(vitamin);
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="supplements" value={activeTab} onValueChange={setActiveTab as any} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-[300px]">
          <TabsTrigger value="supplements" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span>مکمل‌ها</span>
          </TabsTrigger>
          <TabsTrigger value="vitamins" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span>ویتامین‌ها</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TabsContent value="supplements" className="m-0">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-amber-500" />
                  مکمل‌های انتخاب شده ({selectedSupplements.length})
                </h4>
                
                <ScrollArea className="h-[300px] pr-4">
                  {selectedSupplements.length === 0 ? (
                    <div className="text-center p-6 text-muted-foreground">
                      هنوز مکملی انتخاب نشده است.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedSupplements.map(supplementId => {
                        const supplementInfo = supplements.find(s => s.id === supplementId);
                        if (!supplementInfo) return null;
                        
                        return (
                          <div key={supplementId} className="border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{supplementInfo.name}</div>
                                {supplementInfo.category && (
                                  <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 mt-1">
                                    {supplementInfo.category}
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                onClick={() => toggleSupplement(supplementId)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {supplementInfo.description && (
                              <div className="mt-2 text-sm text-slate-600">
                                {supplementInfo.description}
                              </div>
                            )}
                            
                            {(supplementInfo.dosage || supplementInfo.timing) && (
                              <div className="flex gap-2 mt-2 text-xs text-slate-500">
                                {supplementInfo.dosage && <span>دوز: {supplementInfo.dosage}</span>}
                                {supplementInfo.timing && <span>زمان: {supplementInfo.timing}</span>}
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
          </TabsContent>
          
          <TabsContent value="vitamins" className="m-0">
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Pill className="h-4 w-4 text-purple-500" />
                  ویتامین‌های انتخاب شده ({selectedVitamins.length})
                </h4>
                
                <ScrollArea className="h-[300px] pr-4">
                  {selectedVitamins.length === 0 ? (
                    <div className="text-center p-6 text-muted-foreground">
                      هنوز ویتامینی انتخاب نشده است.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedVitamins.map(vitaminId => {
                        const vitaminInfo = supplements.find(s => s.id === vitaminId);
                        if (!vitaminInfo) return null;
                        
                        return (
                          <div key={vitaminId} className="border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{vitaminInfo.name}</div>
                                {vitaminInfo.category && (
                                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 mt-1">
                                    {vitaminInfo.category}
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                onClick={() => toggleVitamin(vitaminId)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {vitaminInfo.description && (
                              <div className="mt-2 text-sm text-slate-600">
                                {vitaminInfo.description}
                              </div>
                            )}
                            
                            {(vitaminInfo.dosage || vitaminInfo.timing) && (
                              <div className="flex gap-2 mt-2 text-xs text-slate-500">
                                {vitaminInfo.dosage && <span>دوز: {vitaminInfo.dosage}</span>}
                                {vitaminInfo.timing && <span>زمان: {vitaminInfo.timing}</span>}
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
          </TabsContent>
          
          <Card className="shadow-sm row-span-2">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">لیست {activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}</h4>
              <Input
                placeholder={`جستجوی ${activeTab === "supplements" ? "مکمل" : "ویتامین"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3"
              />
              
              <ScrollArea className="h-[300px] pr-4">
                {activeTab === "supplements" && Object.entries(supplementsByCategory).map(([category, categorySupplements]) => {
                  if (categorySupplements.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-medium mb-2 text-slate-600">{category}</h5>
                      <div className="space-y-2">
                        {categorySupplements.map(supplement => (
                          <div 
                            key={supplement.id} 
                            className={`border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 ${
                              selectedSupplements.includes(supplement.id) ? 'border-amber-500 bg-amber-50' : ''
                            }`}
                            onClick={() => toggleSupplement(supplement.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={selectedSupplements.includes(supplement.id)}
                                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                              />
                              <div className="font-medium">{supplement.name}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSupplement(supplement.id);
                              }}
                            >
                              {selectedSupplements.includes(supplement.id) ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {activeTab === "vitamins" && Object.entries(vitaminsByCategory).map(([category, categoryVitamins]) => {
                  if (categoryVitamins.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-medium mb-2 text-slate-600">{category}</h5>
                      <div className="space-y-2">
                        {categoryVitamins.map(vitamin => (
                          <div 
                            key={vitamin.id} 
                            className={`border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 ${
                              selectedVitamins.includes(vitamin.id) ? 'border-purple-500 bg-purple-50' : ''
                            }`}
                            onClick={() => toggleVitamin(vitamin.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={selectedVitamins.includes(vitamin.id)}
                                className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                              />
                              <div className="font-medium">{vitamin.name}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVitamin(vitamin.id);
                              }}
                            >
                              {selectedVitamins.includes(vitamin.id) ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentSupplementSelector;
