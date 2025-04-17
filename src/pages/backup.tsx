
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
  FileJson,
  History,
  Settings as SettingsIcon,
  Calendar,
  RefreshCcw,
  Clock,
  Lock,
  Save,
  HardDrive,
  FileDigit,
  CloudUpload
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const BackupPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupStats, setBackupStats] = useState<Record<string, number>>({});
  const [restoreStats, setRestoreStats] = useState<Record<string, number>>({});
  const [restoreSuccess, setRestoreSuccess] = useState<boolean | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [encryption, setEncryption] = useState(false);
  const [password, setPassword] = useState("");
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupFormat, setBackupFormat] = useState("json");
  const [compress, setCompress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [backupHistory, setBackupHistory] = useState<Array<{date: string, size: string}>>([]);
  const [progress, setProgress] = useState(0);
  const [backupName, setBackupName] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  // Simulate loading backup history
  useEffect(() => {
    const mockHistory = [
      { date: "۱۴۰۴/۰۱/۲۸", size: "۱۲۰ کیلوبایت" },
      { date: "۱۴۰۳/۱۲/۲۵", size: "۱۱۵ کیلوبایت" },
      { date: "۱۴۰۳/۱۱/۱۵", size: "۹۸ کیلوبایت" }
    ];
    setBackupHistory(mockHistory);
  }, []);

  // Handle checkbox selection
  const handleSelectItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const createBackup = () => {
    try {
      setIsLoading(true);
      setProgress(0);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 200);
      
      const backupData: Record<string, any> = {};
      const stats: Record<string, number> = {};
      
      // Only backup selected items or all items if none selected
      const keysToBackup = selectedItems.length > 0 ? selectedItems : dataKeys;
      
      // Collect all data from localStorage
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
      
      // Create base filename
      const baseFilename = backupName || formatPersianDateForFilename();
      
      // Simulate encryption
      let backupString = JSON.stringify(backupData, null, 2);
      if (encryption && password) {
        // In a real implementation, we would encrypt the data here
        // This is just a simulation for UI purposes
        backupString = `ENCRYPTED:${backupString}`;
      }
      
      // Apply compression simulation
      if (compress) {
        // In a real implementation, we would compress the data here
        // This is just a simulation for UI purposes
        backupString = `COMPRESSED:${backupString}`;
      }
      
      // Create extension based on format
      const extension = backupFormat === "json" ? ".json" : 
                       backupFormat === "xml" ? ".xml" : ".backup";
      
      const filename = `${baseFilename}${extension}`;
      
      // Create download file
      const blob = new Blob([backupString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      
      // Delay to simulate processing
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setBackupStats(stats);
        setIsLoading(false);
        setProgress(100);
        
        // Add to history (would be persisted in a real implementation)
        const newHistory = [
          { 
            date: new Date().toLocaleDateString('fa-IR'), 
            size: `${Math.round(backupString.length / 1024)} کیلوبایت` 
          },
          ...backupHistory
        ];
        setBackupHistory(newHistory);
        
        toast({
          title: "پشتیبان‌گیری موفق",
          description: "اطلاعات با موفقیت در فایل ذخیره شد",
          className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
        });
      }, 1500);
      
    } catch (error) {
      console.error("Error creating backup:", error);
      setIsLoading(false);
      setProgress(0);
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
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        // Simulate decryption if needed
        let processedContent = content;
        if (content.startsWith("ENCRYPTED:")) {
          if (!password) {
            throw new Error("فایل رمزنگاری شده است. لطفاً رمز عبور را وارد کنید");
          }
          // In real implementation, decrypt with password
          processedContent = content.substring(10);
        }
        
        // Simulate decompression if needed
        if (processedContent.startsWith("COMPRESSED:")) {
          // In real implementation, decompress the data
          processedContent = processedContent.substring(11);
        }
        
        const backupData = JSON.parse(processedContent);
        const stats: Record<string, number> = {};
        
        // Verify backup file structure
        if (!backupData || typeof backupData !== 'object') {
          throw new Error("فایل پشتیبان معتبر نیست");
        }
        
        // Restore data to localStorage
        Object.keys(backupData).forEach(key => {
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
        });
        
        // Trigger storage event for components to reload
        window.dispatchEvent(new Event('storage'));
        
        setRestoreStats(stats);
        setRestoreSuccess(true);
        setRestoreMessage("بازیابی اطلاعات با موفقیت انجام شد");
        
        // Add delay to simulate processing
        setTimeout(() => {
          setIsLoading(false);
          setProgress(100);
          
          toast({
            title: "بازیابی موفق",
            description: "اطلاعات با موفقیت بازیابی شدند",
            className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
          });
        }, 1000);
        
      } catch (error) {
        console.error("Error restoring backup:", error);
        setRestoreSuccess(false);
        setRestoreMessage(error instanceof Error ? error.message : "خطا در بازیابی اطلاعات");
        setIsLoading(false);
        setProgress(0);
        
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
      setProgress(0);
      
      toast({
        variant: "destructive",
        title: "خطا در خواندن فایل",
        description: "مشکلی در خواندن فایل به وجود آمده است",
      });
    };
    
    reader.readAsText(file);
  };

  const handleRestoreClick = () => {
    if (selectedItems.length > 0) {
      setShowConfirmDialog(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const confirmRestore = () => {
    setShowConfirmDialog(false);
    fileInputRef.current?.click();
  };

  // Function for simulated auto-backup
  const scheduleAutoBackup = () => {
    toast({
      title: "پشتیبان‌گیری خودکار فعال شد",
      description: "سیستم هر هفته به صورت خودکار پشتیبان‌گیری خواهد کرد",
      className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
    });
  };

  return (
    <PageContainer withBackground className="w-full h-full min-h-screen overflow-auto">
      <div className="w-full h-full flex flex-col py-8 space-y-4 px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PageHeader 
            title="پشتیبان‌گیری و بازیابی" 
            description="مدیریت داده‌های برنامه و پشتیبان‌گیری از اطلاعات"
            icon={Database}
            actions={
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" /> به‌روزرسانی
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="secondary" className="flex items-center gap-2">
                      <FileDigit className="h-4 w-4" /> راهنمای پشتیبان‌گیری
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>راهنمای پشتیبان‌گیری و بازیابی</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                      <p className="text-muted-foreground">
                        با استفاده از این ابزار می‌توانید از اطلاعات برنامه پشتیبان‌گیری کرده و در صورت نیاز آن‌ها را بازیابی کنید.
                      </p>
                      <div className="p-3 border rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-2">نکات مهم:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>پیشنهاد می‌شود به صورت دوره‌ای (حداقل ماهانه) پشتیبان‌گیری انجام دهید</li>
                          <li>فایل‌های پشتیبان را در مکانی امن نگهداری کنید</li>
                          <li>در صورت استفاده از رمزنگاری، رمز عبور را فراموش نکنید</li>
                          <li>بازیابی اطلاعات، داده‌های فعلی را بازنویسی می‌کند</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            }
          />
        </motion.div>

        <Tabs defaultValue="backup" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 w-full md:w-auto flex overflow-x-auto no-scrollbar">
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
            <TabsTrigger value="settings" className="data-[state=active]:bg-background rounded-lg flex gap-2">
              <SettingsIcon className="h-4 w-4" />
              تنظیمات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="space-y-6 h-full">
            <Card className="p-6 bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-teal-950 dark:via-gray-900 dark:to-blue-950 border-teal-100 dark:border-teal-900 h-full">
              <div className="flex flex-col space-y-6 h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 dark:bg-teal-900 p-4 rounded-xl">
                    <Database className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">پشتیبان‌گیری از اطلاعات</h3>
                    <p className="text-sm text-muted-foreground">
                      اطلاعات را در یک فایل ذخیره کنید تا در آینده بتوانید آنها را بازیابی کنید
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">تنظیمات پشتیبان‌گیری:</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="backup-name">نام فایل پشتیبان</Label>
                        <Input 
                          id="backup-name" 
                          placeholder="نام دلخواه فایل پشتیبان" 
                          value={backupName}
                          onChange={(e) => setBackupName(e.target.value)}
                          className="bg-white dark:bg-gray-900"
                        />
                        <p className="text-xs text-muted-foreground">
                          اگر وارد نشود، از تاریخ روز استفاده می‌شود
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backup-format">قالب فایل</Label>
                        <Select 
                          value={backupFormat} 
                          onValueChange={setBackupFormat}
                        >
                          <SelectTrigger id="backup-format" className="bg-white dark:bg-gray-900">
                            <SelectValue placeholder="انتخاب قالب فایل" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON (استاندارد)</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="binary">فایل باینری</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compress" className="text-sm">فشرده‌سازی فایل</Label>
                          <p className="text-xs text-muted-foreground">حجم فایل را کاهش می‌دهد</p>
                        </div>
                        <Switch 
                          id="compress" 
                          checked={compress} 
                          onCheckedChange={setCompress}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="encryption" className="text-sm">رمزنگاری فایل</Label>
                          <p className="text-xs text-muted-foreground">برای محافظت از اطلاعات</p>
                        </div>
                        <Switch 
                          id="encryption" 
                          checked={encryption} 
                          onCheckedChange={setEncryption}
                        />
                      </div>
                      
                      {encryption && (
                        <div className="space-y-2">
                          <Label htmlFor="password">رمز عبور</Label>
                          <Input 
                            id="password" 
                            type="password" 
                            placeholder="رمز عبور را وارد کنید"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white dark:bg-gray-900"
                          />
                          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            در صورت فراموشی رمز، امکان بازیابی وجود ندارد!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">انتخاب اطلاعات:</h4>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="select-all" className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            id="select-all" 
                            className="rounded border-gray-300 dark:border-gray-600 h-4 w-4 text-primary focus:ring-primary"
                            checked={selectedItems.length === dataKeys.length || selectedItems.length === 0}
                            onChange={() => {
                              if (selectedItems.length === dataKeys.length || selectedItems.length === 0) {
                                setSelectedItems([]);
                              } else {
                                setSelectedItems([...dataKeys]);
                              }
                            }}
                          />
                          همه موارد
                        </Label>
                        <span className="text-xs text-muted-foreground">{selectedItems.length > 0 ? `${selectedItems.length} مورد انتخاب شده` : "همه"}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                        {dataKeys.map((key) => (
                          <div key={key} className="flex items-center justify-between hover:bg-muted/50 rounded-lg p-1.5">
                            <Label htmlFor={`item-${key}`} className="flex items-center gap-2 cursor-pointer w-full">
                              <input
                                type="checkbox"
                                id={`item-${key}`}
                                className="rounded border-gray-300 dark:border-gray-600 h-4 w-4 text-primary focus:ring-primary"
                                checked={selectedItems.includes(key) || selectedItems.length === 0}
                                onChange={() => handleSelectItem(key)}
                              />
                              <span className="text-sm">{key}</span>
                            </Label>
                            {backupStats[key] !== undefined && (
                              <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded-full">
                                {backupStats[key]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        onClick={createBackup} 
                        disabled={isLoading || (encryption && !password)}
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
                    
                    {isLoading && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>در حال پردازش...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    )}
                    
                    {Object.keys(backupStats).length > 0 && !isLoading && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg"
                      >
                        <p className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1 mb-1">
                          <Check className="h-4 w-4" />
                          پشتیبان‌گیری انجام شد
                        </p>
                        <p className="text-xs text-green-600/80 dark:text-green-400/80">
                          {Object.keys(backupStats).filter(k => backupStats[k] > 0).length} نوع داده ذخیره شد
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="restore" className="space-y-6 h-full">
            <Card className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 border-indigo-100 dark:border-indigo-900 h-full">
              <div className="flex flex-col space-y-6 h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-xl">
                    <CloudUpload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">بازیابی اطلاعات</h3>
                    <p className="text-sm text-muted-foreground">
                      اطلاعات را از یک فایل پشتیبان بازیابی کنید
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">مراحل بازیابی:</h4>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start p-3 rounded-lg bg-muted/50 relative">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">۱</div>
                        <div>
                          <h5 className="text-sm font-medium">انتخاب فایل</h5>
                          <p className="text-xs text-muted-foreground mt-1">انتخاب فایل پشتیبان از سیستم خود</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start p-3 rounded-lg bg-muted/50 relative">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">۲</div>
                        <div>
                          <h5 className="text-sm font-medium">تأیید بازیابی</h5>
                          <p className="text-xs text-muted-foreground mt-1">تأیید جایگزینی اطلاعات فعلی با اطلاعات پشتیبان</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start p-3 rounded-lg bg-muted/50 relative">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">۳</div>
                        <div>
                          <h5 className="text-sm font-medium">پردازش اطلاعات</h5>
                          <p className="text-xs text-muted-foreground mt-1">استخراج و پردازش داده‌ها از فایل پشتیبان</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start p-3 rounded-lg bg-muted/50 relative">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">۴</div>
                        <div>
                          <h5 className="text-sm font-medium">بازیابی داده‌ها</h5>
                          <p className="text-xs text-muted-foreground mt-1">بازنویسی اطلاعات کنونی با داده‌های پشتیبان</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">آپلود فایل پشتیبان:</h4>
                    
                    <div className="space-y-4">
                      {!isLoading && restoreSuccess === null && (
                        <div className="border-2 border-dashed border-muted/70 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-3">
                            <FileJson className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h4 className="font-medium mb-1">انتخاب فایل پشتیبان</h4>
                          <p className="text-xs text-muted-foreground mb-4">
                            فرمت‌های مجاز: JSON, XML و فایل پشتیبان
                          </p>
                            
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept=".json,.xml,.backup"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          
                          <div className="space-y-3 w-full">
                            {encryption && (
                              <Input
                                type="password"
                                placeholder="رمز عبور فایل (اگر رمزنگاری شده است)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                                >
                                  <Upload className="h-4 w-4 ml-2" />
                                  انتخاب فایل پشتیبان
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>بازیابی اطلاعات</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد. آیا از این کار اطمینان دارید؟
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-2">
                                  <AlertDialogCancel>انصراف</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => fileInputRef.current?.click()}>
                                    بله، ادامه می‌دهم
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              انتخاب مستقیم فایل
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {isLoading && (
                        <div className="space-y-3 py-4">
                          <div className="flex items-center justify-between text-xs">
                            <span>در حال پردازش فایل...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-xs text-center text-muted-foreground pt-2">
                            لطفاً تا پایان عملیات منتظر بمانید
                          </p>
                        </div>
                      )}
                      
                      {restoreSuccess !== null && !isLoading && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg ${
                            restoreSuccess 
                              ? "bg-green-50 dark:bg-green-900/30" 
                              : "bg-red-50 dark:bg-red-900/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-full ${
                              restoreSuccess 
                                ? "bg-green-100 dark:bg-green-900" 
                                : "bg-red-100 dark:bg-red-900"
                            }`}>
                              {restoreSuccess ? (
                                <Check className={`h-5 w-5 ${
                                  restoreSuccess 
                                    ? "text-green-600 dark:text-green-400" 
                                    : "text-red-600 dark:text-red-400"
                                }`} />
                              ) : (
                                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                              )}
                            </div>
                            
                            <div>
                              <p className={`text-sm font-medium ${
                                restoreSuccess 
                                  ? "text-green-700 dark:text-green-300" 
                                  : "text-red-700 dark:text-red-300"
                              }`}>
                                {restoreSuccess ? "بازیابی موفق" : "خطا در بازیابی"}
                              </p>
                              <p className={`text-xs ${
                                restoreSuccess 
                                  ? "text-green-600/80 dark:text-green-400/80" 
                                  : "text-red-600/80 dark:text-red-400/80"
                              }`}>
                                {restoreMessage}
                              </p>
                            </div>
                          </div>
                          
                          {restoreSuccess && Object.keys(restoreStats).length > 0 && (
                            <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                              <h6 className="text-xs font-medium text-green-700 dark:text-green-300 mb-2">اطلاعات بازیابی شده:</h6>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(restoreStats)
                                  .filter(([_, value]) => value > 0)
                                  .slice(0, 4)
                                  .map(([key, value]) => (
                                    <div key={key} className="bg-green-100/50 dark:bg-green-900/30 rounded px-2 py-1 text-xs flex justify-between">
                                      <span>{key}</span>
                                      <span className="font-medium">{value}</span>
                                    </div>
                                  ))
                                }
                                {Object.keys(restoreStats).filter(k => restoreStats[k] > 0).length > 4 && (
                                  <div className="bg-green-100/50 dark:bg-green-900/30 rounded px-2 py-1 text-xs text-center col-span-2">
                                    ...و {Object.keys(restoreStats).filter(k => restoreStats[k] > 0).length - 4} مورد دیگر
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-4 flex gap-2">
                            {restoreSuccess ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full"
                                onClick={() => window.location.reload()}
                              >
                                بارگذاری مجدد برنامه
                              </Button>
                            ) : (
                              <Button 
                                size="sm"
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                onClick={() => {
                                  setRestoreSuccess(null);
                                  setPassword("");
                                }}
                              >
                                تلاش مجدد
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    <Alert className="mt-4 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>هشدار</AlertTitle>
                      <AlertDescription>
                        با بازیابی اطلاعات، تمام داده‌های فعلی جایگزین خواهند شد!
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6 h-full">
            <Card className="p-6 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950 dark:via-gray-900 dark:to-orange-950 border-amber-100 dark:border-amber-900 h-full">
              <div className="flex flex-col space-y-6 h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-xl">
                    <History className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">تاریخچه پشتیبان‌گیری</h3>
                    <p className="text-sm text-muted-foreground">
                      سابقه پشتیبان‌گیری‌های انجام شده در گذشته
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-4 flex-1">
                  <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">فهرست پشتیبان‌گیری‌ها:</h4>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="نمایش همه" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">نمایش همه</SelectItem>
                          <SelectItem value="month">یک ماه اخیر</SelectItem>
                          <SelectItem value="quarter">سه ماه اخیر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2 px-2">
                        <span>تاریخ</span>
                        <span>حجم فایل</span>
                      </div>
                    
                      <div className="space-y-1 mt-2 max-h-[400px] overflow-y-auto">
                        {backupHistory.map((item, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between py-2 px-3 hover:bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-amber-100 dark:bg-amber-900/40 p-1.5 rounded-md">
                                <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{item.date}</p>
                                <p className="text-xs text-muted-foreground">نسخه پشتیبان #{index + 1}</p>
                              </div>
                            </div>
                            <div className="text-xs bg-muted/60 px-2 py-1 rounded-md">
                              {item.size}
                            </div>
                          </div>
                        ))}
                        
                        {backupHistory.length === 0 && (
                          <div className="text-center py-10 text-muted-foreground">
                            <History className="h-10 w-10 mx-auto opacity-20 mb-2" />
                            <p>تاریخچه‌ای موجود نیست</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">آمار و وضعیت:</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">فضای اشغال شده</span>
                          <span className="text-xs font-medium">۲۳۰ کیلوبایت</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-[30%] rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                          <span className="text-xs text-muted-foreground">آخرین پشتیبان‌گیری</span>
                          <span className="text-base font-semibold mt-1">۳ روز پیش</span>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                          <span className="text-xs text-muted-foreground">تعداد نسخه‌های پشتیبان</span>
                          <span className="text-base font-semibold mt-1">{backupHistory.length}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg">
                        <h5 className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          یادآوری دوره‌ای
                        </h5>
                        <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                          برای جلوگیری از از دست دادن اطلاعات، هر ۳۰ روز یکبار پشتیبان‌گیری کنید
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 h-full">
            <Card className="p-6 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-blue-950 dark:via-gray-900 dark:to-slate-950 border-blue-100 dark:border-blue-900 h-full">
              <div className="flex flex-col space-y-6 h-full">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl">
                    <SettingsIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">تنظیمات پشتیبان‌گیری</h3>
                    <p className="text-sm text-muted-foreground">
                      پیکربندی گزینه‌های پشتیبان‌گیری و بازیابی
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">تنظیمات عمومی:</h4>
                    
                    <div className="space-y-5">
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-backup" className="text-sm">پشتیبان‌گیری خودکار</Label>
                          <p className="text-xs text-muted-foreground">
                            به صورت منظم پشتیبان‌گیری انجام شود
                          </p>
                        </div>
                        <Switch 
                          id="auto-backup" 
                          checked={autoBackup} 
                          onCheckedChange={(checked) => {
                            setAutoBackup(checked);
                            if (checked) {
                              scheduleAutoBackup();
                            }
                          }}
                        />
                      </div>
                      
                      {autoBackup && (
                        <div className="pl-5 border-l-2 border-blue-100 dark:border-blue-900 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="backup-frequency">فاصله زمانی</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger id="backup-frequency">
                                <SelectValue placeholder="انتخاب کنید" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">روزانه</SelectItem>
                                <SelectItem value="weekly">هفتگی</SelectItem>
                                <SelectItem value="monthly">ماهانه</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>مکان ذخیره‌سازی</Label>
                            <RadioGroup defaultValue="local" className="space-y-1">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="local" id="local" />
                                <Label htmlFor="local" className="text-sm">سیستم فعلی</Label>
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value="cloud" id="cloud" />
                                <Label htmlFor="cloud" className="text-sm">فضای ابری (طلایی)</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="default-encryption" className="text-sm">رمزنگاری پیش‌فرض</Label>
                          <p className="text-xs text-muted-foreground">
                            استفاده از رمزنگاری برای تمام پشتیبان‌ها
                          </p>
                        </div>
                        <Switch 
                          id="default-encryption" 
                          checked={encryption}
                          onCheckedChange={setEncryption}
                        />
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="default-compress" className="text-sm">فشرده‌سازی پیش‌فرض</Label>
                          <p className="text-xs text-muted-foreground">
                            فشرده‌سازی تمام فایل‌های پشتیبان
                          </p>
                        </div>
                        <Switch 
                          id="default-compress" 
                          checked={compress}
                          onCheckedChange={setCompress}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>فرمت پیش‌فرض</Label>
                        <Select value={backupFormat} onValueChange={setBackupFormat}>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب فرمت" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="binary">باینری</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm h-full space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">گزینه‌های پیشرفته:</h4>
                    
                    <div className="space-y-5">
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-clean" className="text-sm">پاکسازی خودکار</Label>
                          <p className="text-xs text-muted-foreground">
                            حذف خودکار نسخه‌های قدیمی پشتیبان
                          </p>
                        </div>
                        <Switch id="auto-clean" />
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="cloud-sync" className="text-sm">همگام‌سازی با فضای ابری</Label>
                          <p className="text-xs text-muted-foreground">
                            آپلود خودکار به فضای ذخیره‌سازی ابری
                          </p>
                        </div>
                        <Switch id="cloud-sync" />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <h5 className="text-sm font-medium">عملیات داده</h5>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/50 hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-900/20"
                            >
                              <Save className="h-4 w-4 ml-2" />
                              ذخیره تنظیمات پیش‌فرض
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ذخیره تنظیمات</AlertDialogTitle>
                              <AlertDialogDescription>
                                تنظیمات فعلی به عنوان پیش‌فرض ذخیره خواهند شد. آیا مطمئن هستید؟
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-2">
                              <AlertDialogCancel>انصراف</AlertDialogCancel>
                              <AlertDialogAction className="bg-blue-500 hover:bg-blue-600">
                                ذخیره تنظیمات
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline"
                              className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50 hover:border-red-300 hover:bg-red-50/50 dark:hover:bg-red-900/20"
                            >
                              <Lock className="h-4 w-4 ml-2" />
                              تغییر رمز عبور پیش‌فرض
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تغییر رمز عبور</AlertDialogTitle>
                              <AlertDialogDescription>
                                <p className="mb-4">رمز عبور جدید را برای رمزنگاری فایل‌ها وارد کنید.</p>
                                <div className="space-y-3">
                                  <div className="space-y-1">
                                    <Label htmlFor="new-password">رمز عبور جدید</Label>
                                    <Input id="new-password" type="password" />
                                  </div>
                                  <div className="space-y-1">
                                    <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
                                    <Input id="confirm-password" type="password" />
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-2">
                              <AlertDialogCancel>انصراف</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                تغییر رمز عبور
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">مسیر پشتیبان‌گیری</h5>
                        <div className="flex">
                          <Input placeholder="/مسیر/ذخیره‌سازی/پیش‌فرض" defaultValue="/documents/backups/gym-app" className="rounded-l-none" />
                          <Button className="rounded-r-none bg-muted/70 hover:bg-muted text-foreground border border-input border-l-0">
                            <HardDrive className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          محل ذخیره‌سازی خودکار فایل‌های پشتیبان
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ConfirmationDialog 
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmRestore}
        title="تأیید بازیابی"
        description="آیا مطمئن هستید که می‌خواهید فقط موارد انتخابی را بازیابی کنید؟ این کار ممکن است باعث از دست رفتن داده‌های مرتبط شود."
        confirmText="بازیابی موارد انتخابی"
        cancelText="لغو"
        variant="destructive"
      />
    </PageContainer>
  );
};

export default BackupPage;
