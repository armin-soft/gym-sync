
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { PrintExportButton } from "@/components/ui/PrintExportButton";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Printer, FileImage, Calendar, Download, Badge } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgramExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  programType?: 'exercise' | 'diet' | 'supplement' | 'all';
}

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const ProgramExportDialog: React.FC<ProgramExportDialogProps> = ({ 
  isOpen, 
  onClose, 
  student,
  programType = 'all'
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(programType);

  // Check if student has all required programs
  const hasProgramData = {
    exercise: Boolean(
      student.exercises?.length > 0 || 
      student.exercisesDay1?.length > 0 || 
      student.exercisesDay2?.length > 0 ||
      student.exercisesDay3?.length > 0 ||
      student.exercisesDay4?.length > 0 ||
      student.exercisesDay5?.length > 0
    ),
    diet: Boolean(
      student.meals?.length > 0 ||
      student.mealsDay1?.length > 0 ||
      student.mealsDay2?.length > 0 ||
      student.mealsDay3?.length > 0 
    ),
    supplement: Boolean(
      student.supplements?.length > 0 || 
      student.vitamins?.length > 0 ||
      (student.supplementsDay1 && student.supplementsDay1.length > 0) ||
      (student.vitaminsDay1 && student.vitaminsDay1.length > 0)
    ),
    all: false
  };
  
  hasProgramData.all = hasProgramData.exercise && hasProgramData.diet && hasProgramData.supplement;
  
  const canExport = activeTab === 'all' ? hasProgramData.all : hasProgramData[activeTab as keyof typeof hasProgramData];

  // Add a debug function to check what happens when we click export
  const handleExportClick = () => {
    console.log("Export button clicked");
    console.log("Active tab:", activeTab);
    console.log("Can export:", canExport);
    console.log("Student data:", student);
  };

  // If no data exists for any program, show warning
  if (!hasProgramData.exercise && !hasProgramData.diet && !hasProgramData.supplement) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800 mb-4">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 text-lg">برنامه‌ای برای خروجی یافت نشد</h3>
            <p className="text-red-600 dark:text-red-300">
              برای دریافت خروجی از برنامه‌های شاگرد، ابتدا باید برنامه تمرینی، غذایی یا مکمل به ایشان اختصاص دهید.
            </p>
            <div className="mt-4 flex items-center justify-end">
              <Button 
                onClick={onClose}
                className="bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
              >
                متوجه شدم
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 gap-0 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">خروجی برنامه‌های {student.name}</h2>
          <p className="text-white/80 text-sm">می‌توانید برنامه‌های این شاگرد را در قالب‌های مختلف دانلود کنید</p>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue={programType} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all" className="text-xs md:text-sm">همه برنامه‌ها</TabsTrigger>
              <TabsTrigger value="exercise" className="text-xs md:text-sm">برنامه تمرینی</TabsTrigger>
              <TabsTrigger value="diet" className="text-xs md:text-sm">برنامه غذایی</TabsTrigger>
              <TabsTrigger value="supplement" className="text-xs md:text-sm">مکمل و ویتامین</TabsTrigger>
            </TabsList>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {!canExport && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mb-4">
                  <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2 text-sm">برنامه ناقص است</h3>
                  <p className="text-amber-600 dark:text-amber-300 text-xs">
                    برای {activeTab === 'all' ? 'همه برنامه‌ها' : activeTab === 'exercise' ? 'برنامه تمرینی' : activeTab === 'diet' ? 'برنامه غذایی' : 'برنامه مکمل'} داده‌ای یافت نشد.
                  </p>
                </div>
              )}
              
              <TabsContent value="all" className={!canExport ? "opacity-50 pointer-events-none" : ""}>
                <ExportCard 
                  title="گزارش کامل برنامه"
                  description="شامل برنامه‌های تمرینی، غذایی و مکمل در یک فایل"
                  icon={<Calendar size={40} className="text-purple-600 dark:text-purple-400" />}
                  tags={["برنامه کامل", "اطلاعات جامع"]}
                  student={student}
                  documentType="all"
                  onDebugClick={handleExportClick}
                />
              </TabsContent>
              
              <TabsContent value="exercise" className={!hasProgramData.exercise ? "opacity-50 pointer-events-none" : ""}>
                <ExportCard 
                  title="برنامه تمرینی"
                  description="خروجی با جزئیات حرکات، ست‌ها و تکرارها"
                  icon={<FileImage size={40} className="text-blue-600 dark:text-blue-400" />}
                  tags={["اختصاصی تمرین", "تقویم روزانه"]}
                  student={student}
                  documentType="exercise"
                  onDebugClick={handleExportClick}
                />
              </TabsContent>
              
              <TabsContent value="diet" className={!hasProgramData.diet ? "opacity-50 pointer-events-none" : ""}>
                <ExportCard 
                  title="برنامه غذایی"
                  description="خروجی با جزئیات وعده‌های غذایی، مقادیر و زمان‌بندی"
                  icon={<FileText size={40} className="text-green-600 dark:text-green-400" />}
                  tags={["تغذیه روزانه", "کالری و ماکروها"]}
                  student={student}
                  documentType="diet"
                  onDebugClick={handleExportClick}
                />
              </TabsContent>
              
              <TabsContent value="supplement" className={!hasProgramData.supplement ? "opacity-50 pointer-events-none" : ""}>
                <ExportCard 
                  title="برنامه مکمل و ویتامین"
                  description="خروجی با جزئیات مکمل‌ها، ویتامین‌ها و زمان مصرف"
                  icon={<FileText size={40} className="text-orange-600 dark:text-orange-400" />}
                  tags={["مکمل غذایی", "ویتامین روزانه"]}
                  student={student}
                  documentType="supplement"
                  onDebugClick={handleExportClick}
                />
              </TabsContent>
            </motion.div>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>بستن</Button>
          </div>
        </div>
        
        {/* Hidden content for print/export */}
        <div id="program-export-content" className="hidden">
          <div className="export-header">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p>قد: {student.height} - وزن: {student.weight}</p>
            <div data-student-id={student.id}></div>
          </div>
          
          {/* Add more content here for the export */}
          <div className="export-content">
            {hasProgramData.exercise && (
              <div className="exercise-section">
                <h2>برنامه تمرینی</h2>
                {/* Add exercise data */}
              </div>
            )}
            
            {hasProgramData.diet && (
              <div className="diet-section">
                <h2>برنامه غذایی</h2>
                {/* Add diet data */}
              </div>
            )}
            
            {hasProgramData.supplement && (
              <div className="supplement-section">
                <h2>مکمل و ویتامین</h2>
                {/* Add supplement data */}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ExportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  student: Student;
  documentType: "student" | "workout" | "diet" | "supplement" | "all" | "exercise";
  onDebugClick?: () => void;
}

const ExportCard: React.FC<ExportCardProps> = ({ 
  title,
  description,
  icon,
  tags,
  student,
  documentType,
  onDebugClick
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse">
          <div className="p-5 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              {icon}
            </div>
          </div>
          
          <div className="col-span-2 p-5">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                  <Badge className="h-3 w-3" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <PrintExportButton
                documentType={documentType}
                title={`برنامه ${title} - ${student.name}`}
                filename={`program-${student.id}-${documentType}`}
                buttonDisplay="primary"
                contentId="program-export-content"
                onClick={onDebugClick}
                className="w-full md:w-auto justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
              />
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto justify-center"
                onClick={onDebugClick}
              >
                <Printer className="h-4 w-4 ml-1.5" />
                <span>پیش‌نمایش</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProgramExportDialog;
