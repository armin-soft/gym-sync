
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RestoreHeader } from "./RestoreHeader";
import { RestoreGuideSection } from "./RestoreGuideSection";
import { RestoreUploadSection } from "./RestoreUploadSection";
import { RestoreResultMessage } from "./RestoreResultMessage";

interface RestoreSectionContainerProps {
  dataKeys: string[];
}

export function RestoreSectionContainer({ dataKeys }: RestoreSectionContainerProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileRestore = (file: File) => {
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreSuccess(null);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backupData = JSON.parse(content);
        const stats: Record<string, number> = {};
        
        // Verify backup file structure
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        // Restore data to localStorage
        dataKeys.forEach(key => {
          if (key in backupData) {
            const dataToStore = backupData[key];
            
            // Skip null values (missing data)
            if (dataToStore !== null) {
              localStorage.setItem(key, JSON.stringify(dataToStore));
              
              // Calculate stats for arrays
              if (Array.isArray(dataToStore)) {
                stats[key] = dataToStore.length;
              } else {
                stats[key] = 1;
              }
            } else {
              stats[key] = 0;
            }
          }
        });
        
        // Trigger storage event for components to reload
        window.dispatchEvent(new Event('storage'));
        
        setRestoreStats(stats);
        setRestoreSuccess(true);
        setRestoreMessage("بازیابی اطلاعات با موفقیت انجام شد");
        setIsLoading(false);
        
        toast({
          title: "بازیابی موفق",
          description: "اطلاعات با موفقیت بازیابی شدند",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
        });
      } catch (error) {
        console.error("Error restoring backup:", error);
        setRestoreSuccess(false);
        setRestoreMessage("خطا در بازیابی اطلاعات. لطفاً یک فایل پشتیبان معتبر انتخاب کنید");
        setIsLoading(false);
        
        toast({
          variant: "destructive",
          title: "خطا در بازیابی",
          description: "مشکلی در فرآیند بازیابی به وجود آمده است",
        });
      }
    };
    
    reader.onerror = () => {
      setRestoreSuccess(false);
      setRestoreMessage("خطا در خواندن فایل");
      setIsLoading(false);
      
      toast({
        variant: "destructive",
        title: "خطا در خواندن فایل",
        description: "مشکلی در خواندن فایل به وجود آمده است",
      });
    };
    
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      dir="rtl"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
        <RestoreHeader />

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <RestoreGuideSection />

            <div>
              <RestoreUploadSection
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                isLoading={isLoading}
                onFileRestore={handleFileRestore}
              />
              
              <RestoreResultMessage
                restoreSuccess={restoreSuccess}
                restoreMessage={restoreMessage}
                restoreStats={restoreStats}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
