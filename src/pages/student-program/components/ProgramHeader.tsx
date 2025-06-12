
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProgramHeaderProps {
  studentName: string;
  onBack: () => void;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ studentName, onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>
        <h1 className="text-xl font-bold">برنامه {studentName}</h1>
      </div>
    </div>
  );
};

export default ProgramHeader;
