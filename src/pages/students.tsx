import React, { useState, useEffect } from "react";
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
  Plus, 
  Search, 
  Trash2, 
  UserRound,
  Scale,
  LineChart,
} from "lucide-react";
import { StudentDialog } from "@/components/StudentDialog";
import { StudentExerciseDialog } from "@/components/exercises/StudentExerciseDialog";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [selectedStudentForExercise, setSelectedStudentForExercise] = useState<Student | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");

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
            image: student.image?._type === 'String' ? student.image.value : (student.image || '/placeholder.svg')
          }));
          
          console.log('Processed students:', processedStudents);
          setStudents(processedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
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

  const sortedAndFilteredStudents = React.useMemo(() => {
    return students
      .filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.phone.includes(searchQuery)
      )
      .sort((a, b) => {
        if (sortField === "name") {
          return sortOrder === "asc" 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
        }
        const aValue = Number(a[sortField]);
        const bValue = Number(b[sortField]);
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
  }, [students, searchQuery, sortField, sortOrder]);

  console.log('Sorted and filtered students:', sortedAndFilteredStudents);

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
        s.id === selectedStudent.id ? { ...s, ...data } : s
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

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 animate-fade-in">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="animate-fade-in">
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
              className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 animate-fade-in"
            >
              <Plus className="ml-2 h-5 w-5" />
              افزودن شاگرد جدید
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 animate-fade-in">
                  <UserRound className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">کل شاگردان</p>
                  <p className="text-2xl font-bold">{toPersianNumbers(students.length)}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:200ms]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-white shadow-lg shadow-green-500/25 animate-fade-in">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">شاگردان فعال</p>
                  <p className="text-2xl font-bold">{toPersianNumbers(students.length)}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:400ms]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 animate-fade-in">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">میانگین وزن</p>
                  <p className="text-2xl font-bold">
                    {toPersianNumbers(
                      Math.round(
                        students.reduce((acc, student) => acc + Number(student.weight), 0) / 
                        (students.length || 1)
                      )
                    )}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:600ms]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 animate-fade-in">
                  <LineChart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">میانگین قد</p>
                  <p className="text-2xl font-bold">
                    {toPersianNumbers(
                      Math.round(
                        students.reduce((acc, student) => acc + Number(student.height), 0) / 
                        (students.length || 1)
                      )
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid sm:grid-cols-[1fr_auto] gap-4">
            <Card className="backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60">
              <div className="relative p-4">
                <Search className="absolute right-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="جستجو بر اساس نام یا شماره موبایل..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    console.log('Search query changed:', e.target.value);
                  }}
                  className="pl-4 pr-10 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </Card>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <ListFilter className="h-4 w-4" />
                  مرتب‌سازی
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => toggleSort("name")}>
                  <UserRound className="h-4 w-4 ml-2" />
                  بر اساس نام {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("weight")}>
                  <Scale className="h-4 w-4 ml-2" />
                  بر اساس وزن {sortField === "weight" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleSort("height")}>
                  <Ruler className="h-4 w-4 ml-2" />
                  بر اساس قد {sortField === "height" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="backdrop-blur-xl bg-white/50 border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white/60">
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
                      قد (سانتی متر)
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
                {students.length === 0 ? (
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
                ) : sortedAndFilteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 bg-yellow-500/10 animate-ping rounded-full" />
                          <div className="relative w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Search className="h-8 w-8 text-yellow-500/50" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-medium">نتیجه‌ای یافت نشد</p>
                          <p className="text-sm text-muted-foreground max-w-md">
                            با معیارهای جستجوی فعلی هیچ شاگردی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSearchQuery("")}
                          className="mt-4"
                        >
                          پاک کردن جستجو
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedAndFilteredStudents.map((student, index) => (
                    <TableRow 
                      key={student.id} 
                      className="group transition-all duration-300 hover:bg-primary/5"
                    >
                      <TableCell>
                        <div className="relative w-10 h-10 mx-auto">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                          <img
                            src={student.image || '/placeholder.svg'}
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
                        <div className="flex items-center gap-2">
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

        <StudentExerciseDialog
          open={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          studentName={selectedStudentForExercise?.name || ""}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
