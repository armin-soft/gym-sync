
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { MealList } from '@/components/diet/MealList';
import { useStudents } from '@/hooks/useStudents';

const StudentDietPage = () => {
  const { studentId } = useParams();
  const { students, handleSaveDiet } = useStudents();
  
  const student = students.find(s => s.id === Number(studentId));
  
  if (!student) {
    return <div>شاگرد یافت نشد</div>;
  }

  return (
    <div className="container py-6 min-h-screen">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">مدیریت برنامه غذایی {student.name}</h1>
        <MealList 
          meals={[]}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </Card>
    </div>
  );
};

export default StudentDietPage;
