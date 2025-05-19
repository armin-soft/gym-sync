
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { PrintExportButton } from "@/components/ui/PrintExportButton";
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { FileText, ArrowLeftRight, Clock } from 'lucide-react';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const DownloadDialog: React.FC<DownloadDialogProps> = ({ isOpen, onClose, student }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");

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
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-4">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 text-lg">برنامه‌ها ناقص است</h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              برای دانلود برنامه، باید حداقل یک برنامه تمرینی، یک برنامه غذایی و یک برنامه مکمل یا ویتامین به شاگرد اختصاص داده شود.
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>بستن</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">دانلود برنامه‌های {student.name}</h2>
          <p className="text-white/80 text-sm">می‌توانید برنامه‌های این شاگرد را در قالب‌های مختلف دانلود کنید</p>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" className="text-xs md:text-sm">همه برنامه‌ها</TabsTrigger>
              <TabsTrigger value="exercise" className="text-xs md:text-sm">برنامه تمرینی</TabsTrigger>
              <TabsTrigger value="diet" className="text-xs md:text-sm">برنامه غذایی</TabsTrigger>
              <TabsTrigger value="supplement" className="text-xs md:text-sm">مکمل و ویتامین</TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse">
                  <div className="p-5 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-2">
                      <FileText size={40} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  
                  <div className="col-span-2 p-5">
                    <h3 className="text-xl font-bold mb-2">فایل PDF</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                      دانلود با فرمت استاندارد PDF برای چاپ و اشتراک‌گذاری آسان
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                        <ArrowLeftRight className="h-3 w-3" />
                        <span>چندین سایز</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>ذخیره‌سازی و استفاده بعدی</span>
                      </div>
                    </div>
                    
                    <PrintExportButton
                      documentType={activeTab as any}
                      title={`برنامه ${student.name}`}
                      filename={`program-${student.id}-${activeTab}`}
                      buttonDisplay="primary"
                      className="w-full md:w-auto justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    />
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="hidden">
              <div className="print-header">
                <h1>{student.name}</h1>
                <p>قد: {student.height} - وزن: {student.weight}</p>
                <div data-student-id={student.id}></div>
              </div>
            </div>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>بستن</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
