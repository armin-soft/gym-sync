import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { StudentDialog } from "@/components/StudentDialog";
import { StudentExerciseDialog } from "@/components/exercises/StudentExerciseDialog";
import { StudentDietDialog } from "@/components/nutrition/StudentDietDialog";
import { StudentSupplementDialog } from "@/components/supplements/StudentSupplementDialog";
import { StudentDownloadDialog } from "@/components/students/StudentDownloadDialog";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsTable } from "@/components/students/StudentsTable";
import { Student } from "@/components/students/StudentTypes";
import { useQuery } from "@tanstack/react-query";
import { ExerciseCategory, ExerciseType } from "@/types/exercise";

const StudentsPage = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isDietDialogOpen, setIsDietDialogOpen] = useState(false);
  const [isSupplementDialogOpen, setIsSupplementDialogOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [selectedStudentForExercise, setSelectedStudentForExercise] = useState<Student | null>(null);
  const [selectedStudentForDiet, setSelectedStudentForDiet] = useState<Student | null>(null);
  const [selectedStudentForSupplement, setSelectedStudentForSupplement] = useState<Student | null>(null);
  const [selectedStudentForDownload, setSelectedStudentForDownload] = useState<Student | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      console.log('Loading students from localStorage:', savedStudents);
      
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        console.log('Successfully parsed students:', parsedStudents);
        
        if (Array.isArray(parsedStudents)) {
          const processedStudents = parsedStudents.map((student: any) => ({
            id: student.id || Math.random(),
            name: student.name || '',
            phone: student.phone || '',
            height: student.height || '',
            weight: student.weight || '',
            image: student.image || '/placeholder.svg',
            payment: student.payment || '',
            exercises: student.exercises || [],
            exercisesDay1: student.exercisesDay1 || [],
            exercisesDay2: student.exercisesDay2 || [],
            exercisesDay3: student.exercisesDay3 || [],
            exercisesDay4: student.exercisesDay4 || [],
            meals: student.meals || [],
            supplements: student.supplements || [],
            vitamins: student.vitamins || []
          }));
          
          console.log('Processed students:', processedStudents);
          setStudents(processedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
      }

      const savedExercises = localStorage.getItem('exercises');
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      }

      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }

      const savedSupplements = localStorage.getItem('supplements');
      if (savedSupplements) {
        setSupplements(JSON.parse(savedSupplements));
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات شاگردان پیش آمده است"
      });
      setStudents([]);
    }
  }, []);
  
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
      console.log('Saved students to localStorage:', students);
    }
  }, [students]);

  const sortedAndFilteredStudents = React.useMemo(() => {
    let filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.phone.includes(searchQuery)
    );

    if (selectedExerciseType || selectedCategory) {
      filteredStudents = filteredStudents.filter(student => {
        const allStudentExercises = [
          ...(student.exercises || []),
          ...(student.exercisesDay1 || []),
          ...(student.exercisesDay2 || []),
          ...(student.exercisesDay3 || []),
          ...(student.exercisesDay4 || [])
        ];

        if (selectedCategory) {
          return allStudentExercises.some(exerciseId => {
            const exercise = exercises.find(e => e.id === exerciseId);
            return exercise && exercise.categoryId === selectedCategory;
          });
        }
        
        if (selectedExerciseType) {
          const categoryIds = categories
            .filter(cat => cat.type === selectedExerciseType)
            .map(cat => cat.id);
          
          return allStudentExercises.some(exerciseId => {
            const exercise = exercises.find(e => e.id === exerciseId);
            return exercise && categoryIds.includes(exercise.categoryId);
          });
        }

        return true;
      });
    }

    return filteredStudents.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      const aValue = Number(a[sortField]);
      const bValue = Number(b[sortField]);
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [students, searchQuery, sortField, sortOrder, selectedExerciseType, selectedCategory, exercises, categories]);

  console.log('Sorted and filtered students:', sortedAndFilteredStudents);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    
    toast({
      title: "حذف موفق",
      description: "شاگرد مورد نظر با موفقیت ��ذف شد",
    });
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedStudent(undefined);
    setIsDialogOpen(true);
  };

  const handleSave = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => {
    let updatedStudents: Student[];
    
    if (selectedStudent) {
      updatedStudents = students.map((s) =>
        s.id === selectedStudent.id ? { 
          ...s, 
          ...data, 
          exercises: s.exercises || [], 
          exercisesDay1: s.exercisesDay1 || [],
          exercisesDay2: s.exercisesDay2 || [],
          exercisesDay3: s.exercisesDay3 || [],
          exercisesDay4: s.exercisesDay4 || [],
          meals: s.meals || [], 
          supplements: s.supplements || [], 
          vitamins: s.vitamins || [] 
        } : s
      );
      toast({
        title: "ویرایش موفق",
        description: "اطلاعات شاگرد با موفقیت ویرایش شد"
      });
    } else {
      const newStudent: Student = {
        ...data,
        id: Math.max(0, ...students.map((s) => s.id)) + 1,
        exercises: [],
        exercisesDay1: [],
        exercisesDay2: [],
        exercisesDay3: [],
        exercisesDay4: [],
        meals: [],
        supplements: [],
        vitamins: []
      };
      updatedStudents = [...students, newStudent];
      toast({
        title: "افزودن موفق",
        description: "شاگرد جدید با موفقیت اضافه شد"
      });
    }
    
    setStudents(updatedStudents);
    setIsDialogOpen(false);
  };

  const handleAddExercise = (student: Student) => {
    setSelectedStudentForExercise(student);
    setIsExerciseDialogOpen(true);
  };
  
  const handleAddDiet = (student: Student) => {
    setSelectedStudentForDiet(student);
    setIsDietDialogOpen(true);
  };
  
  const handleAddSupplement = (student: Student) => {
    setSelectedStudentForSupplement(student);
    setIsSupplementDialogOpen(true);
  };

  const handleDownload = (student: Student) => {
    if (!student.payment || student.payment === '') {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "برای دانلود اطلاعات ابتدا باید مبلغ برنامه را وارد کنید"
      });
      handleEdit(student);
      return;
    }
    
    setSelectedStudentForDownload(student);
    setIsDownloadDialogOpen(true);
  };
  
  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    if (!selectedStudentForExercise) return;
    
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudentForExercise.id) {
        if (!dayNumber) {
          return {
            ...student,
            exercises: exerciseIds
          };
        }
        
        switch (dayNumber) {
          case 1:
            return {
              ...student,
              exercisesDay1: exerciseIds
            };
          case 2:
            return {
              ...student,
              exercisesDay2: exerciseIds
            };
          case 3:
            return {
              ...student,
              exercisesDay3: exerciseIds
            };
          case 4:
            return {
              ...student,
              exercisesDay4: exerciseIds
            };
          default:
            return student;
        }
      }
      return student;
    });
    
    setStudents(updatedStudents);
    toast({
      title: "افزودن موفق",
      description: "تمرین‌ها با موفقیت به شاگرد اضافه شدند"
    });
  };
  
  const handleSaveDiet = (mealIds: number[]) => {
    if (!selectedStudentForDiet) return;
    
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudentForDiet.id) {
        return {
          ...student,
          meals: mealIds
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    toast({
      title: "افزودن موفق",
      description: "برنامه غذایی با موفقیت به شاگرد اضافه شد"
    });
  };
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}) => {
    if (!selectedStudentForSupplement) return;
    
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudentForSupplement.id) {
        return {
          ...student,
          supplements: data.supplements,
          vitamins: data.vitamins
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    toast({
      title: "افزودن موفق",
      description: "مکمل‌ها و ویتامین‌ها با موفقیت به شاگرد اضافه شدند"
    });
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedExerciseType(null);
    setSelectedCategory(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        <div className="flex flex-col space-y-6">
          <StudentsHeader onAddStudent={handleAdd} />
          
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddExercise={handleAddExercise}
            onAddDiet={handleAddDiet}
            onAddSupplement={handleAddSupplement}
            onDownload={handleDownload}
            onAddStudent={handleAdd}
            onClearSearch={handleClearSearch}
          />
        </Card>

        <StudentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSave}
          student={selectedStudent}
        />

        <StudentExerciseDialog
          open={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          studentName={selectedStudentForExercise?.name || ""}
          onSave={handleSaveExercises}
          initialExercises={selectedStudentForExercise?.exercises || []}
          initialExercisesDay1={selectedStudentForExercise?.exercisesDay1 || []}
          initialExercisesDay2={selectedStudentForExercise?.exercisesDay2 || []}
          initialExercisesDay3={selectedStudentForExercise?.exercisesDay3 || []}
          initialExercisesDay4={selectedStudentForExercise?.exercisesDay4 || []}
        />
        
        <StudentDietDialog
          open={isDietDialogOpen}
          onOpenChange={setIsDietDialogOpen}
          studentName={selectedStudentForDiet?.name || ""}
          onSave={handleSaveDiet}
          initialMeals={selectedStudentForDiet?.meals || []}
        />
        
        <StudentSupplementDialog
          open={isSupplementDialogOpen}
          onOpenChange={setIsSupplementDialogOpen}
          studentName={selectedStudentForSupplement?.name || ""}
          onSave={handleSaveSupplements}
          initialData={{
            supplements: selectedStudentForSupplement?.supplements || [],
            vitamins: selectedStudentForSupplement?.vitamins || []
          }}
        />

        <StudentDownloadDialog
          open={isDownloadDialogOpen}
          onOpenChange={setIsDownloadDialogOpen}
          student={selectedStudentForDownload}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          vitamins={supplements.filter(item => item.type === 'vitamin')}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
