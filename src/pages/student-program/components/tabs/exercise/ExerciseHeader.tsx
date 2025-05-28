
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface ExerciseHeaderProps {
  currentDay: number;
  onSave: () => void;
  isLoading: boolean;
  saveStatus: 'idle' | 'success' | 'error';
  onShowPdfPreview?: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  currentDay,
  onSave,
  isLoading,
  saveStatus,
  onShowPdfPreview
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">برنامه تمرینی - روز {currentDay}</h3>
      
      <div className="flex gap-2">
        {onShowPdfPreview && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowPdfPreview}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            <span>پیش‌نمایش PDF</span>
          </Button>
        )}
        <Button 
          onClick={onSave}
          disabled={isLoading}
          size="sm"
          className={`flex items-center gap-1 ${saveStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          <Save className="h-4 w-4" />
          {isLoading ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال ذخیره...
            </span>
          ) : (
            <span>ذخیره برنامه</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExerciseHeader;
