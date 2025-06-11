
import { useStudentManagement } from "@/hooks/students/useStudentManagement";
import { useStudentExercises } from "@/hooks/students/useStudentExercises";
import { useStudentDiet } from "@/hooks/students/useStudentDiet";
import { useStudentSupplements } from "@/hooks/students/useStudentSupplements";
import StudentsHeader from "@/components/students/StudentsHeader";
import StudentCard from "@/components/students/StudentCard";
import EmptyStudentState from "@/components/students/EmptyStudentState";
import StudentFormDialog from "@/components/students/StudentFormDialog";
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";

const StudentsPage = () => {
  const {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    handleDelete,
    handleSave
  } = useStudentManagement();

  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  const { handleSaveDiet } = useStudentDiet(students, setStudents);
  const { handleSaveSupplements } = useStudentSupplements(students, setStudents);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleAddExercise = (student: Student) => {
    console.log("Adding exercise for:", student.name);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleFormSave = (studentData: Omit<Student, 'id'>) => {
    const success = handleSave(studentData, editingStudent?.id);
    if (success) {
      handleFormClose();
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <StudentsHeader 
        onAddStudent={() => setShowForm(true)}
        totalStudents={students.length}
      />
      
      {students.length === 0 ? (
        <EmptyStudentState onAddStudent={() => setShowForm(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddExercise={handleAddExercise}
            />
          ))}
        </div>
      )}

      <StudentFormDialog
        isOpen={showForm}
        onClose={handleFormClose}
        onSave={handleFormSave}
        student={editingStudent}
      />
    </div>
  );
};

export default StudentsPage;
