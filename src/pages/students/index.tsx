import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { StudentTable } from "@/components/students/StudentTable";
import { EmptyStudentState } from "@/components/students/EmptyStudentState";
import { StudentDialogManagerWrapper } from "@/components/students/StudentDialogManagerWrapper";
import { Student } from "@/components/students/StudentTypes";
import { Card } from "@/components/ui/card";
import { filterStudents, sortStudents } from "@/utils/studentUtils";
import { useStudentData } from "@/hooks/useStudentData";
import { StudentHeader } from "@/components/students/StudentHeader";

const Students = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const dialogRef = useRef<any>(null);
  
  const { students, setStudents, loading, isProfileComplete } = useStudentData();

  const toggleSort = (field: "name" | "weight" | "height") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleAdd = () => {
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

  const handleSave = (data: any, selectedStudent?: Student) => {
    try {
      if (selectedStudent) {
        const updatedStudents = students.map(student => 
          student.id === selectedStudent.id 
            ? { ...student, ...data } 
            : student
        );
        setStudents(updatedStudents);
        toast({
          title: "ویرایش موفق",
          description: `اطلاعات ${data.name} با موفقیت بروزرسانی شد`,
        });
      } else {
        const newStudent: Student = {
          id: Date.now(),
          ...data,
          progress: 0,
        };
        
        setStudents(prevStudents => [...prevStudents, newStudent]);
        toast({
          title: "افزودن موفق",
          description: `${data.name} با موفقیت به لیست شاگردان اضافه شد`,
        });
      }
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDelete = (id: number) => {
    try {
      const studentToDelete = students.find(student => student.id === id);
      if (!studentToDelete) return;
      
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      
      toast({
        title: "حذف موفق",
        description: `${studentToDelete.name} با موفقیت از لیست شاگردان حذف شد`,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در حذف شاگرد رخ داد",
        variant: "destructive",
      });
    }
  };

  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (dayNumber !== undefined) {
            const dayKey = `exercisesDay${dayNumber}` as keyof typeof updatedStudent;
            updatedStudent[dayKey] = exerciseIds as unknown as never;
          } else {
            updatedStudent.exercises = exerciseIds;
          }
          
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      toast({
        title: "ذخیره موفق",
        description: "برنامه تمرینی با موفقیت ذخیره شد",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving exercises:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره برنامه تمرینی رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSaveDiet = (mealIds: number[], studentId: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, meals: mealIds };
          
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      toast({
        title: "ذخیره موفق",
        description: "برنامه غذایی با موفقیت ذخیره شد",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving diet:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره برنامه غذایی رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins
          };
          
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      toast({
        title: "ذخیره موفق",
        description: "برنامه مکمل و ویتامین با موفقیت ذخیره شد",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving supplements:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره برنامه مکمل و ویتامین رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const filteredStudents = filterStudents(students, searchQuery);
  const sortedStudents = sortStudents(filteredStudents, sortField, sortOrder);

  return (
    <div className="container px-0 md:px-4 flex flex-col h-[calc(100vh-4rem)]">
      <StudentHeader 
        onAddStudent={() => dialogRef.current?.handleAdd()}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden mb-4"
          >
            <Card className="p-4">
              <StudentSearchSort 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortField={sortField}
                sortOrder={sortOrder}
                toggleSort={toggleSort}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="hidden lg:block">
        <StudentSearchSort 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
        />
      </div>
      
      {!isProfileComplete && (
        <ProfileWarning 
          isProfileComplete={isProfileComplete}
          className="mb-6"
        />
      )}
      
      <StudentStatsCards students={students} />
      
      <ScrollArea className="flex-1 w-full mt-8">
        {students.length === 0 ? (
          <EmptyStudentState 
            isSearching={searchQuery.length > 0} 
            onAddStudent={() => dialogRef.current?.handleAdd()} 
            onClearSearch={() => setSearchQuery("")}
          />
        ) : filteredStudents.length === 0 ? (
          <EmptyStudentState 
            isSearching={true} 
            onAddStudent={() => dialogRef.current?.handleAdd()} 
            onClearSearch={() => setSearchQuery("")}
          />
        ) : (
          <div className="pr-2">
            <AnimatePresence mode="wait">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <StudentTable 
                  students={sortedStudents}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddExercise={handleAddExercise}
                  onAddDiet={handleAddDiet}
                  onAddSupplement={handleAddSupplement}
                  isProfileComplete={isProfileComplete}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
      
      <StudentDialogManagerWrapper
        ref={dialogRef}
        onSave={handleSave}
        onSaveExercises={handleSaveExercises}
        onSaveDiet={handleSaveDiet}
        onSaveSupplements={handleSaveSupplements}
        exercises={[]}
        meals={[]}
        supplements={[]}
      />
    </div>
  );
};

export default Students;
