
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Printer, FileText, FileDown, Settings, ArrowLeft, ArrowRight, 
  Download, Check, Share2, Copy, Sparkles, Globe, ChevronLeft, ChevronRight,
  Image, Camera, PanelRight, PanelLeft, Palette, ZoomIn, QrCode, Receipt, Layers,
  User, Users, ClipboardList, CalendarDays, Activity, Utensils, Pill
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: PrintExportOptions) => Promise<void>;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
  includeFull?: boolean;
  className?: string; // Added className prop
}

export interface PrintExportOptions {
  format: "pdf" | "print";
  paperSize: "a4" | "a5" | "letter";
  colorMode: "color" | "bw";
  quality: number;
  includeHeader: boolean;
  includeFooter: boolean;
  includeLogo: boolean;
  orientation: "portrait" | "landscape";
  includeTrainerProfile?: boolean;
  includeExerciseManagement?: boolean;
  includeDietManagement?: boolean;
  includeSupplementManagement?: boolean;
}

export const PrintExportModal = ({
  isOpen,
  onClose,
  onExport,
  title,
  description,
  previewImageUrl,
  documentType,
  includeFull = true,
  className
}: PrintExportModalProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "print">("pdf");
  const [currentTab, setCurrentTab] = useState("preview");
  const [previewZoom, setPreviewZoom] = useState(100);
  
  const [exportOptions, setExportOptions] = useState<PrintExportOptions>({
    format: "pdf",
    paperSize: "a4",
    colorMode: "color",
    quality: 100,
    includeHeader: true,
    includeFooter: true,
    includeLogo: true,
    orientation: "portrait",
    includeTrainerProfile: includeFull,
    includeExerciseManagement: includeFull,
    includeDietManagement: includeFull,
    includeSupplementManagement: includeFull
  });

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport(exportFormat, { ...exportOptions, format: exportFormat });
      toast({
        title: exportFormat === "pdf" ? "خروجی PDF با موفقیت ایجاد شد" : "ارسال به پرینتر انجام شد",
        description: exportFormat === "pdf" 
          ? "فایل PDF با موفقیت ایجاد و دانلود شد" 
          : "اطلاعات با موفقیت به پرینتر ارسال شد",
        variant: "default",
      });
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "خطا در ایجاد خروجی",
        description: "متأسفانه مشکلی در روند ایجاد خروجی رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getDocumentIcon = () => {
    switch(documentType) {
      case "student": return <Globe className="h-5 w-5 text-blue-500" />;
      case "workout": return <Sparkles className="h-5 w-5 text-amber-500" />;
      case "diet": return <Receipt className="h-5 w-5 text-emerald-500" />;
      case "supplement": return <Layers className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  const getOptionTitle = () => {
    switch(documentType) {
      case "student": return "تنظیمات خروجی اطلاعات شاگرد";
      case "workout": return "تنظیمات خروجی برنامه تمرینی";
      case "diet": return "تنظیمات خروجی برنامه غذایی";
      case "supplement": return "تنظیمات خروجی برنامه مکمل";
      default: return "تنظیمات خروجی";
    }
  };
  
  const getPreviewBackgroundColor = () => {
    if (exportOptions.colorMode === "bw") return "bg-white";
    
    switch(documentType) {
      case "student": return "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30";
      case "workout": return "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30";
      case "diet": return "from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30";
      case "supplement": return "from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30";
      default: return "from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0 gap-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-none", className)}>
        <div className="flex h-full">
          {/* Right sidebar - Preview */}
          <AnimatePresence mode="wait">
            {currentTab === "preview" && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-[400px] h-[600px] border-l overflow-hidden relative hidden md:block"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={cn(
                      "relative w-[80%] aspect-[1/1.414] rounded-xl overflow-hidden border shadow-lg",
                      "bg-gradient-to-br",
                      getPreviewBackgroundColor()
                    )}
                    style={{ 
                      transform: `scale(${previewZoom / 100})`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {previewImageUrl ? (
                      <img 
                        src={previewImageUrl} 
                        alt="پیش‌نمایش خروجی" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="text-center space-y-3">
                          {getDocumentIcon()}
                          <h3 className="text-sm font-medium">{title}</h3>
                          {description && (
                            <p className="text-xs text-muted-foreground">{description}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Paper size and orientation badge */}
                    <div className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium border shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div 
                          className={cn(
                            "h-2 w-2 rounded-full",
                            exportOptions.paperSize === "a4" ? "bg-blue-500" :
                            exportOptions.paperSize === "a5" ? "bg-emerald-500" : 
                            "bg-amber-500"
                          )}
                        />
                        {exportOptions.paperSize === "a4" ? "A4" : 
                         exportOptions.paperSize === "a5" ? "A5" : 
                         "Letter"}
                      </div>
                    </div>
                    
                    <div className="absolute top-3 left-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium border shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div 
                          className={cn(
                            "h-2 w-2 rounded-full",
                            exportOptions.orientation === "portrait" ? "bg-blue-500" : "bg-purple-500"
                          )}
                        />
                        {exportOptions.orientation === "portrait" ? "عمودی" : "افقی"}
                      </div>
                    </div>
                    
                    {/* Content section badges */}
                    {includeFull && (
                      <div className="absolute top-10 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium border shadow-sm flex flex-col gap-1">
                        {exportOptions.includeTrainerProfile && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            <span>پروفایل مربی</span>
                          </div>
                        )}
                        {exportOptions.includeExerciseManagement && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span>مدیریت تمرین‌ها</span>
                          </div>
                        )}
                        {exportOptions.includeDietManagement && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>مدیریت تغذیه</span>
                          </div>
                        )}
                        {exportOptions.includeSupplementManagement && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                            <span>مدیریت مکمل‌ها</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Zoom controls */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium border shadow-sm">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5"
                          onClick={() => setPreviewZoom(Math.max(60, previewZoom - 10))}
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <span>{toPersianNumbers(previewZoom)}٪</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5"
                          onClick={() => setPreviewZoom(Math.min(150, previewZoom + 10))}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-100/80 to-transparent py-6 px-4">
                  <div className="flex items-center justify-center space-x-reverse space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={cn(
                        "rounded-full border-blue-200 text-xs transition-all", 
                        exportFormat === "pdf" 
                          ? "bg-blue-100 text-blue-700 border-blue-200" 
                          : "bg-white"
                      )}
                      onClick={() => {
                        setExportFormat("pdf");
                        setExportOptions({...exportOptions, format: "pdf"});
                      }}
                    >
                      <FileDown className="h-3.5 w-3.5 ml-1" />
                      <span>PDF</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={cn(
                        "rounded-full border-emerald-200 text-xs transition-all", 
                        exportFormat === "print" 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : "bg-white"
                      )}
                      onClick={() => {
                        setExportFormat("print");
                        setExportOptions({...exportOptions, format: "print"});
                      }}
                    >
                      <Printer className="h-3.5 w-3.5 ml-1" />
                      <span>چاپ</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="border-b p-6 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-full",
                  documentType === "student" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400" :
                  documentType === "workout" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400" :
                  documentType === "diet" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" :
                  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400"
                )}>
                  {getDocumentIcon()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </div>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="hidden md:block">
                <TabsList className="grid grid-cols-2 h-9 w-[240px] p-1 bg-muted/80 rounded-full">
                  <TabsTrigger value="preview" className="rounded-full text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Image className="h-3.5 w-3.5 ml-1" />
                    <span>پیش‌نمایش</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-full text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                    <Settings className="h-3.5 w-3.5 ml-1" />
                    <span>تنظیمات</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setCurrentTab(currentTab === "preview" ? "settings" : "preview")}>
                {currentTab === "preview" ? <Settings className="h-5 w-5" /> : <Image className="h-5 w-5" />}
              </Button>
            </div>
          
            {/* Main content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto p-6"
              >
                {currentTab === "preview" && (
                  <div className="space-y-6">
                    {/* Mobile preview */}
                    <div className="md:hidden">
                      <div className={cn(
                        "relative mx-auto w-full max-w-[250px] aspect-[1/1.414] rounded-xl overflow-hidden border shadow-lg",
                        "bg-gradient-to-br",
                        getPreviewBackgroundColor()
                      )}>
                        {previewImageUrl ? (
                          <img 
                            src={previewImageUrl} 
                            alt="پیش‌نمایش خروجی" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="text-center space-y-3">
                              {getDocumentIcon()}
                              <h3 className="text-sm font-medium">{title}</h3>
                              {description && (
                                <p className="text-[10px] text-muted-foreground">{description}</p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-medium border shadow-sm">
                          <div className="flex items-center gap-1">
                            <div 
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                exportOptions.paperSize === "a4" ? "bg-blue-500" :
                                exportOptions.paperSize === "a5" ? "bg-emerald-500" : 
                                "bg-amber-500"
                              )}
                            />
                            {exportOptions.paperSize === "a4" ? "A4" : 
                             exportOptions.paperSize === "a5" ? "A5" : 
                             "Letter"}
                          </div>
                        </div>
                        
                        <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-medium border shadow-sm">
                          <div className="flex items-center gap-1">
                            <div 
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                exportOptions.orientation === "portrait" ? "bg-blue-500" : "bg-purple-500"
                              )}
                            />
                            {exportOptions.orientation === "portrait" ? "عمودی" : "افقی"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center mt-4 space-x-reverse space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={cn(
                            "rounded-full border-blue-200 text-xs transition-all", 
                            exportFormat === "pdf" 
                              ? "bg-blue-100 text-blue-700 border-blue-200" 
                              : "bg-white"
                          )}
                          onClick={() => {
                            setExportFormat("pdf");
                            setExportOptions({...exportOptions, format: "pdf"});
                          }}
                        >
                          <FileDown className="h-3.5 w-3.5 ml-1" />
                          <span>PDF</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={cn(
                            "rounded-full border-emerald-200 text-xs transition-all", 
                            exportFormat === "print" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                              : "bg-white"
                          )}
                          onClick={() => {
                            setExportFormat("print");
                            setExportOptions({...exportOptions, format: "print"});
                          }}
                        >
                          <Printer className="h-3.5 w-3.5 ml-1" />
                          <span>چاپ</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border p-4 mt-6 space-y-4">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-blue-500" />
                        <span>انتخاب خروجی</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          className={cn(
                            "relative flex items-center space-x-reverse space-x-3 bg-white dark:bg-gray-800 p-3 rounded-xl border",
                            "hover:border-blue-200 transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                            exportFormat === "pdf" && "ring-2 ring-blue-500 ring-offset-1 border-blue-200"
                          )}
                          onClick={() => {
                            setExportFormat("pdf");
                            setExportOptions({...exportOptions, format: "pdf"});
                          }}
                        >
                          <div className="flex-shrink-0 h-11 w-11 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <FileDown className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                          </div>
                          <div className="text-right">
                            <h4 className="text-sm font-medium">خروجی PDF</h4>
                            <p className="text-xs text-muted-foreground">قابلیت ذخیره و اشتراک‌گذاری</p>
                          </div>
                          {exportFormat === "pdf" && (
                            <div className="absolute -top-1.5 -left-1.5 bg-blue-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </button>
                        
                        <button
                          className={cn(
                            "relative flex items-center space-x-reverse space-x-3 bg-white dark:bg-gray-800 p-3 rounded-xl border",
                            "hover:border-emerald-200 transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1",
                            exportFormat === "print" && "ring-2 ring-emerald-500 ring-offset-1 border-emerald-200"
                          )}
                          onClick={() => {
                            setExportFormat("print");
                            setExportOptions({...exportOptions, format: "print"});
                          }}
                        >
                          <div className="flex-shrink-0 h-11 w-11 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Printer className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                          </div>
                          <div className="text-right">
                            <h4 className="text-sm font-medium">ارسال به پرینتر</h4>
                            <p className="text-xs text-muted-foreground">چاپ سریع اطلاعات</p>
                          </div>
                          {exportFormat === "print" && (
                            <div className="absolute -top-1.5 -left-1.5 bg-emerald-500 text-white h-5 w-5 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Report content */}
                    {includeFull && (
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border p-4 mt-6 space-y-4">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-purple-500" />
                          <span>محتوای گزارش</span>
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                            <Label htmlFor="includeTrainerProfile" className="flex items-center gap-2 cursor-pointer">
                              <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <User className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                              </div>
                              <div>
                                <span className="font-medium">پروفایل مربی</span>
                                <p className="text-xs text-muted-foreground mt-0.5">اطلاعات شخصی و اطلاعات باشگاه</p>
                              </div>
                            </Label>
                            <Switch
                              id="includeTrainerProfile"
                              checked={exportOptions.includeTrainerProfile}
                              onCheckedChange={(checked) => setExportOptions({...exportOptions, includeTrainerProfile: checked})}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                            <Label htmlFor="includeExerciseManagement" className="flex items-center gap-2 cursor-pointer">
                              <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <Activity className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                              </div>
                              <div>
                                <span className="font-medium">مدیریت تمرین‌ها</span>
                                <p className="text-xs text-muted-foreground mt-0.5">برنامه تمرینی شاگرد</p>
                              </div>
                            </Label>
                            <Switch
                              id="includeExerciseManagement"
                              checked={exportOptions.includeExerciseManagement}
                              onCheckedChange={(checked) => setExportOptions({...exportOptions, includeExerciseManagement: checked})}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                            <Label htmlFor="includeDietManagement" className="flex items-center gap-2 cursor-pointer">
                              <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <Utensils className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                              </div>
                              <div>
                                <span className="font-medium">مدیریت تغذیه</span>
                                <p className="text-xs text-muted-foreground mt-0.5">برنامه غذایی شاگرد</p>
                              </div>
                            </Label>
                            <Switch
                              id="includeDietManagement"
                              checked={exportOptions.includeDietManagement}
                              onCheckedChange={(checked) => setExportOptions({...exportOptions, includeDietManagement: checked})}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                            <Label htmlFor="includeSupplementManagement" className="flex items-center gap-2 cursor-pointer">
                              <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Pill className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                              </div>
                              <div>
                                <span className="font-medium">مدیریت مکمل‌ها</span>
                                <p className="text-xs text-muted-foreground mt-0.5">برنامه مکمل و ویتامین شاگرد</p>
                              </div>
                            </Label>
                            <Switch
                              id="includeSupplementManagement"
                              checked={exportOptions.includeSupplementManagement}
                              onCheckedChange={(checked) => setExportOptions({...exportOptions, includeSupplementManagement: checked})}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-end mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentTab("settings")} 
                        className="rounded-xl gap-2 group"
                      >
                        <Settings className="h-4 w-4 transition-transform group-hover:rotate-45" />
                        تنظیمات بیشتر
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentTab === "settings" && (
                  <div className="space-y-6">
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>اندازه کاغذ</span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, paperSize: "a4"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.paperSize === "a4" 
                                  ? "border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" 
                                  : ""
                              )}
                            >
                              <span>A4</span>
                              {exportOptions.paperSize === "a4" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-blue-500 rotate-45"></div>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, paperSize: "a5"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.paperSize === "a5" 
                                  ? "border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20" 
                                  : ""
                              )}
                            >
                              <span>A5</span>
                              {exportOptions.paperSize === "a5" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-emerald-500 rotate-45"></div>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, paperSize: "letter"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.paperSize === "letter" 
                                  ? "border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20" 
                                  : ""
                              )}
                            >
                              <span>Letter</span>
                              {exportOptions.paperSize === "letter" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-amber-500 rotate-45"></div>
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium flex items-center gap-2">
                            <PanelRight className="h-4 w-4 text-purple-500" />
                            <span>جهت صفحه</span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, orientation: "portrait"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.orientation === "portrait" 
                                  ? "border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" 
                                  : ""
                              )}
                            >
                              <PanelLeft className="h-5 w-5 ml-2" />
                              <span>عمودی</span>
                              {exportOptions.orientation === "portrait" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-blue-500 rotate-45"></div>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, orientation: "landscape"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.orientation === "landscape" 
                                  ? "border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20" 
                                  : ""
                              )}
                            >
                              <PanelRight className="h-5 w-5 ml-2" />
                              <span>افقی</span>
                              {exportOptions.orientation === "landscape" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-purple-500 rotate-45"></div>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium flex items-center gap-2">
                            <Palette className="h-4 w-4 text-amber-500" />
                            <span>حالت رنگ</span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, colorMode: "color"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.colorMode === "color" 
                                  ? "border-amber-200 dark:border-amber-800 bg-gradient-to-r from-red-50 via-amber-50 to-green-50 dark:from-red-950/20 dark:via-amber-950/20 dark:to-green-950/20" 
                                  : ""
                              )}
                            >
                              <span>رنگی</span>
                              {exportOptions.colorMode === "color" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-amber-500 rotate-45"></div>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExportOptions({...exportOptions, colorMode: "bw"})}
                              className={cn(
                                "flex-1 rounded-xl h-11 relative overflow-hidden border transition-all",
                                exportOptions.colorMode === "bw" 
                                  ? "border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" 
                                  : ""
                              )}
                            >
                              <span>سیاه و سفید</span>
                              {exportOptions.colorMode === "bw" && (
                                <div className="absolute -top-2 -right-2 h-8 w-8 bg-gray-500 rotate-45"></div>
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        {exportFormat === "pdf" && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                              <ZoomIn className="h-4 w-4 text-blue-500" />
                              <span>کیفیت ({toPersianNumbers(exportOptions.quality)}٪)</span>
                            </h3>
                            <div className="px-2 pt-2">
                              <Slider
                                value={[exportOptions.quality]}
                                min={50}
                                max={100}
                                step={5}
                                onValueChange={(value) => setExportOptions({...exportOptions, quality: value[0]})}
                                className="w-full"
                              />
                              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                                <span>۵۰٪</span>
                                <span>۷۵٪</span>
                                <span>۱۰۰٪</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border p-4 space-y-3">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Settings className="h-4 w-4 text-indigo-500" />
                        <span>گزینه‌های اضافی</span>
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                          <Label htmlFor="includeHeader" className="text-sm cursor-pointer flex items-center gap-2">
                            <span>شامل سربرگ</span>
                            <span className="text-xs text-muted-foreground">(لوگو و عنوان)</span>
                          </Label>
                          <Switch
                            id="includeHeader"
                            checked={exportOptions.includeHeader}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeHeader: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                          <Label htmlFor="includeFooter" className="text-sm cursor-pointer flex items-center gap-2">
                            <span>شامل پاورقی</span>
                            <span className="text-xs text-muted-foreground">(اطلاعات تماس)</span>
                          </Label>
                          <Switch
                            id="includeFooter"
                            checked={exportOptions.includeFooter}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeFooter: checked})}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border">
                          <Label htmlFor="includeLogo" className="text-sm cursor-pointer flex items-center gap-2">
                            <span>نمایش لوگو</span>
                            <span className="text-xs text-muted-foreground">(لوگوی باشگاه)</span>
                          </Label>
                          <Switch
                            id="includeLogo"
                            checked={exportOptions.includeLogo}
                            onCheckedChange={(checked) => setExportOptions({...exportOptions, includeLogo: checked})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentTab("preview")} 
                        className="rounded-xl gap-2 group"
                      >
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        بازگشت به پیش‌نمایش
                      </Button>
                      
                      <Button 
                        onClick={handleExport} 
                        disabled={isExporting}
                        className={cn(
                          "rounded-xl gap-2 shadow-lg",
                          exportFormat === "pdf" 
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                            : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        )}
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>در حال پردازش...</span>
                          </>
                        ) : exportFormat === "pdf" ? (
                          <>
                            <Download className="h-4 w-4" />
                            <span>دانلود PDF</span>
                          </>
                        ) : (
                          <>
                            <Printer className="h-4 w-4" />
                            <span>ارسال به پرینتر</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile footer */}
            <div className="border-t p-4 md:hidden">
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className={cn(
                  "w-full rounded-xl gap-2 h-12",
                  exportFormat === "pdf" 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600" 
                    : "bg-gradient-to-r from-emerald-600 to-teal-600"
                )}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>در حال پردازش...</span>
                  </>
                ) : exportFormat === "pdf" ? (
                  <>
                    <Download className="h-4 w-4" />
                    <span>دانلود PDF</span>
                  </>
                ) : (
                  <>
                    <Printer className="h-4 w-4" />
                    <span>ارسال به پرینتر</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
