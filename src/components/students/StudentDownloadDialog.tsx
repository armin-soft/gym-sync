
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";

// افزودن type declarations برای jspdf-autotable
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
  student: {
    id: number;
    name: string;
    phone: string;
    height: string;
    weight: string;
    exercises?: number[];
    meals?: number[];
    supplements?: number[];
    vitamins?: number[];
  } | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
  vitamins: any[];
}

export const StudentDownloadDialog = ({ open, onOpenChange, student, exercises, meals, supplements, vitamins }: StudentDownloadDialogProps) => {
  const { toast } = useToast();
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // خواندن اطلاعات مربی از localStorage
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile(profile);
        
        // بررسی کامل بودن اطلاعات باشگاه
        setIsProfileComplete(
          !!profile && 
          !!profile.gymName && profile.gymName.trim() !== '' && 
          !!profile.gymAddress && profile.gymAddress.trim() !== ''
        );
      }
    } catch (error) {
      console.error("Error loading trainer profile:", error);
    }
  }, [open]);

  const handleDownload = () => {
    if (!student) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اطلاعات شاگرد موجود نیست."
      });
      return;
    }

    if (!trainerProfile || !isProfileComplete) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل تکمیل کنید."
      });
      return;
    }

    try {
      const doc = new jsPDF();

      // اطلاعات باشگاه در بالای صفحه
      doc.setFontSize(18);
      doc.setTextColor("#003049");
      doc.text(`${trainerProfile.gymName}`, 15, 15);
      
      doc.setFontSize(12);
      doc.setTextColor("#667788");
      doc.text(`آدرس: ${trainerProfile.gymAddress}`, 15, 22);
      
      if (trainerProfile.phone) {
        doc.text(`تلفن: ${trainerProfile.phone}`, 15, 29);
      }
      
      let contactLine = "";
      if (trainerProfile.website) {
        contactLine += `وب‌سایت: ${trainerProfile.website}`;
      }
      if (trainerProfile.instagram) {
        if (contactLine) contactLine += " | ";
        contactLine += `اینستاگرام: ${trainerProfile.instagram}`;
      }
      
      if (contactLine) {
        doc.text(contactLine, 15, 36);
      }

      // عنوان اصلی
      doc.setFontSize(22);
      doc.setTextColor("#003049");
      doc.text(`پروفایل شاگرد: ${student.name}`, 15, 50);

      // اطلاعات فردی
      doc.setFontSize(16);
      doc.setTextColor("#667788");
      doc.text("اطلاعات فردی", 15, 65);

      const personalData = [
        ["نام", student.name || ''],
        ["شماره موبایل", student.phone ? toPersianNumbers(student.phone) : ''],
        ["قد (سانتی متر)", student.height ? toPersianNumbers(student.height) : ''],
        ["وزن (کیلوگرم)", student.weight ? toPersianNumbers(student.weight) : '']
      ];

      doc.autoTable({
        body: personalData,
        startY: 70,
        styles: {
          font: "IRANSans",
          fontSize: 12,
          textColor: "#333",
          lineColor: "#003049",
          lineWidth: 0.2
        },
        columnStyles: {
          0: { halign: "right" },
          1: { halign: "right" }
        },
        headerStyles: {
          fillColor: "#003049",
          textColor: "#fff",
          fontStyle: "normal"
        }
      });

      let currentY = doc.lastAutoTable.finalY + 15;

      // تمرینات
      if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
        doc.setFontSize(16);
        doc.setTextColor("#667788");
        doc.text("برنامه تمرینی", 15, currentY);

        const studentExercises = exercises.filter((exercise) => 
          student.exercises && student.exercises.includes(exercise.id)
        );

        const exerciseData = studentExercises.map((exercise) => [
          exercise.name || "",
          exercise.description || ""
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
            lineWidth: 0.2
          },
          columnStyles: {
            0: { halign: "right" },
            1: { halign: "right" }
          },
          headerStyles: {
            fillColor: "#003049",
            textColor: "#fff",
            fontStyle: "normal"
          }
        });

        currentY = doc.lastAutoTable.finalY + 15;
      }

      // برنامه غذایی
      if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
        doc.setFontSize(16);
        doc.setTextColor("#667788");
        doc.text("برنامه غذایی", 15, currentY);

        const studentMeals = meals.filter((meal) => 
          student.meals && student.meals.includes(meal.id)
        );

        const mealData = studentMeals.map((meal) => [
          meal.name || "",
          meal.description || ""
        ]);

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
            lineWidth: 0.2
          },
          columnStyles: {
            0: { halign: "right" },
            1: { halign: "right" }
          },
          headerStyles: {
            fillColor: "#003049",
            textColor: "#fff",
            fontStyle: "normal"
          }
        });

        currentY = doc.lastAutoTable.finalY + 15;
      }

      // مکمل‌ها و ویتامین‌ها
      if ((student.supplements && student.supplements.length > 0) || 
          (student.vitamins && student.vitamins.length > 0) && 
          supplements && supplements.length > 0) {
        
        doc.setFontSize(16);
        doc.setTextColor("#667788");
        doc.text("مکمل‌ها و ویتامین‌ها", 15, currentY);

        const supplementData = supplements
          .filter((supplement) => 
            (student.supplements && student.supplements.includes(supplement.id)) || 
            (student.vitamins && student.vitamins.includes(supplement.id))
          )
          .map((item) => [
            item.name || "",
            item.description || ""
          ]);

        currentY += 5;

        if (supplementData.length > 0) {
          doc.autoTable({
            head: [["نام مکمل/ویتامین", "توضیحات"]],
            body: supplementData,
            startY: currentY,
            styles: {
              font: "IRANSans",
              fontSize: 12,
              textColor: "#333",
              lineColor: "#003049",
              lineWidth: 0.2
            },
            columnStyles: {
              0: { halign: "right" },
              1: { halign: "right" }
            },
            headerStyles: {
              fillColor: "#003049",
              textColor: "#fff",
              fontStyle: "normal"
            }
          });
        }
      }

      // ذخیره فایل PDF
      doc.save(`profile_${student.name}.pdf`);
      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد."
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام دانلود فایل PDF خطایی رخ داد."
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
          {!isProfileComplete && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-700 text-sm">
              <p className="font-bold mb-1">تکمیل اطلاعات باشگاه</p>
              <p>برای دانلود پروفایل شاگرد، لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل مربی تکمیل کنید.</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-700">نام:</div>
              <div className="text-sm text-gray-500">{student?.name || '-'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">شماره موبایل:</div>
              <div className="text-sm text-gray-500" dir="ltr">
                {student?.phone ? toPersianNumbers(student.phone) : '-'}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700">قد:</div>
              <div className="text-sm text-gray-500">
                {student?.height ? toPersianNumbers(student.height) : '-'}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700">وزن:</div>
              <div className="text-sm text-gray-500">
                {student?.weight ? toPersianNumbers(student.weight) : '-'}
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-700">برنامه تمرینی:</div>
            {student?.exercises && student.exercises.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {exercises
                  .filter(exercise => student.exercises?.includes(exercise.id))
                  .map(exercise => (
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
            {student?.meals && student.meals.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {meals
                  .filter(meal => student.meals?.includes(meal.id))
                  .map(meal => (
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
            <div className="text-sm font-medium text-gray-700">مکمل‌ها و ویتامین‌ها:</div>
            {(student?.supplements && student.supplements.length > 0) ||
            (student?.vitamins && student.vitamins.length > 0) ? (
              <ul className="list-disc list-inside text-sm text-gray-500">
                {supplements
                  .filter(
                    item =>
                      student.supplements?.includes(item.id) ||
                      student.vitamins?.includes(item.id)
                  )
                  .map(item => (
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
            disabled={!isProfileComplete}
          >
            دانلود PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
