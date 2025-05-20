
import React from "react";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ProgramDietHeaderProps {
  handleSave: () => void;
  isSaving: boolean;
}

const ProgramDietHeader: React.FC<ProgramDietHeaderProps> = ({
  handleSave,
  isSaving,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
        <Utensils className="h-5 w-5 ml-2 text-green-500" />
        برنامه غذایی
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="flex items-center gap-1 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      >
        {isSaving ? (
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span>ذخیره</span>
      </Button>
    </div>
  );
};

export default ProgramDietHeader;
