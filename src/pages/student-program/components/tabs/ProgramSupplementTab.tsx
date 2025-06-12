
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";

interface ProgramSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramSupplementTab: React.FC<ProgramSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements
}) => {
  return (
    <TabsContent value="supplement">
      <div className="p-4">
        <h3>مکمل و ویتامین {student.name}</h3>
      </div>
    </TabsContent>
  );
};

export default ProgramSupplementTab;
