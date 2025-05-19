
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";

interface StudentProgramHeaderProps {
  student: Student;
  onClose: () => void;
  handleSaveAll: () => void;
}

const StudentProgramHeader: React.FC<StudentProgramHeaderProps> = ({
  student,
  onClose,
  handleSaveAll
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">برنامه‌های {student.name}</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClose}>
          بازگشت
        </Button>
        <Button onClick={handleSaveAll}>
          <Save className="h-4 w-4 ml-2" />
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default StudentProgramHeader;
