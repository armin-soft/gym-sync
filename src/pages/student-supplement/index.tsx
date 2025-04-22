
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SupplementList } from '@/components/supplements/SupplementList';
import { useStudents } from '@/hooks/useStudents';

const StudentSupplementPage = () => {
  const { studentId } = useParams();
  const { students, handleSaveSupplements } = useStudents();
  
  const student = students.find(s => s.id === Number(studentId));
  
  if (!student) {
    return <div>شاگرد یافت نشد</div>;
  }

  return (
    <div className="container py-6 min-h-screen">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">مدیریت مکمل و ویتامین {student.name}</h1>
        <SupplementList 
          supplements={[]}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </Card>
    </div>
  );
};

export default StudentSupplementPage;
