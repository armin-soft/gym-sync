
import { useStudentManagement } from "@/hooks/students/useStudentManagement";
import { useStudentExercises } from "@/hooks/students/useStudentExercises";
import { useStudentDiet } from "@/hooks/students/useStudentDiet";
import { useStudentSupplements } from "@/hooks/students/useStudentSupplements";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentCard } from "@/components/students/StudentCard";
import { EmptyStudentState } from "@/components/students/EmptyStudentState";
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

  const handleDeleteStudent = (studentId: number) => {
    const studentToDelete = students.find(s => s.id === studentId);
    if (studentToDelete) {
      handleDelete(studentToDelete);
    }
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
      />
      
      {students.length === 0 ? (
        <EmptyStudentState 
          isSearching={false}
          onAddStudent={() => setShowForm(true)}
          onClearSearch={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDeleteStudent}
              onAddExercise={handleAddExercise}
            />
          ))}
        </div>
      )}

      <StudentFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        student={editingStudent}
        isEditing={!!editingStudent}
        onSave={handleFormSave}
      />
    </div>
  );
};

export default StudentsPage;
