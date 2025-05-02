
import React from 'react';
import { PageHeader } from '../../../components/ui/page-header';
import { PageContainer } from '../../../components/ui/page-container';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import ContentStages from './components/ContentStages';
import CategorySelectionStage from './components/CategorySelectionStage';
import TypeSelectionStage from './components/TypeSelectionStage';
import ExercisesStage from './components/ExercisesStage';
import useHierarchicalView from './hooks/useHierarchicalView';

const HierarchicalView: React.FC = () => {
  const {
    currentStage,
    selectedCategoryId,
    selectedTypeId,
    handleCategorySelect,
    handleTypeSelect,
    handleBackToCategories,
    handleBackToTypes,
    handleExerciseSelect,
  } = useHierarchicalView();

  return (
    <PageContainer>
      <PageHeader
        title="نمای سلسله مراتبی تمرینات"
        description="تمرینات را بر اساس دسته‌بندی و نوع مشاهده کنید"
        actions={
          <Button variant="outline" size="sm">
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت به تمرینات
          </Button>
        }
      />

      <Card className="p-6">
        <ContentStages
          currentStage={currentStage}
          selectedCategoryName={selectedCategoryId ? "دسته‌بندی انتخاب شده" : undefined}
          selectedTypeName={selectedTypeId ? "نوع تمرین انتخاب شده" : undefined}
        />

        {currentStage === 'categories' && (
          <CategorySelectionStage onCategorySelect={handleCategorySelect} />
        )}

        {currentStage === 'types' && (
          <TypeSelectionStage
            categoryId={selectedCategoryId!}
            onTypeSelect={handleTypeSelect}
            onBack={handleBackToCategories}
          />
        )}

        {currentStage === 'exercises' && (
          <ExercisesStage
            categoryId={selectedCategoryId!}
            typeId={selectedTypeId!}
            onBack={handleBackToTypes}
            onExerciseSelect={handleExerciseSelect}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default HierarchicalView;
