
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { BackupSection } from "@/components/backup/BackupSection";
import { RestoreSection } from "@/components/backup/RestoreSection";
import { BackupHeader } from "@/components/backup/BackupHeader";

const BackupPage = () => {
  const deviceInfo = useDeviceInfo();

  // List of all localStorage keys we want to backup
  const dataKeys = [
    'students',
    'exercises',
    'exerciseTypes',
    'exerciseCategories',
    'meals',
    'supplements',
    'trainerProfile',
    'prevMonthStudents',
    'prevMonthMeals',
    'prevMonthSupplements'
  ];

  // تنظیمات ریسپانسیو برای اندازه‌های مختلف صفحه
  const getContainerClasses = () => {
    return "w-full h-full flex flex-col py-4 md:py-6 lg:py-8 space-y-4 md:space-y-6 lg:space-y-8 px-2 sm:px-4 md:px-6 lg:px-8";
  };

  const getTabsClasses = () => {
    return "space-y-4 md:space-y-5 lg:space-y-6 flex-1";
  };

  return (
    <PageContainer 
      withBackground 
      fullHeight 
      className="w-full h-full min-h-screen overflow-auto"
    >
      <div className={getContainerClasses()}>
        <BackupHeader 
          title="پشتیبان‌گیری و بازیابی"
          description="در این بخش می‌توانید از اطلاعات برنامه پشتیبان‌گیری کنید یا اطلاعات را از یک فایل پشتیبان بازیابی نمایید"
        />

        <Tabs defaultValue="backup" className={getTabsClasses()}>
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="backup" className="data-[state=active]:bg-background rounded-lg flex gap-2">
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              پشتیبان‌گیری
            </TabsTrigger>
            <TabsTrigger value="restore" className="data-[state=active]:bg-background rounded-lg flex gap-2">
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              بازیابی
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="h-full">
            <BackupSection dataKeys={dataKeys} />
          </TabsContent>

          <TabsContent value="restore" className="h-full">
            <RestoreSection dataKeys={dataKeys} />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default BackupPage;
