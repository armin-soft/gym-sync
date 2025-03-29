
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Pill, Save } from "lucide-react";
import { Student, Supplement } from "@/components/students/StudentTypes";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {supplements: number[], vitamins: number[]}) => boolean;
  initialSupplements: number[];
  initialVitamins: number[];
  supplements: any[];
}

export const StudentSupplementDialog: React.FC<StudentSupplementDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = [],
  supplements = [],
}) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialSupplements);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialVitamins);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  
  useEffect(() => {
    if (open) {
      console.log("Dialog opened with initialSupplements:", initialSupplements);
      console.log("Dialog opened with initialVitamins:", initialVitamins);
      setSelectedSupplements(initialSupplements);
      setSelectedVitamins(initialVitamins);
    }
  }, [open, initialSupplements, initialVitamins]);

  console.log("Current supplements:", selectedSupplements);
  console.log("Current vitamins:", selectedVitamins);

  const handleToggleSupplement = (id: number) => {
    setSelectedSupplements(prev => 
      prev.includes(id) 
        ? prev.filter(suppId => suppId !== id) 
        : [...prev, id]
    );
  };

  const handleToggleVitamin = (id: number) => {
    setSelectedVitamins(prev => 
      prev.includes(id) 
        ? prev.filter(vitId => vitId !== id) 
        : [...prev, id]
    );
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

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            مکمل‌ها و ویتامین‌های {studentName}
          </DialogTitle>
          <DialogDescription>
            مکمل‌ها و ویتامین‌های مورد نیاز را انتخاب کنید
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "supplements" | "vitamins")}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
            <TabsTrigger value="vitamins">ویتامین‌ها</TabsTrigger>
          </TabsList>
          
          <TabsContent value="supplements" className="mt-0">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {supplements
                  .filter(s => s.type !== 'vitamin')
                  .map((supplement) => (
                    <div 
                      key={supplement.id}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                        selectedSupplements.includes(supplement.id) 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => handleToggleSupplement(supplement.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedSupplements.includes(supplement.id) 
                            ? 'bg-primary text-white' 
                            : 'bg-muted-foreground/20'
                        }`}>
                          {selectedSupplements.includes(supplement.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span>{supplement.name}</span>
                      </div>
                    </div>
                  ))}
                {supplements.filter(s => s.type !== 'vitamin').length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    هیچ مکملی یافت نشد. لطفاً از بخش مکمل‌ها، مکمل‌های مورد نیاز را اضافه کنید.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="vitamins" className="mt-0">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {supplements
                  .filter(s => s.type === 'vitamin')
                  .map((vitamin) => (
                    <div 
                      key={vitamin.id}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                        selectedVitamins.includes(vitamin.id) 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => handleToggleVitamin(vitamin.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedVitamins.includes(vitamin.id) 
                            ? 'bg-primary text-white' 
                            : 'bg-muted-foreground/20'
                        }`}>
                          {selectedVitamins.includes(vitamin.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span>{vitamin.name}</span>
                      </div>
                    </div>
                  ))}
                {supplements.filter(s => s.type === 'vitamin').length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    هیچ ویتامینی یافت نشد. لطفاً از بخش مکمل‌ها، ویتامین‌های مورد نیاز را اضافه کنید.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>انصراف</Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            ذخیره ({selectedSupplements.length + selectedVitamins.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
