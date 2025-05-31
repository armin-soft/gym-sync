
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SupplementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {supplements: number[], vitamins: number[]}) => void;
  student: Student;
  supplements: any[];
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  student,
  supplements
}) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(student.supplements || []);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(student.vitamins || []);
  
  // Filter supplements by type
  const supplementsList = supplements.filter(item => item.type === 'supplement');
  const vitaminsList = supplements.filter(item => item.type === 'vitamin');
  
  const handleToggleSupplement = (id: number) => {
    if (selectedSupplements.includes(id)) {
      setSelectedSupplements(selectedSupplements.filter(item => item !== id));
    } else {
      setSelectedSupplements([...selectedSupplements, id]);
    }
  };
  
  const handleToggleVitamin = (id: number) => {
    if (selectedVitamins.includes(id)) {
      setSelectedVitamins(selectedVitamins.filter(item => item !== id));
    } else {
      setSelectedVitamins([...selectedVitamins, id]);
    }
  };
  
  const handleSave = () => {
    onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]" aria-describedby="supplement-dialog-description">
        <DialogTitle>مکمل و ویتامین - {student.name}</DialogTitle>
        <DialogDescription id="supplement-dialog-description">
          برنامه مکمل و ویتامین برای {student.name} را تنظیم کنید.
        </DialogDescription>
        
        <Tabs defaultValue="supplements">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
            <TabsTrigger value="vitamins">ویتامین‌ها</TabsTrigger>
          </TabsList>
          
          <TabsContent value="supplements">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                {supplementsList.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                    <Checkbox 
                      id={`supplement-${item.id}`} 
                      checked={selectedSupplements.includes(item.id)}
                      onCheckedChange={() => handleToggleSupplement(item.id)}
                    />
                    <label htmlFor={`supplement-${item.id}`} className="mr-2 font-medium">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="vitamins">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                {vitaminsList.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                    <Checkbox 
                      id={`vitamin-${item.id}`} 
                      checked={selectedVitamins.includes(item.id)}
                      onCheckedChange={() => handleToggleVitamin(item.id)}
                    />
                    <label htmlFor={`vitamin-${item.id}`} className="mr-2 font-medium">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>انصراف</Button>
          <Button onClick={handleSave}>ذخیره برنامه</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
