
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/useStudents";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudents();

  // تازه‌سازی هنگام تغییر localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
        console.log('Storage event detected, triggering refresh');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // دریافت نوع‌های تمرین و دسته‌بندی‌ها
  const { data: exerciseTypes = [] } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      return typesData ? JSON.parse(typesData) : [];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  // تازه‌سازی بعد از ذخیره
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // شبیه‌سازی یک رویداد ذخیره‌سازی برای تازه‌سازی در سایر تب‌ها
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  // توابع پوشش‌دهنده برای تازه‌سازی بعد از ذخیره
  const handleSaveExercisesWithRefresh = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exerciseIds, studentId, dayNumber);
    if (result) {
      console.log(`Exercise saved for day ${dayNumber}, triggering refresh`);
      triggerRefresh();
    }
    return result;
  }, [handleSaveExercises, triggerRefresh]);

  const handleSaveDietWithRefresh = useCallback((mealIds: number[], studentId: number) => {
    const result = handleSaveDiet(mealIds, studentId);
    if (result) {
      console.log('Diet saved, triggering refresh');
      triggerRefresh();
    }
    return result;
  }, [handleSaveDiet, triggerRefresh]);

  const handleSaveSupplementsWithRefresh = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    if (result) {
      console.log('Supplements saved, triggering refresh');
      triggerRefresh();
    }
    return result;
  }, [handleSaveSupplements, triggerRefresh]);

  const {
    searchQuery,
    setSearchQuery,
    sortOrder,
    sortField,
    toggleSort,
    selectedExerciseType,
    setSelectedExerciseType,
    selectedCategory,
    setSelectedCategory,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students, exercises);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        <div className="flex flex-col space-y-6">
          <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
          
          <StudentStatsCards students={students} />
          
          <StudentSearchSort 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
            selectedExerciseType={selectedExerciseType}
            setSelectedExerciseType={setSelectedExerciseType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            exerciseTypes={exerciseTypes}
            categories={categories}
            showExerciseFilters={true}
          />
        </div>

        <Card className="backdrop-blur-xl bg-white/50 border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white/60">
          <StudentsTable 
            students={students}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            searchQuery={searchQuery}
            refreshTrigger={refreshTrigger}
            onEdit={(student: Student) => dialogManagerRef.current?.handleEdit(student)}
            onDelete={handleDelete}
            onAddExercise={(student: Student) => dialogManagerRef.current?.handleAddExercise(student)}
            onAddDiet={(student: Student) => dialogManagerRef.current?.handleAddDiet(student)}
            onAddSupplement={(student: Student) => dialogManagerRef.current?.handleAddSupplement(student)}
            onDownload={(student: Student) => dialogManagerRef.current?.handleDownload(student)}
            onAddStudent={() => dialogManagerRef.current?.handleAdd()}
            onClearSearch={handleClearSearch}
          />
        </Card>

        <StudentDialogManager
          ref={dialogManagerRef}
          onSave={handleSave}
          onSaveExercises={handleSaveExercisesWithRefresh}
          onSaveDiet={handleSaveDietWithRefresh}
          onSaveSupplements={handleSaveSupplementsWithRefresh}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
