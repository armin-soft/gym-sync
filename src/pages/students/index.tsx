
import React, { useState, useEffect, useRef } from "react";
import { 
  User2, Plus, Trash2, Search, Users, ChevronDown, Filter, FileText, 
  SortAsc, X, Printer, Download 
} from "lucide-react";
import { StudentDialog } from "@/components/StudentDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomId } from "@/lib/utils/ids";
import { PageContainer } from "@/components/ui/page-container";
import { PrintExportButton } from "@/components/ui/PrintExportButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";
import { StudentFormData } from "@/components/students/StudentTypes";

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const studentsContainerRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [showNoPaymentOnly, setShowNoPaymentOnly] = useState(false);
  const [showHasExercisesOnly, setShowHasExercisesOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"name" | "lastUpdated">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save students to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddOrUpdateStudent = (formData: StudentFormData) => {
    if (selectedStudent) {
      // Update existing student
      const updatedStudents = students.map((student) => {
        if (student.id === selectedStudent.id) {
          return {
            ...student,
            ...formData,
            lastUpdated: new Date().toISOString()
          };
        }
        return student;
      });
      setStudents(updatedStudents);
      toast({
        title: "شاگرد با موفقیت ویرایش شد",
        description: `اطلاعات ${formData.name} به‌روزرسانی شد`,
      });
    } else {
      // Add new student
      const newStudent: Student = {
        id: generateRandomId(),
        ...formData,
        exercises: [],
        diets: [],
        supplements: [],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      setStudents([...students, newStudent]);
      toast({
        title: "شاگرد جدید اضافه شد",
        description: `${formData.name} با موفقیت به لیست شاگردان اضافه شد`,
      });
    }
    setShowDialog(false);
    setSelectedStudent(null);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDialog(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      const updatedStudents = students.filter(student => student.id !== selectedStudent.id);
      setStudents(updatedStudents);
      toast({
        title: "شاگرد با موفقیت حذف شد",
        description: `${selectedStudent.name} از لیست شاگردان حذف شد`,
        variant: "default",
      });
      setShowDeleteDialog(false);
      setSelectedStudent(null);
    }
  };

  // Apply filters and sorting
  const filteredAndSortedStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           student.phone.includes(searchQuery);
      
      const passesPaymentFilter = showNoPaymentOnly ? !student.payment : true;
      const passesExercisesFilter = showHasExercisesOnly ? 
        (student.exercises && student.exercises.length > 0) : true;
      
      return matchesSearch && passesPaymentFilter && passesExercisesFilter;
    })
    .sort((a, b) => {
      if (sortOption === "name") {
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

  const totalStudents = students.length;
  const filteredCount = filteredAndSortedStudents.length;
  const hasFilters = showNoPaymentOnly || showHasExercisesOnly || searchQuery;

  const resetFilters = () => {
    setSearchQuery("");
    setShowNoPaymentOnly(false);
    setShowHasExercisesOnly(false);
  };

  return (
    <PageContainer>
      <PageHeader
        title="مدیریت شاگردان" 
        icon={Users}
        description="اطلاعات شاگردان خود را در این بخش مدیریت کنید"
        actions={
          <div className="flex items-center gap-2">
            <PrintExportButton
              contentId="studentsListPrintable"
              title="خروجی لیست شاگردان"
              description="دانلود PDF یا ارسال به پرینتر"
              documentType="student"
              filename="students-list"
              variant="icon-text"
            />
            <Button onClick={() => setShowDialog(true)} className="bg-primary">
              <Plus className="w-4 h-4 ml-2" />
              افزودن شاگرد
            </Button>
          </div>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto max-w-md">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجو بر اساس نام یا شماره موبایل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 w-full"
          />
          {searchQuery && (
            <button 
              className="absolute left-3 top-2.5 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Filter className="h-3.5 w-3.5" />
                <span>فیلتر</span>
                {hasFilters && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {filteredCount}/{totalStudents}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">فیلتر کردن نتایج</h4>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="showNoPayment" 
                      checked={showNoPaymentOnly}
                      onCheckedChange={(checked) => 
                        setShowNoPaymentOnly(checked === true)
                      } 
                    />
                    <Label htmlFor="showNoPayment">نمایش افراد بدون پرداختی</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="showHasExercises" 
                      checked={showHasExercisesOnly}
                      onCheckedChange={(checked) => 
                        setShowHasExercisesOnly(checked === true)
                      } 
                    />
                    <Label htmlFor="showHasExercises">دارای برنامه تمرینی</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">مرتب‌سازی</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={sortOption === "name" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSortOption("name")}
                      className="w-full justify-center"
                    >
                      براساس نام
                    </Button>
                    <Button 
                      variant={sortOption === "lastUpdated" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSortOption("lastUpdated")}
                      className="w-full justify-center"
                    >
                      آخرین بروزرسانی
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSortDirection("asc")}
                      className={`w-full justify-center ${sortDirection === "asc" ? "bg-muted" : ""}`}
                    >
                      صعودی
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSortDirection("desc")}
                      className={`w-full justify-center ${sortDirection === "desc" ? "bg-muted" : ""}`}
                    >
                      نزولی
                    </Button>
                  </div>
                </div>
                
                {hasFilters && (
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="text-xs"
                    >
                      <X className="h-3.5 w-3.5 ml-1.5" />
                      حذف فیلترها
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <SortAsc className="h-3.5 w-3.5" />
                <span>مرتب‌سازی</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <div className="font-medium text-sm">مرتب‌سازی براساس</div>
                <div className="grid gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`justify-start ${sortOption === "name" && sortDirection === "asc" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                    onClick={() => {setSortOption("name"); setSortDirection("asc");}}
                  >
                    نام (صعودی)
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`justify-start ${sortOption === "name" && sortDirection === "desc" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                    onClick={() => {setSortOption("name"); setSortDirection("desc");}}
                  >
                    نام (نزولی)
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`justify-start ${sortOption === "lastUpdated" && sortDirection === "desc" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                    onClick={() => {setSortOption("lastUpdated"); setSortDirection("desc");}}
                  >
                    آخرین بروزرسانی (جدیدترین)
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`justify-start ${sortOption === "lastUpdated" && sortDirection === "asc" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                    onClick={() => {setSortOption("lastUpdated"); setSortDirection("asc");}}
                  >
                    آخرین بروزرسانی (قدیمی‌ترین)
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Students list */}
      <div ref={studentsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedStudents.length > 0 ? (
          filteredAndSortedStudents.map((student) => (
            <div 
              key={student.id} 
              className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold text-base">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{toPersianNumbers(student.phone)}</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="border rounded-md p-2">
                  <span className="text-muted-foreground block text-xs">قد</span>
                  <span className="font-medium">{toPersianNumbers(student.height)} سانتی‌متر</span>
                </div>
                <div className="border rounded-md p-2">
                  <span className="text-muted-foreground block text-xs">وزن</span>
                  <span className="font-medium">{toPersianNumbers(student.weight)} کیلوگرم</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={`rounded-full border ${
                      student.exercises && student.exercises.length > 0
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    برنامه تمرینی: {student.exercises && student.exercises.length > 0 ? "دارد" : "ندارد"}
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className={`rounded-full border ${
                      student.payment 
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {student.payment ? `${toPersianNumbers(student.payment)} تومان` : "بدون پرداختی"}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between pt-4 border-t">
                <div className="flex items-center gap-1">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteClick(student)}
                    className="h-8 px-2 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditClick(student)}
                    className="h-8"
                  >
                    ویرایش
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <User2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">هیچ شاگردی یافت نشد</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              {hasFilters 
                ? "با فیلترهای فعلی هیچ شاگردی یافت نشد. فیلترها را تغییر دهید یا حذف کنید."
                : "شاگردی در سیستم ثبت نشده است. با کلیک بر روی دکمه زیر، شاگرد جدید اضافه کنید."}
            </p>
            {hasFilters ? (
              <Button variant="outline" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" />
                حذف فیلترها
              </Button>
            ) : (
              <Button onClick={() => setShowDialog(true)}>
                <Plus className="ml-2 h-4 w-4" />
                افزودن شاگرد جدید
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Hidden printable div for PDF export */}
      <div id="studentsListPrintable" className="hidden">
        <div className="print-header p-4 text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">لیست شاگردان</h1>
          <p className="text-gray-500">تاریخ: {new Date().toLocaleDateString('fa-IR')}</p>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-right">نام</th>
              <th className="border p-2 text-right">شماره تماس</th>
              <th className="border p-2 text-right">قد</th>
              <th className="border p-2 text-right">وزن</th>
              <th className="border p-2 text-right">برنامه تمرینی</th>
              <th className="border p-2 text-right">پرداختی</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{toPersianNumbers(student.phone)}</td>
                <td className="border p-2">{toPersianNumbers(student.height)} سانتی‌متر</td>
                <td className="border p-2">{toPersianNumbers(student.weight)} کیلوگرم</td>
                <td className="border p-2">{student.exercises && student.exercises.length > 0 ? "دارد" : "ندارد"}</td>
                <td className="border p-2">{student.payment ? `${toPersianNumbers(student.payment)} تومان` : "بدون پرداختی"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="print-footer mt-6 p-4 text-center text-sm text-gray-500">
          <p>تعداد کل شاگردان: {toPersianNumbers(filteredAndSortedStudents.length)}</p>
          <p className="print-logo mt-2">مدیریت برنامه تمرینی فیکس</p>
        </div>
      </div>

      {/* Dialogs */}
      <StudentDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setSelectedStudent(null);
        }}
        onSave={handleAddOrUpdateStudent}
        student={selectedStudent || undefined}
      />

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedStudent(null);
        }}
        onConfirm={confirmDelete}
        title="حذف شاگرد"
        description={`آیا از حذف ${selectedStudent?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </PageContainer>
  );
};

export default Students;
