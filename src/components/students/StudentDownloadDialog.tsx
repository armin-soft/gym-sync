
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { TrainerProfile } from "@/types/trainer";

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface StudentDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any;
  exercises: any[];
  meals: any[];
  supplements: any[];
  vitamins: any[];
}

export const StudentDownloadDialog = ({
  open,
  onOpenChange,
  student,
  exercises,
  meals,
  supplements,
  vitamins,
}: StudentDownloadDialogProps) => {
  const { toast } = useToast();
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);

  // Load trainer profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setTrainerProfile(parsed);
      } catch (error) {
        console.error('Error loading trainer profile from localStorage:', error);
      }
    }
  }, []);

  const handleDownload = () => {
    if (!student) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اطلاعات شاگرد موجود نیست.",
      });
      return;
    }

    if (!trainerProfile) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اطلاعات مربی موجود نیست. لطفا ابتدا پروفایل مربی را تکمیل کنید.",
      });
      return;
    }

    const doc = new jsPDF();

    // عنوان اصلی و اطلاعات باشگاه
    doc.setFontSize(22);
    doc.setTextColor("#003049");
    doc.text(`${trainerProfile.gymName}`, 15, 20);
    
    doc.setFontSize(12);
    doc.text(`${trainerProfile.gymDescription}`, 15, 30);
    doc.text(`آدرس: ${trainerProfile.gymAddress}`, 15, 38);
    
    if (trainerProfile.phone) {
      doc.text(`تلفن: ${toPersianNumbers(trainerProfile.phone)}`, 15, 46);
    }
    
    if (trainerProfile.instagram) {
      doc.text(`اینستاگرام: ${trainerProfile.instagram}`, 15, 54);
    }
    
    if (trainerProfile.website) {
      doc.text(`وب‌سایت: ${trainerProfile.website}`, 15, 62);
    }

    // عنوان برنامه شاگرد
    doc.setFontSize(18);
    doc.setTextColor("#003049");
    doc.text(`برنامه شاگرد: ${student.name}`, 15, 75);

    // اطلاعات فردی
    doc.setFontSize(16);
    doc.setTextColor("#667788");
    doc.text("اطلاعات فردی", 15, 90);

    const personalData = [
      ["نام", student.name],
      ["شماره موبایل", toPersianNumbers(student.phone)],
      ["قد (سانتی متر)", toPersianNumbers(student.height)],
      ["وزن (کیلوگرم)", toPersianNumbers(student.weight)],
    ];

    doc.autoTable({
      body: personalData,
      startY: 95,
      styles: {
        font: "IRANSans",
        fontSize: 12,
        textColor: "#333",
        lineColor: "#003049",
        lineWidth: 0.2,
      },
      columnStyles: {
        0: { halign: "right" },
        1: { halign: "right" },
      },
      headerStyles: {
        fillColor: "#003049",
        textColor: "#fff",
        fontStyle: "normal",
      },
    });

    let currentY = doc.lastAutoTable.finalY + 15;

    // تمرینات
    if (student.exercises && student.exercises.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor("#667788");
      doc.text("برنامه تمرینی", 15, currentY);

      const studentExercises = exercises.filter((exercise) =>
        student.exercises.includes(exercise.id)
      );

      const exerciseData = studentExercises.map((exercise) => [
        exercise.name,
        exercise.description,
      ]);

      currentY += 5;

      doc.autoTable({
        head: [["نام تمرین", "توضیحات"]],
        body: exerciseData,
        startY: currentY,
        styles: {
          font: "IRANSans",
          fontSize: 12,
          textColor: "#333",
          lineColor: "#003049",
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { halign: "right" },
          1: { halign: "right" },
        },
        headerStyles: {
          fillColor: "#003049",
          textColor: "#fff",
          fontStyle: "normal",
        },
      });

      currentY = doc.lastAutoTable.finalY + 15;
    }

    // برنامه غذایی
    if (student.meals && student.meals.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor("#667788");
      doc.text("برنامه غذایی", 15, currentY);

      const studentMeals = meals.filter((meal) =>
        student.meals.includes(meal.id)
      );

      const mealData = studentMeals.map((meal) => [meal.name, meal.description]);

      currentY += 5;

      doc.autoTable({
        head: [["نام وعده", "توضیحات"]],
        body: mealData,
        startY: currentY,
        styles: {
          font: "IRANSans",
          fontSize: 12,
          textColor: "#333",
          lineColor: "#003049",
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { halign: "right" },
          1: { halign: "right" },
        },
        headerStyles: {
          fillColor: "#003049",
          textColor: "#fff",
          fontStyle: "normal",
        },
      });

      currentY = doc.lastAutoTable.finalY + 15;
    }

    // مکمل‌ها و ویتامین‌ها
    if (
      (student.supplements && student.supplements.length > 0) ||
      (student.vitamins && student.vitamins.length > 0)
    ) {
      doc.setFontSize(16);
      doc.setTextColor("#667788");
      doc.text("مکمل‌ها و ویتامین‌ها", 15, currentY);

      const supplementData = supplements
        .filter(
          (supplement) =>
            student.supplements?.includes(supplement.id) ||
            student.vitamins?.includes(supplement.id)
        )
        .map((item) => [item.name, item.description]);

      currentY += 5;

      doc.autoTable({
        head: [["نام مکمل/ویتامین", "توضیحات"]],
        body: supplementData,
        startY: currentY,
        styles: {
          font: "IRANSans",
          fontSize: 12,
          textColor: "#333",
          lineColor: "#003049",
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { halign: "right" },
          1: { halign: "right" },
        },
        headerStyles: {
          fillColor: "#003049",
          textColor: "#fff",
          fontStyle: "normal",
        },
      });
    }

    // ذخیره فایل PDF
    try {
      doc.save(`profile_${student.name}.pdf`);
      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام دانلود فایل PDF خطایی رخ داد.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <Download className="h-4 w-4 text-indigo-600" />
            </div>
            <span>دانلود اطلاعات شاگرد</span>
          </DialogTitle>
          <DialogDescription>
            دانلود اطلاعات شاگرد شامل اطلاعات فردی، برنامه تمرینی، برنامه غذایی،
            مکمل‌ها و ویتامین‌ها
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {trainerProfile ? (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-bold text-indigo-700 mb-1">{trainerProfile.gymName}</div>
              <div className="text-xs text-gray-600">{trainerProfile.gymDescription}</div>
              <div className="text-xs text-gray-600 mt-1">آدرس: {trainerProfile.gymAddress}</div>
            </div>
          ) : (
            <div className="text-amber-500 text-sm bg-amber-50 p-3 rounded-md">
              اطلاعات باشگاه تکمیل نشده است. لطفا ابتدا از قسمت پروفایل مربی، اطلاعات باشگاه را تکمیل کنید.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-700">نام:</div>
              <div className="text-sm text-gray-500">{student?.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">
                شماره موبایل:
              </div>
              <div className="text-sm text-gray-500">
                {toPersianNumbers(student?.phone)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">قد:</div>
              <div className="text-sm text-gray-500">
                {toPersianNumbers(student?.height)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">وزن:</div>
              <div className="text-sm text-gray-500">
                {toPersianNumbers(student?.weight)}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700">برنامه تمرینی:</div>
            {student?.exercises && student?.exercises.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {exercises
                  .filter((exercise) =>
                    student?.exercises.includes(exercise.id)
                  )
                  .map((exercise) => (
                    <li key={exercise.id}>{exercise.name}</li>
                  ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">
                هیچ برنامه تمرینی‌ای برای این شاگرد ثبت نشده است.
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700">برنامه غذایی:</div>
            {student?.meals && student?.meals.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {meals
                  .filter((meal) => student?.meals.includes(meal.id))
                  .map((meal) => (
                    <li key={meal.id}>{meal.name}</li>
                  ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">
                هیچ برنامه غذایی‌ای برای این شاگرد ثبت نشده است.
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700">
              مکمل‌ها و ویتامین‌ها:
            </div>
            {(student?.supplements && student?.supplements.length > 0) ||
            (student?.vitamins && student?.vitamins.length > 0) ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {supplements
                  .filter(
                    (item) =>
                      student?.supplements?.includes(item.id) ||
                      student?.vitamins?.includes(item.id)
                  )
                  .map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">
                هیچ مکمل یا ویتامینی برای این شاگرد ثبت نشده است.
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleDownload} 
            className="bg-indigo-500 text-white"
            disabled={!trainerProfile}
          >
            دانلود PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
