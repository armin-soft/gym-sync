
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import StudentExerciseDialog from '@/components/exercises/StudentExerciseDialog';
import { ExerciseTabContent } from '@/components/exercises/ExerciseTabContent';
import { useStudents } from '@/hooks/useStudents';

const StudentExercisePage = () => {
  const { studentId } = useParams();
  const { students, handleSaveExercises } = useStudents();
  const [open, setOpen] = useState(false);
  
  const student = students.find(s => s.id === Number(studentId));
  
  if (!student) {
    return <div>شاگرد یافت نشد</div>;
  }

  return (
    <div className="container py-6 min-h-screen">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">مدیریت تمرین‌های {student.name}</h1>
        <ExerciseTabContent 
          selectedExercises={student.exercises || []}
          toggleExercise={(id) => {}}
          dayNumber={1}
          tabValue="day1"
          viewMode="grid"
          setViewMode={() => {}}
          filteredExercises={[]}
          categories={[]}
          handleClearSearch={() => {}}
          handleSaveExercises={(exerciseIds) => 
            handleSaveExercises(exerciseIds, Number(studentId), 1)
          }
          selectedCategoryId={null}
          toggleSortOrder={() => {}}
          sortOrder="asc"
        />
      </Card>
    </div>
  );
};

export default StudentExercisePage;
