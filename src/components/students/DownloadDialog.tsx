
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { PrintExportButton } from "@/components/ui/PrintExportButton";
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const DownloadDialog: React.FC<DownloadDialogProps> = ({ isOpen, onClose, student }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');

  const programCompleted = 
    (student.exercises?.length > 0 || 
     student.exercisesDay1?.length > 0 || 
     student.exercisesDay2?.length > 0 || 
     student.exercisesDay3?.length > 0 || 
     student.exercisesDay4?.length > 0) && 
    (student.meals?.length > 0) && 
    (student.supplements?.length > 0 || student.vitamins?.length > 0);

  if (!programCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>برنامه‌ها ناقص است</DialogTitle>
          <DialogDescription>
            برای دانلود برنامه، باید حداقل یک برنامه تمرینی، یک برنامه غذایی و یک برنامه مکمل یا ویتامین به شاگرد اختصاص داده شود.
          </DialogDescription>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>بستن</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-6 overflow-hidden">
        <DialogTitle className="text-center text-2xl font-bold mb-2">دانلود برنامه‌ها</DialogTitle>
        <DialogDescription className="text-center mb-6">
          می‌توانید برنامه‌های {student.name} را در قالب‌های مختلف دانلود کنید
        </DialogDescription>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">همه برنامه‌ها</TabsTrigger>
            <TabsTrigger value="exercise">برنامه تمرینی</TabsTrigger>
            <TabsTrigger value="diet">برنامه غذایی</TabsTrigger>
            <TabsTrigger value="supplement">مکمل و ویتامین</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card className="p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-full">
                  <FileText size={28} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">PDF قابل دانلود</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">خروجی با کیفیت برای دانلود و چاپ</p>
                </div>
              </div>
              <p className="mb-4 text-sm">برنامه با فرمت استاندارد PDF برای دانلود با کیفیت بالا و قابلیت چاپ</p>
              <PrintExportButton
                documentType={activeTab as any}
                title={`برنامه ${student.name}`}
                filename={`program-${student.id}-${activeTab}`}
                buttonDisplay="primary"
              />
            </Card>
          </div>

          <div id="print-content" className="hidden">
            <div className="print-header">
              <h1>{student.name}</h1>
              <p>قد: {student.height} - وزن: {student.weight}</p>
              <div data-student-id={student.id}></div>
            </div>
            {/* Content will be dynamically generated for printing */}
          </div>

        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>بستن</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
