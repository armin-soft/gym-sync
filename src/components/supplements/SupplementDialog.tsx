
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckSquare, Square, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SupplementType } from "@/hooks/supplements/types";
import { SupplementCategory } from "@/types/supplement";

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: SupplementType;
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
  type
}) => {
  const [activeTab, setActiveTab] = useState("supplements");
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && defaultValues) {
      // Initialize form with default values if provided
      setSelectedSupplements(defaultValues.supplements || []);
      setSelectedVitamins(defaultValues.vitamins || []);
    }
  }, [open, defaultValues]);

  const handleToggleSupplement = (id: number) => {
    if (activeTab === "supplements") {
      setSelectedSupplements(prev => 
        prev.includes(id) 
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) 
          ? prev.filter(itemId => itemId !== id)
          : [...prev, id]
      );
    }
  };

  const handleSave = () => {
    onSubmit({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
  };

  // Filter supplements based on search query and active tab
  const filteredItems = (categories || []).filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "supplements" 
      ? item.type === "supplement"
      : item.type === "vitamin";
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "افزودن" : "ویرایش"} {type === "supplement" ? "مکمل" : "ویتامین"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="supplements" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
            <TabsTrigger value="vitamins">ویتامین‌ها</TabsTrigger>
          </TabsList>
          
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جستجوی مکمل یا ویتامین..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsContent value="supplements" className="m-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <div className="space-y-2">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleToggleSupplement(item.id)}
                    >
                      <div className="mr-2">
                        {selectedSupplements.includes(item.id) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  مکملی با این مشخصات یافت نشد
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="vitamins" className="m-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length > 0 ? (
                <div className="space-y-2">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleToggleSupplement(item.id)}
                    >
                      <div className="mr-2">
                        {selectedVitamins.includes(item.id) ? (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  ویتامینی با این مشخصات یافت نشد
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="ml-2">
            انصراف
          </Button>
          <Button onClick={handleSave}>
            ذخیره
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
