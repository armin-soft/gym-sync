
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[]) => boolean;
}

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  return (
    <TabsContent value="diet">
      <div className="p-4">
        <h3>برنامه غذایی {student.name}</h3>
      </div>
    </TabsContent>
  );
};

export default ProgramDietTab;
