
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";

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

export const StudentDownloadDialog = ({ 
  open, 
  onOpenChange, 
  student, 
  exercises, 
  meals, 
  supplements, 
  vitamins 
}: StudentDownloadDialogProps) => {
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
      // Generate PDF
      const doc = generateStudentPDF(student, exercises, meals, supplements, trainerProfile);
      
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
      const printWindow = openPrintWindow(student, exercises, meals, supplements, trainerProfile);
      
      if (!printWindow) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "امکان باز کردن پنجره چاپ وجود ندارد."
        });
        return;
      }

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

        <ProfileWarning isProfileComplete={isProfileComplete} />
        <StudentSummary 
          student={student} 
          exercises={exercises} 
          meals={meals} 
          supplements={supplements} 
        />

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
