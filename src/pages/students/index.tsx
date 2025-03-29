
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentTable } from "@/components/students/StudentTable";
import { StudentDialog } from "@/components/StudentDialog";
import { Student } from "@/components/students/StudentTypes";
import { motion } from "framer-motion";
import { successToast, errorToast } from "@/components/ui/notification-toast";
import { UserPlus2, Search, UserRound, History } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showNewStudentDialog, setShowNewStudentDialog] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  // Load students from localStorage on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Filter students based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(lowercasedQuery) ||
          student.phone.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const loadStudents = () => {
    try {
      const savedStudents = localStorage.getItem("students");
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
        setFilteredStudents(parsedStudents);
      }
    } catch (error) {
      console.error("Error loading students:", error);
      errorToast("خطا در بارگذاری اطلاعات", "مشکلی در بارگذاری لیست شاگردان رخ داده است");
    }
  };

  const handleAddStudent = (data: any) => {
    try {
      const newStudent: Student = {
        id: Date.now(),
        name: data.name,
        phone: data.phone,
        height: data.height,
        weight: data.weight,
        image: data.image,
        payment: data.payment || "",
        exercises: [],
        meals: [],
        supplements: [],
        progress: 0,
      };

      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      
      setShowNewStudentDialog(false);
      successToast("شاگرد جدید افزوده شد", "اطلاعات شاگرد با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error adding student:", error);
      errorToast("خطا در ثبت اطلاعات", "مشکلی در ثبت اطلاعات شاگرد رخ داده است");
    }
  };

  const handleEditStudent = (data: any) => {
    try {
      if (!studentToEdit) return;
      
      const updatedStudents = students.map((student) =>
        student.id === studentToEdit.id
          ? {
              ...student,
              name: data.name,
              phone: data.phone,
              height: data.height,
              weight: data.weight,
              image: data.image,
              payment: data.payment || "",
            }
          : student
      );
      
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      
      setStudentToEdit(undefined);
      successToast("اطلاعات بروزرسانی شد", "اطلاعات شاگرد با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Error updating student:", error);
      errorToast("خطا در بروزرسانی", "مشکلی در بروزرسانی اطلاعات شاگرد رخ داده است");
    }
  };

  const handleDeleteConfirm = () => {
    try {
      if (studentToDelete === null) return;
      
      const updatedStudents = students.filter((student) => student.id !== studentToDelete);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      
      setShowDeleteDialog(false);
      setStudentToDelete(null);
      successToast("حذف شاگرد", "شاگرد با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting student:", error);
      errorToast("خطا در حذف شاگرد", "مشکلی در حذف شاگرد رخ داده است");
    }
  };

  const handleEditClick = (student: Student) => {
    setStudentToEdit(student);
  };

  const handleDeleteClick = (studentId: number) => {
    setStudentToDelete(studentId);
    setShowDeleteDialog(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">مدیریت شاگردان</h1>
        <p className="text-muted-foreground">
          در این بخش می‌توانید شاگردان خود را مدیریت کنید
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
        >
          <TabsList className="h-10">
            <TabsTrigger value="all" className="gap-2">
              <UserRound className="h-4 w-4" />
              همه شاگردان
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              تاریخچه
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو در بین شاگردان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 md:w-80"
              />
            </div>
            <Button 
              onClick={() => setShowNewStudentDialog(true)}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <UserPlus2 className="h-4 w-4" />
              افزودن شاگرد جدید
            </Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TabsContent value="all" className="m-0 pt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>لیست شاگردان</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentTable 
                  students={filteredStudents}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="m-0 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>تاریخچه شاگردان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  این بخش در آینده فعال خواهد شد
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>

      {/* Dialog for adding/editing students */}
      {(showNewStudentDialog || studentToEdit) && (
        <StudentDialog
          isOpen={showNewStudentDialog || !!studentToEdit}
          onClose={() => {
            setShowNewStudentDialog(false);
            setStudentToEdit(undefined);
          }}
          onSave={studentToEdit ? handleEditStudent : handleAddStudent}
          student={studentToEdit}
        />
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این شاگرد مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عملیات غیرقابل بازگشت است. اطلاعات این شاگرد به طور کامل حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
