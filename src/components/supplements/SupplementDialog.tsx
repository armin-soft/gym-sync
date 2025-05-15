
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

interface SupplementDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { supplements: number[]; vitamins: number[] }) => boolean;
  studentName: string;
  initialSupplements: number[];
  initialVitamins: number[];
  supplements: any[];
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onClose,
  onSave,
  studentName,
  initialSupplements,
  initialVitamins,
  supplements
}) => {
  const [activeTab, setActiveTab] = useState("supplements");
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedSupplements(initialSupplements || []);
      setSelectedVitamins(initialVitamins || []);
    }
  }, [open, initialSupplements, initialVitamins]);

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
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    if (success) {
      onClose();
    }
  };

  // Filter supplements based on search query and active tab
  const filteredItems = supplements.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "supplements" 
      ? item.category === "supplement"
      : item.category === "vitamin";
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>انتخاب مکمل‌ها و ویتامین‌ها برای {studentName}</DialogTitle>
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
          <Button variant="outline" onClick={onClose} className="ml-2">
            انصراف
          </Button>
          <Button onClick={handleSave}>
            ذخیره مکمل‌ها و ویتامین‌ها
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
