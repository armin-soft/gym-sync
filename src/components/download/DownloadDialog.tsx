
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { Download, FileText, Dumbbell, Bell } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
}

export const DownloadDialog: React.FC<DownloadDialogProps> = ({
  isOpen,
  onClose,
  student,
  exercises,
  meals,
  supplements
}) => {
  const [activeTab, setActiveTab] = useState("all");

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add student info header
    doc.setFontSize(18);
    doc.text(`برنامه ${student.name}`, 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`تاریخ ثبت: ${new Date().toLocaleDateString('fa-IR')}`, 105, 25, { align: 'center' });
    doc.text(`مربی: [نام مربی]`, 105, 32, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);

    let y = 45;

    // If downloading all or just exercises
    if (activeTab === 'all' || activeTab === 'exercises') {
      doc.setFontSize(14);
      doc.text('برنامه تمرینی', 105, y, { align: 'center' });
      y += 10;

      // Exercise Days
      for (let day = 1; day <= 4; day++) {
        const dayExercises = getExercisesForDay(day);
        if (dayExercises.length > 0) {
          doc.setFontSize(12);
          doc.text(`روز ${day}:`, 190, y);
          y += 7;

          const tableData = dayExercises.map(ex => [
            ex.sets,
            ex.reps,
            exercises.find(e => e.id === ex.id)?.name || ex.name || `حرکت ${ex.id}`
          ]);

          // @ts-ignore - jspdf-autotable types
          doc.autoTable({
            startY: y,
            head: [['ست', 'تکرار', 'نام حرکت']],
            body: tableData,
            headStyles: { fillColor: [67, 56, 202] },
            styles: { halign: 'center', rtl: true, font: 'Arial' },
            margin: { left: 15, right: 15 },
          });

          y = (doc as any).lastAutoTable.finalY + 10;
        }
      }
    }

    // If downloading all or just diet
    if (activeTab === 'all' || activeTab === 'diet') {
      // Add a new page if we're already too far down
      if (y > 200) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text('برنامه غذایی', 105, y, { align: 'center' });
      y += 10;

      if (student.meals && student.meals.length > 0) {
        const selectedMeals = meals.filter(meal => student.meals?.includes(meal.id));
        const tableData = selectedMeals.map(meal => [
          meal.mealType || '-',
          meal.name || `وعده ${meal.id}`
        ]);

        // @ts-ignore - jspdf-autotable types
        doc.autoTable({
          startY: y,
          head: [['وعده', 'نام غذا']],
          body: tableData,
          headStyles: { fillColor: [39, 174, 96] },
          styles: { halign: 'center', rtl: true, font: 'Arial' },
          margin: { left: 15, right: 15 },
        });

        y = (doc as any).lastAutoTable.finalY + 10;
      } else {
        doc.text('برنامه غذایی تعیین نشده است.', 105, y, { align: 'center' });
        y += 10;
      }
    }

    // If downloading all or just supplements
    if (activeTab === 'all' || activeTab === 'supplements') {
      // Add a new page if we're already too far down
      if (y > 200) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text('مکمل‌ها و ویتامین‌ها', 105, y, { align: 'center' });
      y += 10;

      if ((student.supplements && student.supplements.length > 0) || 
          (student.vitamins && student.vitamins.length > 0)) {
        
        const selectedSupplements = supplements.filter(sup => 
          student.supplements?.includes(sup.id) || student.vitamins?.includes(sup.id)
        );
        
        const tableData = selectedSupplements.map(sup => [
          sup.category === 'vitamin' ? 'ویتامین' : 'مکمل',
          sup.name || `مکمل ${sup.id}`
        ]);

        // @ts-ignore - jspdf-autotable types
        doc.autoTable({
          startY: y,
          head: [['نوع', 'نام مکمل/ویتامین']],
          body: tableData,
          headStyles: { fillColor: [211, 84, 0] },
          styles: { halign: 'center', rtl: true, font: 'Arial' },
          margin: { left: 15, right: 15 },
        });
      } else {
        doc.text('مکمل یا ویتامینی تعیین نشده است.', 105, y, { align: 'center' });
      }
    }

    // Add footer
    doc.setFontSize(10);
    doc.text('© تمامی حقوق محفوظ است.', 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`برنامه_${student.name}.pdf`);
  };

  // Helper function to get exercises for a specific day
  const getExercisesForDay = (dayNumber: number) => {
    let exerciseIds: number[] = [];
    let exerciseSets: Record<number, number> = {};
    let exerciseReps: Record<number, string> = {};

    switch(dayNumber) {
      case 1:
        exerciseIds = student.exercisesDay1 || [];
        exerciseSets = student.exerciseSetsDay1 || {};
        exerciseReps = student.exerciseRepsDay1 || {};
        break;
      case 2:
        exerciseIds = student.exercisesDay2 || [];
        exerciseSets = student.exerciseSetsDay2 || {};
        exerciseReps = student.exerciseRepsDay2 || {};
        break;
      case 3:
        exerciseIds = student.exercisesDay3 || [];
        exerciseSets = student.exerciseSetsDay3 || {};
        exerciseReps = student.exerciseRepsDay3 || {};
        break;
      case 4:
        exerciseIds = student.exercisesDay4 || [];
        exerciseSets = student.exerciseSetsDay4 || {};
        exerciseReps = student.exerciseRepsDay4 || {};
        break;
    }

    return exerciseIds.map(id => ({
      id,
      sets: exerciseSets[id] || 3,
      reps: exerciseReps[id] || '8',
      name: exercises.find(e => e.id === id)?.name
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>دانلود برنامه {student.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">کامل</TabsTrigger>
            <TabsTrigger value="exercises">تمرینی</TabsTrigger>
            <TabsTrigger value="diet">غذایی</TabsTrigger>
            <TabsTrigger value="supplements">مکمل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <FileText className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h3 className="font-bold text-lg">دانلود برنامه کامل</h3>
                <p className="text-gray-600">
                  شامل تمام برنامه‌های تمرینی، غذایی و مکمل‌ها در یک فایل
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exercises" className="mt-4">
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <Dumbbell className="h-12 w-12 text-purple-600 mr-4" />
              <div>
                <h3 className="font-bold text-lg">دانلود برنامه تمرینی</h3>
                <p className="text-gray-600">
                  شامل تمرین‌های هر روز به همراه جزئیات ست و تکرار
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="diet" className="mt-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Bell className="h-12 w-12 text-green-600 mr-4" />
              <div>
                <h3 className="font-bold text-lg">دانلود برنامه غذایی</h3>
                <p className="text-gray-600">
                  شامل وعده‌های غذایی و زمان‌بندی مصرف آن‌ها
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="supplements" className="mt-4">
            <div className="flex items-center p-4 bg-orange-50 rounded-lg">
              <Bell className="h-12 w-12 text-orange-600 mr-4" />
              <div>
                <h3 className="font-bold text-lg">دانلود برنامه مکمل</h3>
                <p className="text-gray-600">
                  شامل مکمل‌ها و ویتامین‌های تجویز شده
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="ml-2">
            انصراف
          </Button>
          <Button onClick={generatePDF} className="gap-2">
            <Download className="h-4 w-4" />
            دانلود PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
