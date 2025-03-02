
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Upload, 
  Database, 
  ArrowDown, 
  ArrowUp, 
  ShieldCheck, 
  AlertCircle,
  Check,
  X
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const BackupPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

  const createBackup = () => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Collect all data from localStorage
      dataKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            backupData[key] = parsedData;
            
            // Calculate stats for arrays
            if (Array.isArray(parsedData)) {
              stats[key] = parsedData.length;
            } else {
              stats[key] = 1;
            }
          } catch (e) {
            console.error(`Error parsing ${key}:`, e);
            backupData[key] = data;
            stats[key] = 0;
          }
        } else {
          backupData[key] = null;
          stats[key] = 0;
        }
      });
      
      // Create JSON string with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `gym-manager-backup-${timestamp}.json`;
      const backupString = JSON.stringify(backupData, null, 2);
      
      // Create download file
      const blob = new Blob([backupString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setBackupStats(stats);
      setIsLoading(false);
      
      toast({
        title: "پشتیبان‌گیری موفق",
        description: "اطلاعات با موفقیت در فایل ذخیره شد",
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری به وجود آمده است",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
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

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          پشتیبان‌گیری و بازیابی
        </h2>
        <p className="text-muted-foreground">
          در این بخش می‌توانید از اطلاعات برنامه پشتیبان‌گیری کنید یا اطلاعات را از یک فایل پشتیبان بازیابی نمایید
        </p>
      </div>

      <Tabs defaultValue="backup" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="backup" className="data-[state=active]:bg-background rounded-lg flex gap-2">
            <Download className="h-4 w-4" />
            پشتیبان‌گیری
          </TabsTrigger>
          <TabsTrigger value="restore" className="data-[state=active]:bg-background rounded-lg flex gap-2">
            <Upload className="h-4 w-4" />
            بازیابی
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backup" className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-teal-950 dark:via-gray-900 dark:to-blue-950 border-teal-100 dark:border-teal-900">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 dark:bg-teal-900 p-4 rounded-xl">
                  <Database className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">پشتیبان‌گیری از اطلاعات</h3>
                  <p className="text-sm text-muted-foreground">
                    تمام اطلاعات برنامه در یک فایل ذخیره خواهد شد
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">داده‌های موجود برای پشتیبان‌گیری:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">شاگردان</span>
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">تمرینات</span>
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">برنامه‌های غذایی</span>
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">مکمل‌ها</span>
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">پروفایل مربی</span>
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">اقدامات:</h4>
                  <div className="mt-4">
                    <Button 
                      onClick={createBackup} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-r-2 border-white"></div>
                          <span>در حال پشتیبان‌گیری...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          <span>ایجاد فایل پشتیبان</span>
                        </div>
                      )}
                    </Button>
                  </div>
                  
                  {Object.keys(backupStats).length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg"
                    >
                      <p className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        پشتیبان‌گیری انجام شد
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 border-indigo-100 dark:border-indigo-900">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">بازیابی اطلاعات</h3>
                  <p className="text-sm text-muted-foreground">
                    اطلاعات را از یک فایل پشتیبان بازیابی کنید
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">راهنمای بازیابی:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">انتخاب فایل پشتیبان (JSON)</span>
                      <ArrowUp className="h-4 w-4 text-indigo-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">بررسی و بازیابی اطلاعات</span>
                      <ArrowUp className="h-4 w-4 text-indigo-500" />
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">جایگزینی اطلاعات فعلی</span>
                      <ArrowUp className="h-4 w-4 text-indigo-500" />
                    </li>
                  </ul>
                  
                  <Alert className="mt-4 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>هشدار</AlertTitle>
                    <AlertDescription>
                      با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">آپلود فایل پشتیبان:</h4>
                  <div className="mt-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button 
                      onClick={handleRestoreClick} 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-r-2 border-white"></div>
                          <span>در حال بازیابی...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>انتخاب فایل پشتیبان</span>
                        </div>
                      )}
                    </Button>
                  </div>
                  
                  {restoreSuccess !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-lg ${
                        restoreSuccess 
                          ? "bg-green-50 dark:bg-green-900/30" 
                          : "bg-red-50 dark:bg-red-900/30"
                      }`}
                    >
                      <p className={`text-sm font-medium flex items-center gap-1 ${
                        restoreSuccess 
                          ? "text-green-700 dark:text-green-300" 
                          : "text-red-700 dark:text-red-300"
                      }`}>
                        {restoreSuccess ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        {restoreMessage}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackupPage;
