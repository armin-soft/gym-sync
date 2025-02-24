
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Plus, Search, Trash2, UserRound } from "lucide-react";
import { useState, useEffect } from "react";
import { StudentDialog } from "@/components/StudentDialog";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
}

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    toast({
      title: "شاگرد با موفقیت حذف شد",
      description: "اطلاعات شاگرد مورد نظر از سیستم حذف شد.",
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

  const handleSave = (data: Omit<Student, "id">) => {
    let updatedStudents: Student[];
    
    if (selectedStudent) {
      updatedStudents = students.map((s) =>
        s.id === selectedStudent.id ? { ...selectedStudent, ...data } : s
      );
      toast({
        description: "اطلاعات شاگرد با موفقیت ویرایش شد",
      });
    } else {
      const newStudent: Student = {
        ...data,
        id: Math.max(...students.map((s) => s.id), 0) + 1,
      };
      updatedStudents = [...students, newStudent];
      toast({
        description: "شاگرد جدید با موفقیت اضافه شد",
      });
    }
    
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setIsDialogOpen(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchQuery) || student.phone.includes(searchQuery)
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                شاگردان
              </h2>
              <p className="text-muted-foreground">
                در این بخش می‌توانید شاگردان خود را مدیریت کنید
              </p>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Plus className="ml-2 h-4 w-4" />
              افزودن شاگرد
            </Button>
          </div>

          {/* Search Box */}
          <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
            <div className="relative p-4">
              <Search className="absolute right-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو بر اساس نام یا شماره موبایل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </Card>
        </div>

        {/* Table Card */}
        <Card className="backdrop-blur-xl bg-white/50 border-primary/10">
          <ScrollArea className="h-[calc(100vh-16rem)] rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-14 text-center">تصویر</TableHead>
                  <TableHead>نام و نام خانوادگی</TableHead>
                  <TableHead>شماره موبایل</TableHead>
                  <TableHead>قد (سانتی‌متر)</TableHead>
                  <TableHead>وزن (کیلوگرم)</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48">
                      <div className="flex flex-col items-center justify-center text-center space-y-3 text-muted-foreground">
                        <UserRound className="h-12 w-12 opacity-20" />
                        <div className="space-y-1">
                          <p className="text-sm">هیچ شاگردی یافت نشد</p>
                          <p className="text-xs">برای افزودن شاگرد جدید روی دکمه «افزودن شاگرد» کلیک کنید</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="group">
                      <TableCell>
                        <div className="relative w-10 h-10 mx-auto">
                          <img
                            src={student.image}
                            alt={student.name}
                            className="rounded-full object-cover w-full h-full ring-2 ring-white shadow-md group-hover:ring-primary/20 group-hover:shadow-primary/20 transition-all duration-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell dir="ltr" className="font-mono">
                        {toPersianNumbers(student.phone)}
                      </TableCell>
                      <TableCell>{toPersianNumbers(student.height)}</TableCell>
                      <TableCell>{toPersianNumbers(student.weight)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(student)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(student.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>

        <StudentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSave}
          student={selectedStudent}
        />
      </div>
    </div>
  );
};

export default Students;
