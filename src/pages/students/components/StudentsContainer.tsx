
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/useStudents";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { StudentsList } from "./StudentsList";
import { StudentDialogManagerWrapper } from "@/components/students/StudentDialogManagerWrapper";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History } from "lucide-react";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { StudentHistoryTab } from "./StudentHistoryTab";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";

const StudentsContainer = () => {
  const {
    sortedAndFilteredStudents,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    viewMode,
    setViewMode,
    isProfileComplete,
    students,
    exercises,
    meals,
    supplements,
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    handleClearSearch
  } = useStudents();
  
  const { historyEntries, addHistoryEntry, clearHistory } = useStudentHistory();
  
  const dialogRef = useRef<any>(null);

  const handleAddStudent = () => {
    if (dialogRef.current) {
      dialogRef.current.handleAdd();
    }
  };

  const handleEdit = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleEdit(student);
    }
  };

  const handleAddExercise = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddExercise(student);
    }
  };

  const handleAddDiet = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddDiet(student);
    }
  };

  const handleAddSupplement = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddSupplement(student);
    }
  };

  const handleDownload = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleDownload(student);
    }
  };

  return (
    <div className="container px-0 md:px-4 flex flex-col h-[calc(100vh-4rem)]">
      <StudentsHeader onAddStudent={handleAddStudent} />
      
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <StudentSearchSort 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
          />
        </div>
        <div>
          <StudentsViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>
      </div>
      
      {!isProfileComplete && (
        <ProfileWarning 
          isProfileComplete={isProfileComplete}
          className="mb-6"
        />
      )}
      
      <StudentStatsCards students={students} />
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-auto">
          <TabsTrigger value="all" className="flex gap-1.5">
            <UserRound className="h-4 w-4" />
            <span>شاگردان</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex gap-1.5">
            <History className="h-4 w-4" />
            <span>تاریخچه</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 mt-4">
          <TabsContent value="all" className="flex-1 mt-0">
            <StudentsList 
              students={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              viewMode={viewMode}
              isProfileComplete={isProfileComplete}
              onAddStudent={handleAddStudent}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddExercise={handleAddExercise}
              onAddDiet={handleAddDiet}
              onAddSupplement={handleAddSupplement}
              onClearSearch={handleClearSearch}
              onDownload={handleDownload}
            />
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 h-full mt-0">
            <StudentHistoryTab 
              students={students} 
              historyEntries={historyEntries}
              onClearHistory={clearHistory}
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <StudentDialogManagerWrapper
        ref={dialogRef}
        onSave={(data, selectedStudent) => {
          const result = handleSave(data, selectedStudent);
          if (result && selectedStudent) {
            addHistoryEntry(
              {...selectedStudent, ...data},
              'edit',
              `اطلاعات ${data.name} بروزرسانی شد`
            );
          } else if (result) {
            const newStudent = { ...data, id: Date.now() } as Student;
            addHistoryEntry(
              newStudent,
              'edit',
              `شاگرد جدید ${data.name} افزوده شد`
            );
          }
          return result;
        }}
        onSaveExercises={(exercisesData, studentId, dayNumber) => {
          const result = handleSaveExercises(exercisesData, studentId, dayNumber);
          if (result) {
            const student = students.find(s => s.id === studentId);
            if (student) {
              addHistoryEntry(
                student,
                'exercise',
                `برنامه تمرینی ${dayNumber ? `روز ${dayNumber} ` : ''}برای ${student.name} بروزرسانی شد`
              );
            }
          }
          return result;
        }}
        onSaveDiet={(mealIds, studentId) => {
          const result = handleSaveDiet(mealIds, studentId);
          if (result) {
            const student = students.find(s => s.id === studentId);
            if (student) {
              addHistoryEntry(
                student,
                'diet',
                `برنامه غذایی برای ${student.name} بروزرسانی شد`
              );
            }
          }
          return result;
        }}
        onSaveSupplements={(data, studentId) => {
          const result = handleSaveSupplements(data, studentId);
          if (result) {
            const student = students.find(s => s.id === studentId);
            if (student) {
              addHistoryEntry(
                student,
                'supplement',
                `برنامه مکمل و ویتامین برای ${student.name} بروزرسانی شد`
              );
            }
          }
          return result;
        }}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
      />
    </div>
  );
};

export default StudentsContainer;
