
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseTypeCategoryProps {
  selectedType: string | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategoryId: number | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  exerciseTypes: any[];
  filteredCategories: any[];
  filteredExercises: any[];
  clearFilters: () => void;
}

const ExerciseTypeCategory: React.FC<ExerciseTypeCategoryProps> = ({
  selectedType,
  setSelectedType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  filteredExercises,
  clearFilters
}) => {
  return (
    <>
      <div className="mb-4 space-y-4">
        {/* نوع تمرین */}
        <div>
          <p className="mb-2 text-sm font-medium">نوع تمرین</p>
          <div className="flex flex-wrap gap-2">
            {exerciseTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedType === type
                    ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* دسته‌بندی تمرین - فقط نمایش اگر نوع انتخاب شده است */}
        {selectedType && (
          <div>
            <p className="mb-2 text-sm font-medium">دسته‌بندی</p>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    selectedCategoryId === category.id
                      ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {selectedType && selectedCategoryId ? (
            <span>
              نمایش {toPersianNumbers(filteredExercises.length)} تمرین برای{" "}
              <span className="font-semibold">{selectedType}</span>{" - "}
              <span className="font-semibold">
                {filteredCategories.find(c => c.id === selectedCategoryId)?.name}
              </span>
            </span>
          ) : selectedType ? (
            <span>لطفاً یک دسته‌بندی انتخاب کنید</span>
          ) : (
            <span>لطفاً ابتدا نوع تمرین را انتخاب کنید</span>
          )}
        </div>

        {(selectedType || selectedCategoryId) && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            پاک کردن فیلترها
            <X className="h-3 w-3 mr-1" />
          </Button>
        )}
      </div>
    </>
  );
};

export default ExerciseTypeCategory;
