
import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Separator } from '../../../../components/ui/separator';
import { useExerciseCategories } from '../../../../hooks/useExerciseCategories';

interface CategorySelectionStageProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelectionStage: React.FC<CategorySelectionStageProps> = ({ onCategorySelect }) => {
  const { categories, isLoading } = useExerciseCategories(""); // Passing empty string as selectedType

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">انتخاب دسته‌بندی تمرین</h2>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Card 
            key={category.id}
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => onCategorySelect(category.id.toString())}
          >
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {/* Icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                    <path d="M2 20h20"></path>
                    <path d="M14 12v.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description || 'توضیحاتی برای این دسته‌بندی ثبت نشده است'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {categories?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">هیچ دسته‌بندی تمرینی یافت نشد</p>
            <Button variant="outline" className="mt-4">
              افزودن دسته‌بندی جدید
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelectionStage;
