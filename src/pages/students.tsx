
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
import { useToast } from "@/hooks/use-toast";
import { 
  Ruler, 
  Weight, 
  Phone, 
  Edit, 
  GraduationCap, 
  ListFilter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  UserRound,
  Scale,
  CalendarDays,
  ClipboardList,
  AppWindow,
  Power
} from "lucide-react";
import { useState, useEffect } from "react";
import { StudentDialog } from "@/components/StudentDialog";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
}

const StudentsPage = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch (error) {
        console.error('Error loading students from localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات شاگردان پیش آمده است"
        });
      }
    }
  }, []);

  // Save to localStorage whenever students data changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    
    toast({
      title: "حذف موفق",
      description: "شاگرد مورد نظر با موفقیت حذف شد",
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
        title: "ویرایش موفق",
        description: "اطلاعات شاگرد با موفقیت ویرایش شد"
      });
    } else {
      const newStudent: Student = {
        ...data,
        id: Math.max(...students.map((s) => s.id), 0) + 1,
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

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchQuery) || student.phone.includes(searchQuery)
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        {/* Header Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  شاگردان
                </h2>
                <p className="text-muted-foreground">
                  مدیریت و پیگیری پیشرفت شاگردان
                </p>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              <Plus className="ml-2 h-5 w-5" />
              افزودن شاگرد جدید
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid sm:grid-cols-[1fr_auto] gap-4">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <ListFilter className="h-4 w-4" />
                  فیلترها
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <UserRound className="h-4 w-4 ml-2" />
                  همه شاگردان
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarDays className="h-4 w-4 ml-2" />
                  شاگردان فعال
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Scale className="h-4 w-4 ml-2" />
                  مرتب‌سازی بر اساس نام
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarDays className="h-4 w-4 ml-2" />
                  مرتب‌سازی بر اساس تاریخ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table Section */}
        <Card className="backdrop-blur-xl bg-white/50 border-primary/10 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-20rem)] rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 hover:bg-primary/5">
                  <TableHead className="w-14 text-center">
                    <UserRound className="h-4 w-4 mx-auto text-muted-foreground" />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                      نام و نام خانوادگی
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      شماره موبایل
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      قد (سانتی‌متر)
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      وزن (کیلوگرم)
                    </div>
                  </TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 bg-primary/10 animate-ping rounded-full" />
                          <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                            <UserRound className="h-8 w-8 text-primary/50" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-medium">هیچ شاگردی یافت نشد</p>
                          <p className="text-sm text-muted-foreground max-w-md">
                            برای افزودن شاگرد جدید روی دکمه «افزودن شاگرد جدید» کلیک کنید
                          </p>
                        </div>
                        <Button
                          onClick={handleAdd}
                          variant="outline"
                          className="mt-4"
                        >
                          <Plus className="ml-2 h-4 w-4" />
                          افزودن شاگرد جدید
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="group">
                      <TableCell>
                        <div className="relative w-10 h-10 mx-auto">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                          <img
                            src={student.image}
                            alt={student.name}
                            className="relative rounded-full object-cover w-full h-full ring-2 ring-white dark:ring-gray-800 shadow-lg group-hover:ring-primary/20 group-hover:shadow-primary/20 transition-all duration-300"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                      </TableCell>
                      <TableCell dir="ltr" className="font-mono">
                        {toPersianNumbers(student.phone)}
                      </TableCell>
                      <TableCell>{toPersianNumbers(student.height)}</TableCell>
                      <TableCell>{toPersianNumbers(student.weight)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(student)}
                            className="size-8 hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(student.id)}
                            className="size-8 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 hover:bg-primary/10"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <AppWindow className="h-4 w-4 ml-2" />
                                نمایش جزئیات
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ClipboardList className="h-4 w-4 ml-2" />
                                برنامه تمرینی
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Scale className="h-4 w-4 ml-2" />
                                برنامه غذایی
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Power className="h-4 w-4 ml-2" />
                                غیرفعال‌سازی
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default StudentsPage;
