
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { History, Search } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

// New components
import { StudentManagementHeader } from "@/components/student-management/StudentManagementHeader";
import { StudentGrid } from "@/components/student-management/StudentGrid";
import { StudentFilters } from "@/components/student-management/StudentFilters";
import { StudentFormDialog } from "@/components/student-management/StudentFormDialog";

const StudentsPage = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");

  const {
    students,
    handleDelete,
    handleSave,
    loading
  } = useStudents();

  console.log('StudentsPage: Current students:', students);
  console.log('StudentsPage: Students count:', students.length);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.phone.includes(query)
      );
    }

    // Apply gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter(student => student.gender === genderFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "age":
          aValue = a.age || 0;
          bValue = b.age || 0;
          break;
        case "height":
          aValue = parseFloat(a.height) || 0;
          bValue = parseFloat(b.height) || 0;
          break;
        case "weight":
          aValue = parseFloat(a.weight) || 0;
          bValue = parseFloat(b.weight) || 0;
          break;
        case "payment":
          aValue = parseFloat(a.payment) || 0;
          bValue = parseFloat(b.payment) || 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [students, searchQuery, genderFilter, sortField, sortOrder]);

  // Statistics
  const totalStudents = students.length;
  const activeStudents = students.length; // For now, all students are considered active
  const maleStudents = students.filter(s => s.gender === "male").length;
  const femaleStudents = students.filter(s => s.gender === "female").length;

  // Handlers
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student && window.confirm(`آیا از حذف «${student.name}» اطمینان دارید؟`)) {
      const success = handleDelete(studentId);
      if (success) {
        toast({
          title: "حذف موفق",
          description: `${student.name} با موفقیت حذف شد`
        });
      }
    }
  };

  const handleSaveStudent = (studentData: any, existingStudent?: Student | null) => {
    const success = handleSave(studentData, existingStudent);
    if (success) {
      setIsDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setGenderFilter("all");
    setSortField("name");
    setSortOrder("asc");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "بروزرسانی موفق",
        description: "اطلاعات شاگردان بروزرسانی شد"
      });
    }, 1000);
  };

  // Placeholder handlers for exercise, diet, and supplement management
  const handleAddExercise = (student: Student) => {
    toast({
      title: "برنامه ورزشی",
      description: `برنامه ورزشی برای ${student.name} در حال توسعه است`
    });
  };

  const handleAddDiet = (student: Student) => {
    toast({
      title: "برنامه غذایی", 
      description: `برنامه غذایی برای ${student.name} در حال توسعه است`
    });
  };

  const handleAddSupplement = (student: Student) => {
    toast({
      title: "مکمل‌ها",
      description: `مکمل‌ها برای ${student.name} در حال توسعه است`
    });
  };

  return (
    <PageContainer withBackground fullHeight className="student-management-container">
      <div className="w-full h-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with History Button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <StudentManagementHeader
              totalStudents={totalStudents}
              activeStudents={activeStudents}
              onAddStudent={handleAddStudent}
              onRefresh={handleRefresh}
              isLoading={isLoading || loading}
            />
          </div>
          
          <Link to="/Management/Student-History" className="mt-6">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/30 text-blue-600 hover:bg-blue-50 backdrop-blur-sm shadow-lg"
            >
              <History className="h-4 w-4 ml-2" />
              <span>تاریخچه</span>
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <StudentFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          totalStudents={totalStudents}
          maleStudents={maleStudents}
          femaleStudents={femaleStudents}
          onClearFilters={handleClearFilters}
        />

        {/* Students Grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <StudentGrid
              students={filteredAndSortedStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onAddExercise={handleAddExercise}
              onAddDiet={handleAddDiet}
              onAddSupplement={handleAddSupplement}
              onAddStudent={handleAddStudent}
              searchQuery={searchQuery}
              isLoading={isLoading || loading}
            />
          </AnimatePresence>
        </div>

        {/* Student Form Dialog */}
        <StudentFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          student={selectedStudent}
          onSave={handleSaveStudent}
        />
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
