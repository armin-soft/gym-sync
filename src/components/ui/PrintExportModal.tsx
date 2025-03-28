
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Printer, FileText, Image, Check, ArrowLeft, Sparkles, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: PrintExportOptions) => Promise<void>;
  title: string;
  description?: string;
  previewImageUrl?: string;
  documentType: "student" | "workout" | "diet" | "supplement";
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
}

export const PrintExportModal = ({
  isOpen,
  onClose,
  onExport,
  title,
  description,
  previewImageUrl,
  documentType
}: PrintExportModalProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "print">("pdf");
  const [currentTab, setCurrentTab] = useState("preview");
  
  const [exportOptions, setExportOptions] = useState<PrintExportOptions>({
    format: "pdf",
    paperSize: "a4",
    colorMode: "color",
    quality: 100,
    includeHeader: true,
    includeFooter: true,
    includeLogo: true,
    orientation: "portrait"
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
      case "diet": return <Image className="h-5 w-5 text-emerald-500" />;
      case "supplement": return <FileText className="h-5 w-5 text-purple-500" />;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              {getDocumentIcon()}
            </div>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <Tabs defaultValue="preview" value={currentTab} onValueChange={setCurrentTab} className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>پیش‌نمایش</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>تنظیمات خروجی</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="py-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-full aspect-[1/1.414] max-h-[350px] rounded-md overflow-hidden bg-slate-50 border shadow-sm">
                {previewImageUrl ? (
                  <img 
                    src={previewImageUrl} 
                    alt="پیش‌نمایش خروجی" 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">پیش‌نمایش در حال آماده‌سازی است...</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium border shadow-sm">
                  {exportOptions.paperSize === "a4" ? "A4" : 
                   exportOptions.paperSize === "a5" ? "A5" : 
                   "Letter"}
                </div>
                
                <div className={`absolute bottom-0 right-0 left-0 h-12 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center`}>
                  <div className="px-4 flex items-center gap-6">
                    <div className="flex items-center text-xs text-white">
                      <Download className="w-3 h-3 mr-1" />
                      <span>PDF</span>
                    </div>
                    <div className="flex items-center text-xs text-white">
                      <Printer className="w-3 h-3 mr-1" />
                      <span>پرینت</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full pt-4 pb-2 border-t">
                <p className="text-center text-sm text-muted-foreground mb-3">{getOptionTitle()}</p>
                
                <RadioGroup
                  value={exportFormat}
                  onValueChange={(value) => {
                    setExportFormat(value as "pdf" | "print");
                    setExportOptions({
                      ...exportOptions,
                      format: value as "pdf" | "print"
                    });
                  }}
                  className="flex justify-center gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="pdf" id="pdf" className="text-primary" />
                    <Label htmlFor="pdf" className="cursor-pointer flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-blue-500" />
                      <span>خروجی PDF</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="print" id="print" className="text-primary" />
                    <Label htmlFor="print" className="cursor-pointer flex items-center gap-1.5">
                      <Printer className="w-4 h-4 text-emerald-500" />
                      <span>ارسال به پرینتر</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="w-full flex justify-end mt-4 gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setCurrentTab("settings")} className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span>تنظیمات بیشتر</span>
                </Button>
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال پردازش...</span>
                    </>
                  ) : exportFormat === "pdf" ? (
                    <>
                      <Download className="w-4 h-4" />
                      <span>دانلود PDF</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4" />
                      <span>ارسال به پرینتر</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="py-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>اندازه کاغذ</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant={exportOptions.paperSize === "a4" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, paperSize: "a4"})}
                      className={`text-xs h-8 ${exportOptions.paperSize === "a4" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      A4
                    </Button>
                    <Button
                      variant={exportOptions.paperSize === "a5" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, paperSize: "a5"})}
                      className={`text-xs h-8 ${exportOptions.paperSize === "a5" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      A5
                    </Button>
                    <Button
                      variant={exportOptions.paperSize === "letter" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, paperSize: "letter"})}
                      className={`text-xs h-8 ${exportOptions.paperSize === "letter" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      Letter
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>جهت صفحه</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant={exportOptions.orientation === "portrait" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, orientation: "portrait"})}
                      className={`text-xs h-8 ${exportOptions.orientation === "portrait" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      عمودی
                    </Button>
                    <Button
                      variant={exportOptions.orientation === "landscape" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, orientation: "landscape"})}
                      className={`text-xs h-8 ${exportOptions.orientation === "landscape" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      افقی
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>حالت رنگ</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant={exportOptions.colorMode === "color" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, colorMode: "color"})}
                      className={`text-xs h-8 ${exportOptions.colorMode === "color" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      رنگی
                    </Button>
                    <Button
                      variant={exportOptions.colorMode === "bw" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExportOptions({...exportOptions, colorMode: "bw"})}
                      className={`text-xs h-8 ${exportOptions.colorMode === "bw" ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40" : ""}`}
                    >
                      سیاه و سفید
                    </Button>
                  </div>
                </div>
                
                {exportFormat === "pdf" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>کیفیت ({toPersianNumbers(exportOptions.quality)}٪)</span>
                    </h3>
                    <Slider
                      value={[exportOptions.quality]}
                      min={50}
                      max={100}
                      step={5}
                      onValueChange={(value) => setExportOptions({...exportOptions, quality: value[0]})}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-3 pb-2 pt-3 border-t">
                <h3 className="text-sm font-medium">گزینه‌های متفرقه</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeHeader" className="text-sm font-normal cursor-pointer">
                    شامل سربرگ
                  </Label>
                  <Switch
                    id="includeHeader"
                    checked={exportOptions.includeHeader}
                    onCheckedChange={(checked) => setExportOptions({...exportOptions, includeHeader: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeFooter" className="text-sm font-normal cursor-pointer">
                    شامل پاورقی
                  </Label>
                  <Switch
                    id="includeFooter"
                    checked={exportOptions.includeFooter}
                    onCheckedChange={(checked) => setExportOptions({...exportOptions, includeFooter: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeLogo" className="text-sm font-normal cursor-pointer">
                    نمایش لوگو
                  </Label>
                  <Switch
                    id="includeLogo"
                    checked={exportOptions.includeLogo}
                    onCheckedChange={(checked) => setExportOptions({...exportOptions, includeLogo: checked})}
                  />
                </div>
              </div>
              
              <div className="w-full flex justify-between mt-4 gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setCurrentTab("preview")} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>بازگشت به پیش‌نمایش</span>
                </Button>
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>در حال پردازش...</span>
                    </>
                  ) : exportFormat === "pdf" ? (
                    <>
                      <Download className="w-4 h-4" />
                      <span>دانلود PDF</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4" />
                      <span>ارسال به پرینتر</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
