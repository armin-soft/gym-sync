
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";

// Add type declarations for jspdf-autotable
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
    // Load trainer profile from localStorage
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile(profile);
        
        // Check if gym info is complete
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
      // Create PDF with jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Add gym info at the top
      doc.setFontSize(18);
      doc.setTextColor(0, 48, 73); // #003049
      doc.text(`${trainerProfile.gymName}`, 15, 15);
      
      doc.setFontSize(12);
      doc.setTextColor(102, 119, 136); // #667788
      doc.text(`آدرس: ${trainerProfile.gymAddress}`, 15, 22);
      
      if (trainerProfile.phone) {
        doc.text(`تلفن: ${toPersianNumbers(trainerProfile.phone)}`, 15, 29);
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

      // Main title
      doc.setFontSize(22);
      doc.setTextColor(0, 48, 73); // #003049
      doc.text(`پروفایل شاگرد: ${student.name}`, 15, 50);

      // Personal information
      doc.setFontSize(16);
      doc.setTextColor(102, 119, 136); // #667788
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
          font: "courier",
          fontSize: 12,
          textColor: [51, 51, 51],
          lineColor: [0, 48, 73],
          lineWidth: 0.2
        },
        columnStyles: {
          0: { halign: "right" },
          1: { halign: "right" }
        },
        headerStyles: {
          fillColor: [0, 48, 73],
          textColor: [255, 255, 255],
          fontStyle: "normal"
        }
      });

      let currentY = doc.lastAutoTable.finalY + 15;

      // Exercise program
      if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
        doc.setFontSize(16);
        doc.setTextColor(102, 119, 136); // #667788
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
            font: "courier",
            fontSize: 12,
            textColor: [51, 51, 51],
            lineColor: [0, 48, 73],
            lineWidth: 0.2
          },
          columnStyles: {
            0: { halign: "right" },
            1: { halign: "right" }
          },
          headerStyles: {
            fillColor: [0, 48, 73],
            textColor: [255, 255, 255],
            fontStyle: "normal"
          }
        });

        currentY = doc.lastAutoTable.finalY + 15;
      }

      // Diet program
      if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
        doc.setFontSize(16);
        doc.setTextColor(102, 119, 136); // #667788
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
            font: "courier",
            fontSize: 12,
            textColor: [51, 51, 51],
            lineColor: [0, 48, 73],
            lineWidth: 0.2
          },
          columnStyles: {
            0: { halign: "right" },
            1: { halign: "right" }
          },
          headerStyles: {
            fillColor: [0, 48, 73],
            textColor: [255, 255, 255],
            fontStyle: "normal"
          }
        });

        currentY = doc.lastAutoTable.finalY + 15;
      }

      // Supplements and vitamins
      if ((student.supplements && student.supplements.length > 0) || 
          (student.vitamins && student.vitamins.length > 0) && 
          supplements && supplements.length > 0) {
        
        doc.setFontSize(16);
        doc.setTextColor(102, 119, 136); // #667788
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
              font: "courier",
              fontSize: 12,
              textColor: [51, 51, 51],
              lineColor: [0, 48, 73],
              lineWidth: 0.2
            },
            columnStyles: {
              0: { halign: "right" },
              1: { halign: "right" }
            },
            headerStyles: {
              fillColor: [0, 48, 73],
              textColor: [255, 255, 255],
              fontStyle: "normal"
            }
          });
        }
      }

      // Save the PDF file
      doc.save(`profile_${student.name}.pdf`);
      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد."
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام دانلود فایل PDF خطایی رخ داد."
      });
    }
  };

  const handlePrint = () => {
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
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "امکان باز کردن پنجره چاپ وجود ندارد."
        });
        return;
      }

      // HTML content for printing
      printWindow.document.write(`
        <html dir="rtl">
        <head>
          <title>اطلاعات شاگرد: ${student.name}</title>
          <style>
            @media print {
              @page { size: A4; margin: 1cm; }
            }
            body {
              font-family: 'Tahoma', 'Arial', sans-serif;
              margin: 20px;
              direction: rtl;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #003049;
              padding-bottom: 10px;
            }
            .gym-name {
              font-size: 24px;
              font-weight: bold;
              color: #003049;
            }
            .gym-info {
              color: #667788;
              font-size: 14px;
              margin-top: 5px;
            }
            .section-title {
              color: #003049;
              font-size: 18px;
              margin-top: 20px;
              margin-bottom: 10px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .student-header {
              font-size: 22px;
              color: #003049;
              text-align: center;
              margin: 20px 0;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .info-table th, .info-table td {
              border: 1px solid #ddd;
              padding: 8px 12px;
              text-align: right;
            }
            .info-table th {
              background-color: #f4f4f4;
              font-weight: bold;
              width: 30%;
            }
            .item-list {
              list-style-type: none;
              padding-right: 20px;
            }
            .item-list li {
              margin-bottom: 5px;
              padding: 5px;
              border-bottom: 1px dashed #eee;
            }
            .print-button {
              padding: 10px 20px;
              background-color: #003049;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-family: 'Tahoma', sans-serif;
              margin: 20px auto;
              display: block;
            }
            @media print {
              .print-button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="gym-name">${trainerProfile.gymName}</div>
            <div class="gym-info">آدرس: ${trainerProfile.gymAddress}</div>
            ${trainerProfile.phone ? `<div class="gym-info">تلفن: ${toPersianNumbers(trainerProfile.phone)}</div>` : ''}
            ${trainerProfile.website ? `<div class="gym-info">وب‌سایت: ${trainerProfile.website}</div>` : ''}
            ${trainerProfile.instagram ? `<div class="gym-info">اینستاگرام: ${trainerProfile.instagram}</div>` : ''}
          </div>

          <h1 class="student-header">پروفایل شاگرد: ${student.name}</h1>

          <h2 class="section-title">اطلاعات فردی</h2>
          <table class="info-table">
            <tr>
              <th>نام</th>
              <td>${student.name || ''}</td>
            </tr>
            <tr>
              <th>شماره موبایل</th>
              <td>${student.phone ? toPersianNumbers(student.phone) : ''}</td>
            </tr>
            <tr>
              <th>قد (سانتی متر)</th>
              <td>${student.height ? toPersianNumbers(student.height) : ''}</td>
            </tr>
            <tr>
              <th>وزن (کیلوگرم)</th>
              <td>${student.weight ? toPersianNumbers(student.weight) : ''}</td>
            </tr>
          </table>
      `);

      // Add exercise section if exists
      if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
        const studentExercises = exercises.filter(exercise => 
          student.exercises?.includes(exercise.id)
        );

        if (studentExercises.length > 0) {
          printWindow.document.write(`
            <h2 class="section-title">برنامه تمرینی</h2>
            <table class="info-table">
              <tr>
                <th>نام تمرین</th>
                <th>توضیحات</th>
              </tr>
          `);

          studentExercises.forEach(exercise => {
            printWindow.document.write(`
              <tr>
                <td>${exercise.name || ''}</td>
                <td>${exercise.description || ''}</td>
              </tr>
            `);
          });

          printWindow.document.write(`</table>`);
        }
      }

      // Add diet section if exists
      if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
        const studentMeals = meals.filter(meal => 
          student.meals?.includes(meal.id)
        );

        if (studentMeals.length > 0) {
          printWindow.document.write(`
            <h2 class="section-title">برنامه غذایی</h2>
            <table class="info-table">
              <tr>
                <th>نام وعده</th>
                <th>توضیحات</th>
              </tr>
          `);

          studentMeals.forEach(meal => {
            printWindow.document.write(`
              <tr>
                <td>${meal.name || ''}</td>
                <td>${meal.description || ''}</td>
              </tr>
            `);
          });

          printWindow.document.write(`</table>`);
        }
      }

      // Add supplements section if exists
      if (((student.supplements && student.supplements.length > 0) || 
          (student.vitamins && student.vitamins.length > 0)) && 
          supplements && supplements.length > 0) {
        
        const studentSupplements = supplements.filter(supplement => 
          (student.supplements?.includes(supplement.id)) || 
          (student.vitamins?.includes(supplement.id))
        );

        if (studentSupplements.length > 0) {
          printWindow.document.write(`
            <h2 class="section-title">مکمل‌ها و ویتامین‌ها</h2>
            <table class="info-table">
              <tr>
                <th>نام مکمل/ویتامین</th>
                <th>توضیحات</th>
              </tr>
          `);

          studentSupplements.forEach(supplement => {
            printWindow.document.write(`
              <tr>
                <td>${supplement.name || ''}</td>
                <td>${supplement.description || ''}</td>
              </tr>
            `);
          });

          printWindow.document.write(`</table>`);
        }
      }

      // End HTML and add print command
      printWindow.document.write(`
          <button onclick="window.print();" class="print-button">چاپ</button>
        </body>
        </html>
      `);

      printWindow.document.close();
      
      // Auto-trigger print after window loads
      printWindow.onload = function() {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 1000);
      };

      toast({
        title: "آماده برای چاپ",
        description: "صفحه چاپ با موفقیت آماده شد."
      });
    } catch (error) {
      console.error("Error preparing print:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در آماده‌سازی چاپ خطایی رخ داد."
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

        <div className="flex justify-end gap-2">
          <Button 
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1" 
            disabled={!isProfileComplete}
          >
            <Printer size={16} />
            چاپ
          </Button>
          <Button 
            onClick={handleDownload}
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-1" 
            disabled={!isProfileComplete}
          >
            <Download size={16} />
            دانلود PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
