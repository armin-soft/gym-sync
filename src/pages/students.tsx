
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { StudentsHeader } from "@/components/students-management/StudentsHeader";
import { StudentsFilters } from "@/components/students-management/StudentsFilters";
import { StudentsGrid } from "@/components/students-management/StudentsGrid";
import { StudentFormDialog } from "@/components/students-management/StudentFormDialog";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

const StudentsPage = () => {
  const { toast } = useToast();
  
  // بارگذاری شاگردان از localStorage
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
  // حالت‌های فیلتر و جستجو
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"all" | "male" | "female">("all");
  const [sortBy, setSortBy] = useState<"name" | "age" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // حالت‌های حوار
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);

  // بارگذاری اولیه شاگردان
  useEffect(() => {
    loadStudents();
  }, []);

  // اعمال فیلترها
  useEffect(() => {
    let filtered = [...students];

    // فیلتر جستجو
    if (searchQuery.trim()) {
      filtered = filtered.filter(student =>
        student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone?.includes(searchQuery)
      );
    }

    // فیلتر جنسیت
    if (selectedGender !== "all") {
      filtered = filtered.filter(student => student.gender === selectedGender);
    }

    // مرتب‌سازی
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "age":
          aValue = parseInt(a.age || "0");
          bValue = parseInt(b.age || "0");
          break;
        case "createdAt":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.name || "";
          bValue = b.name || "";
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredStudents(filtered);
  }, [students, searchQuery, selectedGender, sortBy, sortOrder]);

  const loadStudents = () => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        }
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast({
        title: "خطا",
        description: "مشکلی در بارگذاری اطلاعات شاگردان پیش آمد",
        variant: "destructive"
      });
    }
  };

  const saveStudents = (newStudents: Student[]) => {
    try {
      localStorage.setItem('students', JSON.stringify(newStudents));
      setStudents(newStudents);
      
      // تریگر رویداد به‌روزرسانی
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
    } catch (error) {
      console.error('Error saving students:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره‌سازی اطلاعات پیش آمد",
        variant: "destructive"
      });
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(undefined);
    setIsFormDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormDialogOpen(true);
  };

  const handleDeleteStudent = (student: Student) => {
    if (window.confirm(`آیا از حذف شاگرد "${student.name}" اطمینان دارید؟`)) {
      const newStudents = students.filter(s => s.id !== student.id);
      saveStudents(newStudents);
      
      toast({
        title: "حذف موفق",
        description: `شاگرد "${student.name}" با موفقیت حذف شد`
      });
    }
  };

  const handleSaveStudent = (studentData: Partial<Student>) => {
    if (editingStudent) {
      // ویرایش شاگرد موجود
      const newStudents = students.map(s =>
        s.id === editingStudent.id
          ? { ...s, ...studentData, updatedAt: new Date().toISOString() }
          : s
      );
      saveStudents(newStudents);
    } else {
      // افزودن شاگرد جدید
      const newStudent: Student = {
        ...studentData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Student;
      
      saveStudents([...students, newStudent]);
    }
  };

  const handleManageProgram = (student: Student) => {
    toast({
      title: "در حال توسعه",
      description: "بخش مدیریت برنامه‌ها به زودی اضافه خواهد شد"
    });
  };

  const handleSortChange = (field: "name" | "age" | "createdAt", order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  // محاسبه آمار
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === "male").length;
  const femaleStudents = students.filter(s => s.gender === "female").length;

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex flex-col px-4 sm:px-6 lg:px-8 py-6 space-y-8"
        dir="rtl"
      >
        {/* هدر صفحه */}
        <StudentsHeader
          totalStudents={totalStudents}
          maleStudents={maleStudents}
          femaleStudents={femaleStudents}
          onAddStudent={handleAddStudent}
        />

        {/* فیلترها */}
        <StudentsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        {/* شبکه شاگردان */}
        <div className="flex-1 overflow-y-auto">
          <StudentsGrid
            students={filteredStudents}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onManageProgram={handleManageProgram}
          />
        </div>

        {/* حوار فرم */}
        <StudentFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          student={editingStudent}
          onSave={handleSaveStudent}
        />
      </motion.div>
    </PageContainer>
  );
};

export default StudentsPage;
