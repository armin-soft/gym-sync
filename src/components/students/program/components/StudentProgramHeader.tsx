
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save, Dumbbell, Utensils, Pill } from "lucide-react";

interface StudentProgramHeaderProps {
  student: Student;
  onClose: () => void;
  handleSaveAll: () => void;
  activeTab?: string;
}

const StudentProgramHeader: React.FC<StudentProgramHeaderProps> = ({
  student,
  onClose,
  handleSaveAll,
  activeTab = "exercise"
}) => {
  // Get the appropriate icon and title based on the active tab
  const getTabInfo = () => {
    switch(activeTab) {
      case "exercise":
        return { icon: <Dumbbell className="h-5 w-5 text-indigo-600" />, title: "برنامه تمرینی" };
      case "diet":
        return { icon: <Utensils className="h-5 w-5 text-green-600" />, title: "برنامه غذایی" };
      case "supplement":
        return { icon: <Pill className="h-5 w-5 text-purple-600" />, title: "مکمل و ویتامین" };
      default:
        return { icon: <Dumbbell className="h-5 w-5" />, title: "برنامه تمرینی" };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="h-9 w-9"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            {tabInfo.icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {tabInfo.title} - {student.firstName} {student.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {student.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleSaveAll} className="bg-green-600 hover:bg-green-700 text-white gap-2">
        <Save className="h-4 w-4" />
        <span>ذخیره برنامه</span>
      </Button>
    </div>
  );
};

export default StudentProgramHeader;
