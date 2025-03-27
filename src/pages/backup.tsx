
import { useState, useRef, useEffect } from "react";
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
  X,
  History,
  FileBox,
  FileJson,
  RefreshCw,
  Server,
  Clock,
  Calendar,
  CheckCircle2,
  CloudCog
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BackupData {
  date: string;
  size: string;
  items: Record<string, number>;
}

const BackupPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backupHistory, setBackupHistory] = useState<BackupData[]>([]);
  const [selectedBackupMethod, setSelectedBackupMethod] = useState<"full" | "partial">("full");
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);

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

  // Load existing data on component mount to show accurate statistics
  useEffect(() => {
    // Get current data stats
    const stats: Record<string, number> = {};
    dataKeys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData)) {
            stats[key] = parsedData.length;
          } else {
            stats[key] = 1;
          }
        } catch (e) {
          stats[key] = 0;
        }
      } else {
        stats[key] = 0;
      }
    });
    setBackupStats(stats);
    
    // Simulate backup history
    // In a real app, this would come from localStorage or a server
    const mockHistory: BackupData[] = [
      {
        date: new Date().toLocaleDateString('fa-IR'),
        size: '42 کیلوبایت',
        items: stats
      }
    ];
    setBackupHistory(mockHistory);
    
    // Initialize selected data types with all keys
    setSelectedDataTypes(dataKeys);
  }, []);

  const simulateProgress = (onComplete: () => void) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  };

  const calculateTotalRecords = (stats: Record<string, number>) => {
    return Object.values(stats).reduce((sum, count) => sum + count, 0);
  };

  const createBackup = () => {
    try {
      setIsLoading(true);
      
      // Start progress simulation
      const clearProgressInterval = simulateProgress(() => {
        try {
          const backupData: Record<string, any> = {};
          const stats: Record<string, number> = {};
          
          // Only include selected data types (or all if full backup)
          const keysToBackup = selectedBackupMethod === "full" ? 
            dataKeys : 
            dataKeys.filter(key => selectedDataTypes.includes(key));
          
          // Collect data from localStorage
          keysToBackup.forEach(key => {
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
          
          // Create filename with Persian date format
          const filename = `backup_${formatPersianDateForFilename()}.json`;
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
          
          // Update backup stats and history
          setBackupStats(stats);
          
          // Add to history
          const newBackupRecord = {
            date: new Date().toLocaleDateString('fa-IR'),
            size: `${Math.round(backupString.length / 1024)} کیلوبایت`,
            items: stats
          };
          
          setBackupHistory(prev => [newBackupRecord, ...prev]);
          
          setIsLoading(false);
          
          toast({
            title: "پشتیبان‌گیری موفق",
            description: "اطلاعات با موفقیت در فایل ذخیره شد",
            className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
          });
        } catch (error) {
          setIsLoading(false);
          console.error("Error in backup completion:", error);
          
          toast({
            variant: "destructive",
            title: "خطا در پشتیبان‌گیری",
            description: "مشکلی در فرآیند پشتیبان‌گیری به وجود آمده است"
          });
        }
      });
      
      // Cleanup function in case component unmounts during backup
      return () => clearProgressInterval();
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "خطا در پشتیبان‌گیری",
        description: "مشکلی در فرآیند پشتیبان‌گیری به وجود آمده است"
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const reader = new FileReader();
    
    setIsLoading(true);
    setRestoreSuccess(null);
    setProgress(0);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        // Simulate progress
        const clearProgressInterval = simulateProgress(() => {
          try {
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
            setIsLoading(false);
            setRestoreSuccess(false);
            setRestoreMessage("خطا در بازیابی اطلاعات. لطفاً یک فایل پشتیبان معتبر انتخاب کنید");
            
            toast({
              variant: "destructive",
              title: "خطا در بازیابی",
              description: "مشکلی در فرآیند بازیابی به وجود آمده است"
            });
          }
        });
      } catch (error) {
        console.error("Error parsing backup:", error);
        setIsLoading(false);
        setRestoreSuccess(false);
        setRestoreMessage("خطا در خواندن فایل. فایل پشتیبان نامعتبر است.");
        
        toast({
          variant: "destructive",
          title: "خطا در خواندن فایل",
          description: "مشکلی در خواندن فایل به وجود آمده است",
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
  
  const toggleDataType = (key: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/5" />
      
      <div className="container mx-auto py-8 relative z-10 space-y-8 px-4">
        <div className="space-y-1.5">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            پشتیبان‌گیری و بازیابی
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            در این بخش می‌توانید از اطلاعات برنامه پشتیبان‌گیری کنید یا اطلاعات را از یک فایل پشتیبان بازیابی نمایید
          </motion.p>
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
            <TabsTrigger value="history" className="data-[state=active]:bg-background rounded-lg flex gap-2">
              <History className="h-4 w-4" />
              تاریخچه
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-teal-950 dark:via-gray-900 dark:to-blue-950 border-teal-100 dark:border-teal-900 overflow-hidden relative">
              <motion.div 
                className="absolute -top-16 -right-16 w-32 h-32 bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
              
              <div className="relative z-10 flex flex-col space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-teal-500 to-blue-500 p-4 rounded-xl shadow-lg">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">پشتیبان‌گیری از اطلاعات</h3>
                    <p className="text-sm text-muted-foreground">
                      تمام اطلاعات برنامه در یک فایل JSON ذخیره خواهد شد
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-blue-500"></div>
                    
                    <div className="bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                          <Server className="h-4 w-4 text-teal-500" />
                          داده‌های موجود برای پشتیبان‌گیری
                        </h4>
                        <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                          {calculateTotalRecords(backupStats)} رکورد
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(backupStats).map(([key, count]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                              <span className="text-gray-700 dark:text-gray-300">{key}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {count} رکورد
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-2">
                          <CloudCog className="h-4 w-4 text-blue-500" />
                          تنظیمات پشتیبان‌گیری
                        </h4>
                        
                        <div className="flex gap-2 mb-3">
                          <Button
                            variant={selectedBackupMethod === "full" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedBackupMethod("full")}
                            className={`gap-1 ${selectedBackupMethod === "full" ? "bg-gradient-to-r from-teal-500 to-blue-500" : ""}`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>پشتیبان کامل</span>
                          </Button>
                          <Button
                            variant={selectedBackupMethod === "partial" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedBackupMethod("partial")}
                            className={`gap-1 ${selectedBackupMethod === "partial" ? "bg-gradient-to-r from-teal-500 to-blue-500" : ""}`}
                          >
                            <FileBox className="h-3.5 w-3.5" />
                            <span>پشتیبان انتخابی</span>
                          </Button>
                        </div>
                        
                        {selectedBackupMethod === "partial" && (
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 max-h-40 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2">
                              {dataKeys.map(key => (
                                <Button
                                  key={key}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleDataType(key)}
                                  className={`justify-start gap-1.5 h-8 hover:bg-teal-50 dark:hover:bg-teal-900/20 ${
                                    selectedDataTypes.includes(key) 
                                      ? "bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300" 
                                      : ""
                                  }`}
                                >
                                  <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border ${
                                    selectedDataTypes.includes(key)
                                      ? "bg-teal-500 border-teal-600"
                                      : "border-gray-400"
                                  }`}>
                                    {selectedDataTypes.includes(key) && (
                                      <Check className="h-2.5 w-2.5 text-white" />
                                    )}
                                  </div>
                                  <span className="text-xs truncate">{key}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1.5">
                      <FileJson className="h-4 w-4 text-blue-500" />
                      عملیات پشتیبان‌گیری
                    </h4>
                    
                    <div className="grow flex flex-col justify-between">
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">تاریخ پشتیبان‌گیری</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('fa-IR')}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-teal-100 dark:bg-teal-900/50 rounded-full p-2">
                            <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">ساعت پشتیبان‌گیری</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleTimeString('fa-IR')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {isLoading && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>در حال آماده‌سازی پشتیبان...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress 
                            value={progress} 
                            className="h-2"
                            size="md"
                            indicatorColor="bg-gradient-to-r from-teal-500 to-blue-500"
                            animated={true}
                          />
                        </div>
                      )}
                      
                      <Button 
                        onClick={createBackup} 
                        disabled={isLoading || (selectedBackupMethod === "partial" && selectedDataTypes.length === 0)}
                        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-r-transparent border-white"></div>
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
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="restore" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 border-indigo-100 dark:border-indigo-900 overflow-hidden relative">
              <motion.div 
                className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-900/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              
              <div className="relative z-10 flex flex-col space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">بازیابی اطلاعات</h3>
                    <p className="text-sm text-muted-foreground">
                      اطلاعات را از یک فایل پشتیبان JSON بازیابی کنید
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-500"></div>
                    
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-4">
                      <Server className="h-4 w-4 text-indigo-500" />
                      راهنمای بازیابی
                    </h4>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">۱</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">انتخاب فایل پشتیبان (JSON)</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">فایلی که قبلاً با همین سیستم ایجاد شده است</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">۲</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">بررسی و بازیابی اطلاعات</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">سیستم فایل را بررسی و اطلاعات را استخراج می‌کند</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">۳</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">جایگزینی اطلاعات فعلی</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">اطلاعات فعلی با اطلاعات فایل پشتیبان جایگزین می‌شود</p>
                        </div>
                      </div>
                    </div>
                    
                    <Alert className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>هشدار</AlertTitle>
                      <AlertDescription>
                        با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
                      </AlertDescription>
                    </Alert>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1.5">
                      <FileJson className="h-4 w-4 text-purple-500" />
                      بازیابی از فایل پشتیبان
                    </h4>
                    
                    <div className="grow flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-dashed border-indigo-200 dark:border-indigo-800 mb-4 flex flex-col items-center justify-center gap-2">
                          <Upload className="h-8 w-8 text-indigo-400 dark:text-indigo-300" />
                          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                            فایل JSON پشتیبان خود را انتخاب کنید
                          </p>
                          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                            پسوند فایل باید .json باشد
                          </p>
                        </div>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".json"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        {isLoading && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>در حال بازیابی اطلاعات...</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress 
                              value={progress} 
                              className="h-2"
                              size="md"
                              indicatorColor="bg-gradient-to-r from-indigo-500 to-purple-500"
                              animated={true}
                            />
                          </div>
                        )}
                        
                        {restoreSuccess !== null && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-lg ${
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
                                <Check className="h-4 w-4 shrink-0" />
                              ) : (
                                <X className="h-4 w-4 shrink-0" />
                              )}
                              {restoreMessage}
                            </p>
                            
                            {restoreSuccess && Object.keys(restoreStats).length > 0 && (
                              <div className="mt-2 space-y-1">
                                {Object.entries(restoreStats).filter(([_, count]) => count > 0).map(([key, count]) => (
                                  <div key={key} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600 dark:text-gray-400">{key}</span>
                                    <Badge 
                                      variant="secondary" 
                                      className="text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                    >
                                      {count} رکورد
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={handleRestoreClick} 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-r-transparent border-white"></div>
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
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950 border-blue-100 dark:border-blue-900">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-xl shadow-lg">
                  <History className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">تاریخچه پشتیبان‌گیری</h3>
                  <p className="text-sm text-muted-foreground">
                    مشاهده سوابق پشتیبان‌گیری‌های قبلی
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <FileBox className="h-4 w-4 text-blue-500" />
                    فایل‌های پشتیبان اخیر
                  </h4>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 dark:text-blue-400 gap-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="text-xs">بروزرسانی</span>
                  </Button>
                </div>
                
                <div className="overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto">
                    {backupHistory.length > 0 ? (
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {backupHistory.map((backup, index) => (
                          <div key={index} className="p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                  <FileJson className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    پشتیبان {backup.date}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    حجم: {backup.size}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                                >
                                  <ArrowUp className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 mt-3">
                              {Object.entries(backup.items)
                                .filter(([_, count]) => count > 0)
                                .slice(0, 4)
                                .map(([key, count]) => (
                                  <Badge 
                                    key={key} 
                                    variant="secondary"
                                    className="justify-between gap-1.5 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800"
                                  >
                                    <span className="truncate">{key}</span>
                                    <span className="shrink-0">{count}</span>
                                  </Badge>
                                ))
                              }
                              {Object.keys(backup.items).length > 4 && (
                                <Badge 
                                  variant="outline" 
                                  className="text-xs text-gray-500 dark:text-gray-400 border-dashed"
                                >
                                  +{Object.keys(backup.items).length - 4} مورد دیگر
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-3">
                          <FileBox className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                          هنوز هیچ فایل پشتیبانی ایجاد نکرده‌اید
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                          فایل‌های پشتیبان ایجاد شده در اینجا نمایش داده می‌شوند
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 gap-1.5 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => document.querySelector('[value="backup"]')?.dispatchEvent(new MouseEvent('click'))}
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>ایجاد پشتیبان</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BackupPage;
