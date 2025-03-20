
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/90 dark:from-gray-900/90 dark:via-gray-900 dark:to-indigo-950/90">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent_80%)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.100/40%),transparent_80%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.900/50%),transparent_80%)]" />
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-indigo-500/15 via-blue-500/10 to-transparent" />
      
      {/* Animated decorative elements */}
      <motion.div 
        className="absolute top-40 left-10 w-64 h-64 rounded-full bg-purple-300/15 dark:bg-purple-700/15 blur-3xl" 
        animate={{ 
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300/15 dark:bg-blue-700/15 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto py-12 relative z-10 space-y-10 px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <motion.div variants={itemVariants} className="flex flex-col space-y-8">
          <div className="relative">
            <motion.div 
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 dark:from-indigo-500/30 dark:to-purple-500/30 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
          </div>
          
          <StudentStatsCards students={students} />
          
          <motion.div 
            variants={itemVariants}
            className="relative p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/30 via-transparent to-blue-500/30 shadow-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 relative z-10">
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
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          {/* Decorative gradient blobs */}
          <motion.div 
            className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-indigo-200/30 to-sky-200/30 dark:from-indigo-900/40 dark:to-sky-900/40 rounded-full blur-3xl opacity-70"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
              x: [0, -10, 0],
              y: [0, 10, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 dark:from-purple-900/40 dark:to-indigo-900/40 rounded-full blur-3xl opacity-70"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/80 border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/15 dark:hover:shadow-indigo-500/25 relative rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/50 dark:to-transparent opacity-60 pointer-events-none" />
            <div className="absolute inset-0 border border-indigo-500/10 dark:border-indigo-500/20 rounded-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/70 via-blue-500/70 to-indigo-500/70"></div>
            
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
