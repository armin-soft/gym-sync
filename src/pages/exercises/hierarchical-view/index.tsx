
import React from 'react';
import { PageHeader } from '../../../components/ui/page-header';
import { PageContainer } from '../../../components/ui/page-container';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import ContentStages from './components/ContentStages';
import TypeSelectionStage from './components/TypeSelectionStage';
import CategorySelectionStage from './components/CategorySelectionStage';
import ExercisesStage from './components/ExercisesStage';
import useHierarchicalView from './hooks/useHierarchicalView';
import { useExerciseData } from '../../../hooks/exercises/useExerciseData';

const HierarchicalView: React.FC = () => {
  const {
    currentStage,
    selectedTypeId,
    selectedCategoryId,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect,
  } = useHierarchicalView();

  const { exerciseTypes, categories } = useExerciseData();

  // یافتن نام نوع تمرین انتخاب شده
  const selectedTypeName = selectedTypeId
    ? exerciseTypes.find(type => type === selectedTypeId) || null
    : null;

  // یافتن نام دسته‌بندی انتخاب شده
  const selectedCategoryName = selectedCategoryId && categories
    ? categories.find(cat => cat.id.toString() === selectedCategoryId)?.name || null
    : null;

  return (
    <PageContainer>
      <PageHeader
        title="نمای سلسله مراتبی تمرینات"
        description="تمرینات را بر اساس نوع و دسته‌بندی مشاهده کنید"
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
          selectedTypeName={selectedTypeName}
          selectedCategoryName={selectedCategoryName}
        />

        {currentStage === 'types' && (
          <TypeSelectionStage onTypeSelect={handleTypeSelect} />
        )}

        {currentStage === 'categories' && (
          <CategorySelectionStage
            selectedTypeId={selectedTypeId!}
            onCategorySelect={handleCategorySelect}
            onBack={handleBackToTypes}
          />
        )}

        {currentStage === 'exercises' && (
          <ExercisesStage
            categoryId={selectedCategoryId!}
            typeId={selectedTypeId!}
            onBack={handleBackToCategories}
            onExerciseSelect={handleExerciseSelect}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default HierarchicalView;
