
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgramDietHeaderProps {
  handleSave: () => void;
  isSaving: boolean;
  currentDay?: number | null;
  title?: string;
  buttonColor?: string;
}

const ProgramDietHeader: React.FC<ProgramDietHeaderProps> = ({ 
  handleSave, 
  isSaving,
  currentDay = 1,
  title = "برنامه غذایی",
  buttonColor = "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">
        {title} {currentDay !== null ? `روز ${toPersianNumbers(currentDay)}` : ""}
      </h2>
      
      {currentDay !== null && (
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-1 bg-gradient-to-br ${buttonColor}`}
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>ذخیره برنامه روز {toPersianNumbers(currentDay)}</span>
        </Button>
      )}
    </div>
  );
};

export default ProgramDietHeader;
