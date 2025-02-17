
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
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "علی محمدی",
    phone: "09123456789",
    height: "۱۷۵",
    weight: "۷۵",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "رضا کریمی",
    phone: "09198765432",
    height: "۱۸۰",
    weight: "۸۲",
    image: "/placeholder.svg",
  },
];

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const handleDelete = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: "شاگرد با موفقیت حذف شد",
      description: "اطلاعات شاگرد مورد نظر از سیستم حذف شد.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">شاگردان</h2>
          <p className="text-muted-foreground">
            در این بخش می‌توانید شاگردان خود را مدیریت کنید
          </p>
        </div>
        <Button>
          <Plus className="ml-2 h-4 w-4" /> افزودن شاگرد
        </Button>
      </div>

      <Card>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تصویر</TableHead>
                <TableHead>نام و نام خانوادگی</TableHead>
                <TableHead>شماره موبایل</TableHead>
                <TableHead>قد (سانتی‌متر)</TableHead>
                <TableHead>وزن (کیلوگرم)</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="font-mono">{student.phone}</TableCell>
                  <TableCell>{student.height}</TableCell>
                  <TableCell>{student.weight}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Students;
