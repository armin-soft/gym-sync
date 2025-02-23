
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
import { Edit, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { StudentDialog } from "@/components/StudentDialog";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

  const handleDelete = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
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
    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...selectedStudent, ...data } : s
        )
      );
      toast({
        title: "اطلاعات شاگرد ویرایش شد",
        description: "تغییرات با موفقیت ذخیره شد.",
      });
    } else {
      const newStudent: Student = {
        ...data,
        id: Math.max(...students.map((s) => s.id), 0) + 1,
      };
      setStudents([...students, newStudent]);
      toast({
        title: "شاگرد جدید اضافه شد",
        description: "اطلاعات شاگرد جدید با موفقیت ثبت شد.",
      });
    }
    setIsDialogOpen(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchQuery) || student.phone.includes(searchQuery)
  );

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">شاگردان</h2>
            <p className="text-muted-foreground mt-2">
              در این بخش می‌توانید شاگردان خود را مدیریت کنید
            </p>
          </div>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="ml-2 h-4 w-4" />
            افزودن شاگرد
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو بر اساس نام یا شماره موبایل..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">تصویر</TableHead>
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
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    هیچ شاگردی وجود ندارد
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell dir="ltr" className="font-mono">{toPersianNumbers(student.phone)}</TableCell>
                    <TableCell>{toPersianNumbers(student.height)}</TableCell>
                    <TableCell>{toPersianNumbers(student.weight)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary/10 hover:text-primary"
                          onClick={() => handleEdit(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(student.id)}
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
        </div>
      </Card>

      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students;
