
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
import { motion } from "framer-motion";

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

  // Function to trigger refresh after saving
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Wrapper functions to trigger refresh after saving
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
  } = useStudentFiltering(students, exercises, categories);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/70 dark:from-gray-900/90 dark:via-gray-900 dark:to-indigo-950/80">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent_70%)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.100/20%),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.900/30%),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-500/5 to-transparent" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto py-8 relative z-10 space-y-8 px-4"
      >
        <motion.div variants={itemVariants} className="flex flex-col space-y-6">
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
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          {/* Decorative gradient blob */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-sky-200/20 dark:from-indigo-900/20 dark:to-sky-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-full blur-3xl" />
          
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/50 border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 relative">
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
        </motion.div>

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
      </motion.div>
    </div>
  );
};

export default StudentsPage;
