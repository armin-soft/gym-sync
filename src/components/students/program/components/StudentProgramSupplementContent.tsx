
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentSupplementSelector from "../StudentSupplementSelector";

interface StudentProgramSupplementContentProps {
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  supplements: any[];
}

const StudentProgramSupplementContent: React.FC<StudentProgramSupplementContentProps> = ({
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  supplements
}) => {
  return (
    <TabsContent value="supplement" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col">
        <h3 className="font-semibold text-lg mb-4">مکمل و ویتامین</h3>
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
