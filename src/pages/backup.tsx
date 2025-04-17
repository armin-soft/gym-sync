
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  HardDriveDownload,
  HardDriveUpload,
  ArchiveRestore,
  FileArchive,
  Settings,
  CloudUpload,
  CloudDownload,
  Clock,
  FileBadge,
  Calendar,
  Save
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { PageContainer } from "@/components/ui/page-container";

const BackupPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [backupEncryption, setBackupEncryption] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [backupHistory, setBackupHistory] = useState<Array<{date: string, size: string}>>([]);
  const [compressionLevel, setCompressionLevel] = useState([50]);
  const [autoBackup, setAutoBackup] = useState(false);
  const [autoBackupFrequency, setAutoBackupFrequency] = useState("daily");
  const [selectedBackupFormat, setSelectedBackupFormat] = useState("json");
  const [backupNote, setBackupNote] = useState("");

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

  // Generate mock backup history on component mount
  useEffect(() => {
    const mockHistory = [
      { date: "۱۴۰۴/۰۱/۲۵ - ۱۵:۳۰", size: "۲۵۰ کیلوبایت" },
      { date: "۱۴۰۳/۱۲/۱۵ - ۱۹:۴۵", size: "۲۳۰ کیلوبایت" },
      { date: "۱۴۰۳/۱۱/۰۲ - ۱۰:۱۲", size: "۲۱۰ کیلوبایت" }
    ];
    setBackupHistory(mockHistory);
  }, []);

  const createBackup = () => {
    try {
      setIsLoading(true);
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Add metadata
      backupData["__metadata"] = {
        createdAt: new Date().toISOString(),
        note: backupNote,
        format: selectedBackupFormat,
        compression: compressionLevel[0],
        encrypted: backupEncryption
      };
      
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
      
      let backupString = JSON.stringify(backupData, null, 2);
      
      // In real implementation, encryption and compression would be handled here
      if (backupEncryption && encryptionKey) {
        // Simulating encryption (In a real app, use a proper encryption library)
        console.log("Encrypting backup with key:", encryptionKey);
      }
      
      // Create filename with Persian date format
      const filename = `backup_${formatPersianDateForFilename()}.${selectedBackupFormat}`;
      
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
      
      // Update backup history
      const newBackup = {
        date: new Date().toLocaleDateString('fa-IR') + " - " + new Date().toLocaleTimeString('fa-IR'),
        size: Math.round(backupString.length / 1024) + " کیلوبایت"
      };
      setBackupHistory(prev => [newBackup, ...prev]);

      // Clear backup note
      setBackupNote("");
      
      toast({
        title: "پشتیبان‌گیری موفق",
        description: "اطلاعات با موفقیت در فایل ذخیره شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
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
        let backupData;
        
        // Handle encrypted backups in a real implementation
        if (backupEncryption && encryptionKey) {
          // Decrypt would be implemented here
          console.log("Decrypting backup with key:", encryptionKey);
          backupData = JSON.parse(content);
        } else {
          backupData = JSON.parse(content);
        }
        
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

  const BackupFormatOptions = [
    { id: "json", label: "JSON", description: "قابل استفاده در تمام دستگاه‌ها" },
    { id: "bak", label: "BAK", description: "فقط قابل استفاده در این برنامه" },
  ];

  const BackupFrequencyOptions = [
    { id: "daily", label: "روزانه" },
    { id: "weekly", label: "هفتگی" },
    { id: "monthly", label: "ماهانه" },
  ];

  return (
    <TooltipProvider>
      <PageContainer withBackground className="w-full h-full min-h-screen overflow-auto">
        <div className="w-full h-full flex flex-col py-8 space-y-8 px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                پشتیبان‌گیری و بازیابی
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                در این بخش می‌توانید از تمام اطلاعات برنامه پشتیبان‌گیری کنید یا اطلاعات را از یک فایل پشتیبان بازیابی نمایید.
                پشتیبان‌گیری منظم از اطلاعات‌تان از دست رفتن آن‌ها جلوگیری می‌کند.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Settings className="h-3.5 w-3.5" />
                    <span>تنظیمات</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-card dark:bg-gray-800">تنظیمات پشتیبان‌گیری</TooltipContent>
              </Tooltip>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-red-500 border-red-200 hover:border-red-300 hover:text-red-600 dark:border-red-900 dark:hover:border-red-800">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>پاکسازی</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>آیا از حذف تمام اطلاعات اطمینان دارید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      این عملیات تمام اطلاعات را از برنامه حذف می‌کند و قابل بازگشت نیست. لطفا قبل از ادامه، از اطلاعات خود پشتیبان تهیه کنید.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row-reverse space-x-2 space-x-reverse">
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">حذف تمام اطلاعات</AlertDialogAction>
                    <AlertDialogCancel>انصراف</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Tabs defaultValue="backup" className="space-y-6 flex-1">
            <TabsList className="bg-muted/50 p-1 inline-flex w-full sm:w-auto">
              <TabsTrigger value="backup" className="data-[state=active]:bg-background rounded-lg flex gap-2 flex-1 sm:flex-initial">
                <HardDriveDownload className="h-4 w-4" />
                پشتیبان‌گیری
              </TabsTrigger>
              <TabsTrigger value="restore" className="data-[state=active]:bg-background rounded-lg flex gap-2 flex-1 sm:flex-initial">
                <HardDriveUpload className="h-4 w-4" />
                بازیابی
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-background rounded-lg flex gap-2 flex-1 sm:flex-initial">
                <FileArchive className="h-4 w-4" />
                تاریخچه
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-background rounded-lg flex gap-2 flex-1 sm:flex-initial">
                <Settings className="h-4 w-4" />
                تنظیمات
              </TabsTrigger>
            </TabsList>

            {/* Backup Tab */}
            <TabsContent value="backup" className="space-y-6 h-full">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Backup Info Card */}
                <Card className="p-6 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 dark:from-indigo-950/50 dark:via-gray-900 dark:to-blue-950/50 -z-10" />
                  <div className="absolute inset-0 bg-[url('/Assets/Image/Pattern.svg')] opacity-10 -z-10" />
                  
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-xl shadow-lg shadow-indigo-500/20">
                        <CloudDownload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">پشتیبان‌گیری از اطلاعات</h3>
                        <p className="text-sm text-muted-foreground">
                          تمام اطلاعات برنامه در یک فایل ذخیره خواهد شد
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="text-sm font-medium">فرمت فایل</div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {BackupFormatOptions.map((option) => (
                              <div 
                                key={option.id}
                                onClick={() => setSelectedBackupFormat(option.id)}
                                className={`rounded-lg border px-3 py-2 cursor-pointer transition-all ${
                                  selectedBackupFormat === option.id
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-card hover:border-primary/50'
                                }`}
                              >
                                <div className="font-medium text-sm">{option.label}</div>
                                <div className="text-xs opacity-70">{option.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="text-sm font-medium">فشرده‌سازی</div>
                          <div className="pt-3">
                            <Slider
                              value={compressionLevel}
                              min={0}
                              max={100}
                              step={10}
                              onValueChange={setCompressionLevel}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                              <span>بدون فشرده‌سازی</span>
                              <span>حداکثر فشرده‌سازی</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="note" className="text-sm font-medium">یادداشت پشتیبان (اختیاری)</label>
                        <Textarea 
                          id="note" 
                          placeholder="یادداشتی برای شناسایی بهتر فایل پشتیبان..."
                          className="resize-none h-20"
                          value={backupNote}
                          onChange={(e) => setBackupNote(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 dark:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-1.5 rounded-md">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">رمزنگاری فایل پشتیبان</span>
                        </div>
                        <Switch checked={backupEncryption} onCheckedChange={setBackupEncryption} />
                      </div>

                      {backupEncryption && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5"
                        >
                          <label htmlFor="password" className="text-sm font-medium">کلمه عبور رمزگذاری</label>
                          <Input 
                            id="password" 
                            type="password" 
                            placeholder="کلمه عبور را وارد کنید..." 
                            value={encryptionKey}
                            onChange={(e) => setEncryptionKey(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">برای بازیابی اطلاعات به این کلمه عبور نیاز خواهید داشت</p>
                        </motion.div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button 
                        onClick={createBackup} 
                        disabled={isLoading || (backupEncryption && !encryptionKey)}
                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-r-2 border-white"></div>
                            <span>در حال پشتیبان‌گیری...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Download className="h-4.5 w-4.5" />
                            <span>دانلود فایل پشتیبان</span>
                          </div>
                        )}
                      </Button>
                    </div>
                    
                    {Object.keys(backupStats).length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border bg-card p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-md">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                          </div>
                          <span className="text-sm font-medium">پشتیبان‌گیری انجام شد</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                          {Object.entries(backupStats).map(([key, value]) => (
                            value > 0 ? (
                              <div key={key} className="bg-muted/50 rounded-md p-2">
                                <div className="text-xs text-muted-foreground">{key}</div>
                                <div className="font-semibold">{value.toLocaleString('fa-IR')}</div>
                              </div>
                            ) : null
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
                
                {/* Backup Info Cards */}
                <div className="space-y-6">
                  <Card className="p-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/80 dark:from-purple-950/50 dark:via-gray-900 dark:to-pink-950/50 -z-10" />
                    
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl shadow-lg shadow-purple-500/20">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">زمانبندی خودکار</h3>
                        <p className="text-sm text-muted-foreground">پشتیبان‌گیری خودکار در زمان‌های مشخص</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 dark:bg-primary/10">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-1.5 rounded-md">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">پشتیبان‌گیری خودکار</span>
                        </div>
                        <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                      </div>

                      {autoBackup && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1.5">
                            <div className="text-sm font-medium">دوره پشتیبان‌گیری</div>
                            <div className="flex flex-wrap gap-2">
                              {BackupFrequencyOptions.map((option) => (
                                <Button
                                  key={option.id}
                                  variant={autoBackupFrequency === option.id ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setAutoBackupFrequency(option.id)}
                                  className="flex-1"
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 dark:from-amber-950/50 dark:via-gray-900 dark:to-orange-950/50 -z-10" />
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-xl shadow-lg shadow-amber-500/20">
                        <FileBadge className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">آمار پشتیبان‌گیری</h3>
                        <p className="text-sm text-muted-foreground">آخرین وضعیت پشتیبان‌گیری‌ها</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border p-3">
                          <div className="text-xs text-muted-foreground">پشتیبان‌های ذخیره شده</div>
                          <div className="text-2xl font-bold mt-1">{backupHistory.length.toLocaleString('fa-IR')}</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border p-3">
                          <div className="text-xs text-muted-foreground">آخرین پشتیبان‌گیری</div>
                          <div className="text-sm font-medium mt-1">
                            {backupHistory.length > 0 ? backupHistory[0].date : "موردی ثبت نشده"}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground mb-2">وضعیت داده‌های پایگاه</div>
                        <div className="flex items-center">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 w-[70%]"></div>
                          </div>
                          <span className="text-xs font-medium mr-2">۷۰٪ پر شده</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Restore Tab */}
            <TabsContent value="restore" className="space-y-6 h-full">
              <Card className="p-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-indigo-950/50 dark:via-gray-900 dark:to-purple-950/50 -z-10" />
                <div className="absolute inset-0 bg-[url('/Assets/Image/Pattern.svg')] opacity-10 -z-10" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl shadow-lg shadow-indigo-500/20">
                        <CloudUpload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">بازیابی اطلاعات</h3>
                        <p className="text-sm text-muted-foreground">
                          اطلاعات را از یک فایل پشتیبان بازیابی کنید
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200 border-amber-100 dark:border-amber-900/50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="text-amber-800 dark:text-amber-200">هشدار</AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-300">
                        با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg border p-4">
                      <h4 className="text-sm font-medium">مراحل بازیابی:</h4>
                      <ol className="space-y-2 rtl">
                        <li className="flex items-center gap-2 text-sm">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">۱</div>
                          <span>انتخاب فایل پشتیبان (JSON یا BAK)</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">۲</div>
                          <span>بررسی صحت و اعتبار فایل</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">۳</div>
                          <span>بازیابی اطلاعات از فایل پشتیبان</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">۴</div>
                          <span>اعمال تغییرات و به‌روزرسانی برنامه</span>
                        </li>
                      </ol>
                    </div>

                    {backupEncryption && (
                      <div className="space-y-1.5">
                        <label htmlFor="restore-password" className="text-sm font-medium">کلمه عبور رمزگشایی</label>
                        <Input 
                          id="restore-password" 
                          type="password" 
                          placeholder="کلمه عبور فایل پشتیبان را وارد کنید..." 
                          value={encryptionKey}
                          onChange={(e) => setEncryptionKey(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">اگر فایل پشتیبان رمزگذاری شده باشد، به کلمه عبور نیاز دارید</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json,.bak"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button 
                        onClick={handleRestoreClick} 
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-r-2 border-white"></div>
                            <span>در حال بازیابی...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Upload className="h-4.5 w-4.5" />
                            <span>انتخاب فایل پشتیبان</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-6">
                    {restoreSuccess !== null ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 rounded-lg ${
                          restoreSuccess 
                          ? "bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/40 dark:via-gray-900 dark:to-emerald-950/40 border border-green-100 dark:border-green-900/30" 
                          : "bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950/40 dark:via-gray-900 dark:to-rose-950/40 border border-red-100 dark:border-red-900/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`rounded-full p-2 ${
                            restoreSuccess 
                            ? "bg-green-500 text-white" 
                            : "bg-red-500 text-white"
                          }`}>
                            {restoreSuccess ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-base">{restoreSuccess ? "بازیابی موفقیت‌آمیز" : "خطا در بازیابی"}</h4>
                            <p className="text-sm opacity-70">{restoreMessage}</p>
                          </div>
                        </div>

                        {restoreSuccess && Object.keys(restoreStats).length > 0 && (
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-green-100 dark:border-green-900/30">
                            <div className="text-xs font-medium text-green-800 dark:text-green-300 mb-2">داده‌های بازیابی شده:</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                              {Object.entries(restoreStats).map(([key, value]) => (
                                value > 0 ? (
                                  <div key={key} className="bg-white/70 dark:bg-gray-800/70 rounded-md p-2 border border-green-50 dark:border-green-900/20">
                                    <div className="text-xs opacity-70">{key}</div>
                                    <div className="font-medium text-sm">{value.toLocaleString('fa-IR')}</div>
                                  </div>
                                ) : null
                              ))}
                            </div>
                          </div>
                        )}

                        {!restoreSuccess && (
                          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-red-100 dark:border-red-900/30 text-sm">
                            <p className="text-red-700 dark:text-red-400">لطفاً اطمینان حاصل کنید که:</p>
                            <ul className="list-disc mr-5 mt-2 space-y-1 text-xs text-red-600 dark:text-red-400">
                              <li>فایل انتخاب شده صحیح و معتبر است</li>
                              <li>فرمت فایل JSON یا BAK است</li>
                              {backupEncryption && <li>کلمه عبور رمزگشایی صحیح وارد شده است</li>}
                              <li>فایل آسیب ندیده یا ناقص نیست</li>
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-3">
                          <ArchiveRestore className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h4 className="text-lg font-medium text-center mb-1">آماده بازیابی اطلاعات</h4>
                        <p className="text-sm text-center text-muted-foreground max-w-xs">
                          برای شروع فرآیند بازیابی، دکمه "انتخاب فایل پشتیبان" را بزنید و فایل موردنظر را انتخاب کنید
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="h-full">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileArchive className="h-5 w-5" />
                    <span>تاریخچه پشتیبان‌گیری‌ها</span>
                  </h3>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    <span>افزودن دستی</span>
                  </Button>
                </div>

                {backupHistory.length > 0 ? (
                  <div className="space-y-2">
                    {backupHistory.map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                            <FileArchive className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <div className="font-medium">پشتیبان {(index + 1).toLocaleString('fa-IR')}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{backup.date}</span>
                              <span className="mx-1.5">•</span>
                              <span>{backup.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 dark:text-indigo-400">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArchiveRestore className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                      <FileArchive className="h-8 w-8 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-medium mb-1">تاریخچه‌ای موجود نیست</h4>
                    <p className="text-sm text-center text-muted-foreground">
                      هنوز هیچ پشتیبانی تهیه نشده است
                    </p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="h-full">
              <Card className="p-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                  <Settings className="h-5 w-5" />
                  <span>تنظیمات پشتیبان‌گیری و بازیابی</span>
                </h3>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">پشتیبان‌گیری خودکار</h4>
                          <p className="text-sm text-muted-foreground">ذخیره خودکار پشتیبان در بازه‌های زمانی</p>
                        </div>
                        <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                      </div>

                      <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">رمزنگاری همیشگی</h4>
                          <p className="text-sm text-muted-foreground">رمزگذاری پیش‌فرض برای فایل‌های پشتیبان</p>
                        </div>
                        <Switch checked={backupEncryption} onCheckedChange={setBackupEncryption} />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">پاکسازی خودکار</h4>
                          <p className="text-sm text-muted-foreground">حذف پشتیبان‌های قدیمی بعد از ۳۰ روز</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                        <div>
                          <h4 className="font-medium">تائید دو مرحله‌ای</h4>
                          <p className="text-sm text-muted-foreground">نیازمند تائید قبل از بازیابی داده‌ها</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50" variant="outline">
                        <AlertCircle className="h-4 w-4" />
                        <span>پاکسازی کامل داده‌ها</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-right">پاکسازی کامل داده‌ها</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>هشدار</AlertTitle>
                          <AlertDescription>
                            این عملیات تمام داده‌های برنامه را حذف می‌کند و غیرقابل بازگشت است
                          </AlertDescription>
                        </Alert>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm">برای تایید، لطفا عبارت "پاکسازی کامل" را در کادر زیر وارد کنید</p>
                          <Input className="mt-2" placeholder="پاکسازی کامل" />
                        </div>
                      </div>
                      <DialogFooter className="flex-row-reverse">
                        <Button variant="destructive">پاکسازی داده‌ها</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </TooltipProvider>
  );
};

export default BackupPage;
