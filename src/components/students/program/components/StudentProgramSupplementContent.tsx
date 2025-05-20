
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../StudentSupplementSelector";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
  currentDay?: number;
}

const StudentProgramSupplementContent: React.FC<StudentProgramSupplementContentProps> = ({
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  supplements,
  currentDay = 1
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // به تاخیر انداختن ذخیره‌سازی برای نمایش وضعیت بارگذاری
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "ذخیره موفق",
        description: `برنامه مکمل و ویتامین روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شد`
      });
    }, 600);
  };

  return (
    <TabsContent value="supplement" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">
            مکمل و ویتامین (روز {toPersianNumbers(currentDay)})
          </h3>
          
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>ذخیره برنامه روز {toPersianNumbers(currentDay)}</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <StudentSupplementSelector 
            supplements={supplements}
            selectedSupplements={selectedSupplements}
            setSelectedSupplements={setSelectedSupplements}
            selectedVitamins={selectedVitamins}
            setSelectedVitamins={setSelectedVitamins}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramSupplementContent;
