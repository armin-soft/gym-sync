
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import PrintView from "./PrintView";

interface PrintButtonProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary" | "gradient" | "success" | "warning" | "info";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  student,
  exercises,
  meals,
  supplements,
  variant = "outline",
  size = "sm",
  className
}) => {
  const [showPrintView, setShowPrintView] = useState(false);
  const [trainerInfo, setTrainerInfo] = useState<{
    name: string;
    gymName: string;
    phone: string;
    logo?: string;
  } | null>(null);

  // Load trainer info from localStorage
  React.useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("trainerProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerInfo({
          name: profile.name || "مربی",
          gymName: profile.gymName || "باشگاه",
          phone: profile.phone || "",
          logo: profile.logo || ""
        });
      }
    } catch (error) {
      console.error("Error loading trainer profile:", error);
    }
  }, []);

  const handleOpenPrintView = () => {
    setShowPrintView(true);
  };

  const handleClosePrintView = () => {
    setShowPrintView(false);
  };

  if (size === "icon") {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenPrintView}
          className="h-8 w-8 rounded-full"
          title="چاپ برنامه"
        >
          <Printer className="h-4 w-4" />
        </Button>
        
        {showPrintView && (
          <PrintView
            student={student}
            exercises={exercises}
            meals={meals}
            supplements={supplements}
            onClose={handleClosePrintView}
            trainerInfo={trainerInfo || undefined}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleOpenPrintView}
        className={className}
      >
        <Printer className="h-4 w-4 ml-1.5" />
        چاپ برنامه
      </Button>
      
      {showPrintView && (
        <PrintView
          student={student}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
          onClose={handleClosePrintView}
          trainerInfo={trainerInfo || undefined}
        />
      )}
    </>
  );
};

export default PrintButton;
